import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, MessageSquare } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Priya S.",
      role: "New Mother",
      text: "Health Care Ayurveda has changed my life. The Postnatal Care therapy and restorative oils helped me regain strength, pelvic stability, and calm my exhaustion within weeks. The therapists are so gentle and knowledgeable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 2,
      name: "Rajan M.",
      role: "Business Executive",
      text: "I visited Health Care Ayurveda for chronic back pain and stress management. The Shirodhara treatment was life-changing — my stress levels dropped dramatically. Their physicians are thorough, caring, and highly knowledgeable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 3,
      name: "Anjali R.",
      role: "Software Engineer",
      text: "I was struggling with chronic anxiety due to work stress. The combination of Shirodhara and customized herbal face packs completely cleared my skin and gave me my peace back. Truly holistic healing!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 4,
      name: "Meera K.",
      role: "Classical Dancer & Artist",
      text: "The Rejuvenation Therapy at Health Care Ayurveda is pure bliss. It's not just a spa, it's a deep biological reset. The herbal steam bath and targeted oil massage restored my range of motion and flexibility. Highly recommend!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 5,
      name: "Dr. Shalini V.",
      role: "Professor",
      text: "As an academic, I spent hours sitting, leading to chronic back pain. The customized heat treatments and spine care massage here relieved my stiffness entirely. Their pure herbal tonics are highly effective.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <section className="py-20 bg-cream/30 border-t border-cream relative overflow-hidden">
      
      {/* Decorative leaf watermarks */}
      <div className="absolute left-0 bottom-0 text-accent/10 opacity-30 pointer-events-none transform -translate-x-12 translate-y-12">
        <svg width="200" height="200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex justify-center mb-3">
            <span className="p-2 bg-white text-primary rounded-full shadow-sm">
              <MessageSquare size={20} />
            </span>
          </div>
          <span className="font-accent text-sm text-gold tracking-widest uppercase italic">
            Voices of Healing
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-textDark tracking-wide mt-2">
            Stories of Rejuvenation
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
        </div>

        {/* Swiper Slider */}
        <div className="testimonial-slider-container">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnHover: true
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              }
            }}
            className="pb-16"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="glass-panel p-8 md:p-10 rounded-2xl h-full flex flex-col justify-between border border-primary/5 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md">
                  
                  {/* Review Text */}
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-gold text-gold" />
                      ))}
                    </div>
                    
                    <p className="font-body text-sm md:text-base text-textDark/80 italic leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center space-x-4 mt-8 pt-4 border-t border-primary/5">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold/40 shadow-sm shrink-0"
                    />
                    <div>
                      <h4 className="font-display text-base font-bold text-textDark leading-none">
                        {review.name}
                      </h4>
                      <span className="font-body text-xs text-textMuted mt-1 block">
                        {review.role}
                      </span>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
