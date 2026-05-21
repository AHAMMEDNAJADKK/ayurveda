const axios = require('axios');

const sendWhatsAppMessage = async (messageText) => {
  // Check Green API Config
  const greenInstance = process.env.GREEN_API_INSTANCE;
  const greenToken = process.env.GREEN_API_TOKEN;
  const ownerWhatsapp = process.env.OWNER_WHATSAPP;

  // Check Twilio Config
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_WHATSAPP_FROM;
  const ownerPhone = process.env.OWNER_PHONE;

  if (greenInstance && greenToken && ownerWhatsapp) {
    try {
      const url = `https://api.greenapi.com/waInstance${greenInstance}/sendMessage/${greenToken}`;
      const payload = {
        chatId: ownerWhatsapp,
        message: messageText
      };

      const response = await axios.post(url, payload);
      console.log('WhatsApp message sent via Green API:', response.data);
      return { success: true, provider: 'green-api', data: response.data };
    } catch (error) {
      console.error('Green API sending error:', error.response ? error.response.data : error.message);
      return { success: false, provider: 'green-api', error: error.message };
    }
  } else if (twilioSid && twilioAuthToken && twilioFrom && ownerPhone) {
    try {
      const twilio = require('twilio');
      const client = twilio(twilioSid, twilioAuthToken);

      const response = await client.messages.create({
        body: messageText,
        from: twilioFrom, // e.g. 'whatsapp:+14155238886'
        to: ownerPhone    // e.g. 'whatsapp:+919999999999'
      });
      console.log('WhatsApp message sent via Twilio:', response.sid);
      return { success: true, provider: 'twilio', sid: response.sid };
    } catch (error) {
      console.error('Twilio API sending error:', error.message);
      return { success: false, provider: 'twilio', error: error.message };
    }
  } else {
    // Development fallback
    console.log('\n--- DEVELOPMENT SIMULATED WHATSAPP NOTIFICATION ---');
    console.log(messageText);
    console.log('-----------------------------------------------------\n');
    return { success: true, provider: 'console-log' };
  }
};

const sendOTPMessage = async (phone, otp) => {
  const expiryMinutes = process.env.OTP_EXPIRY_MINUTES || 5;
  const messageText = `🌿 *Health Care Ayurveda*\n\nYour verification code is: *${otp}*\nIt is valid for ${expiryMinutes} minutes. For security, please do not share this OTP.`;

  const greenInstance = process.env.GREEN_API_INSTANCE;
  const greenToken = process.env.GREEN_API_TOKEN;
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_WHATSAPP_FROM;

  const cleanPhone = phone.replace(/^\+/, '');

  if (greenInstance && greenToken) {
    try {
      const url = `https://api.greenapi.com/waInstance${greenInstance}/sendMessage/${greenToken}`;
      const payload = {
        chatId: `${cleanPhone}@c.us`,
        message: messageText
      };
      const response = await axios.post(url, payload);
      console.log(`OTP WhatsApp sent to ${cleanPhone} via Green API:`, response.data);
      return { success: true, provider: 'green-api' };
    } catch (error) {
      console.error('Green API OTP send error:', error.response ? error.response.data : error.message);
      return { success: false, provider: 'green-api', error: error.message };
    }
  } else if (twilioSid && twilioAuthToken && twilioFrom) {
    try {
      const twilio = require('twilio');
      const client = twilio(twilioSid, twilioAuthToken);
      const response = await client.messages.create({
        body: messageText,
        from: twilioFrom,
        to: `whatsapp:+${cleanPhone}`
      });
      console.log(`OTP WhatsApp sent to ${cleanPhone} via Twilio:`, response.sid);
      return { success: true, provider: 'twilio' };
    } catch (error) {
      console.error('Twilio API OTP send error:', error.message);
      return { success: false, provider: 'twilio', error: error.message };
    }
  } else {
    console.log('\n=====================================================');
    console.log(`🌿 HEALTH CARE AYURVEDA — SIMULATED OTP SENDER`);
    console.log(`Recipient: ${phone}`);
    console.log(`Code     : ${otp}`);
    console.log(`Message  : ${messageText}`);
    console.log('=====================================================\n');
    return { success: true, provider: 'console-log' };
  }
};

module.exports = { sendWhatsAppMessage, sendOTPMessage };
