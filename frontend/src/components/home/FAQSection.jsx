import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "What makes Health Care Ayurveda unique?",
    answer: "We combine traditional Kerala Ayurvedic practices with modern laboratory-tested botanical remedies. Our therapies address the root causes of stress, hormonal imbalance, skin health, digestive issues, and overall wellness — personalised for every individual."
  },
  {
    id: 2,
    question: "Are the treatments suitable for all age groups?",
    answer: "Yes, our consultations and natural remedies serve patients across all age groups and genders — from children and young adults to seniors. Every treatment plan is customised by our certified Ayurvedic physicians based on individual body constitution."
  },
  {
    id: 3,
    question: "How do I book an appointment?",
    answer: "You can book an appointment using our online booking form on the Home page. Choose a convenient date and time slot. Once you fill in your health details and submit, we will verify availability and confirm it via WhatsApp."
  },
  {
    id: 4,
    question: "Do you have in-person consultations?",
    answer: "Yes, our main clinic in Kochi offers physical consultations, pulse diagnosis (Nadi Pariksha), and authentic therapies. Our therapists are trained professionals operating in clean, hygienic treatment rooms."
  },
  {
    id: 5,
    question: "Are your medicines safe and organic?",
    answer: "Absolutely. All formulations in our apothecary are 100% natural, free from chemical preservatives, heavy metals, and artificial additives. They are manufactured under GMP-certified conditions following classical Ayurvedic texts."
  },
  {
    id: 6,
    question: "What is your rescheduling policy?",
    answer: "If you need to reschedule or cancel an appointment, please contact us at least 2 hours in advance via our helpline number (+91 95396 91757) or WhatsApp so we can allocate the slot to another client."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-cream/10 border-t border-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-gold font-serif italic text-lg block">Got Questions?</span>
          <h2 className="font-display text-3xl md:text-5xl text-primary font-bold tracking-wide">
            Frequently Asked Queries
          </h2>
          <div className="w-16 h-0.5 bg-gold/30 mx-auto"></div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-primary/20 shadow-md ring-1 ring-primary/5'
                    : 'border-primary/5 shadow-sm hover:border-accent/40'
                }`}
              >
                {/* Header/Trigger Button */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 pr-4">
                    <HelpCircle
                      size={18}
                      className={`shrink-0 transition-colors duration-300 ${
                        isOpen ? 'text-primary' : 'text-accent'
                      }`}
                    />
                    <span className="font-display font-bold text-textDark text-sm md:text-base group-hover:text-primary transition-colors duration-200">
                      {faq.question}
                    </span>
                  </span>
                  <span
                    className={`p-1.5 rounded-full transition-all duration-300 ${
                      isOpen
                        ? 'bg-primary text-white rotate-180'
                        : 'bg-cream/40 text-textMuted group-hover:bg-cream group-hover:text-primary'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>

                {/* Smooth Max-Height Grid Transition */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pt-1 text-xs md:text-sm text-textMuted font-body leading-relaxed pl-[42px] border-t border-cream/30">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
