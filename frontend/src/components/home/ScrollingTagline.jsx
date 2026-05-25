import { Fragment } from 'react';

const taglines = [
  "Authentic Kerala Ayurveda",
  "Holistic Wellness for All",
  "100% Organic Herbal Formulations",
  "Expert Ayurvedic Physicians",
  "Holistic Panchakarma Therapies",
  "Rejuvenation & Stress Management",
  "Tradition of Natural Healing"
];

const ScrollingTagline = () => {
  // Duplicate array for infinite scroll effect
  const doubleTaglines = [...taglines, ...taglines];

  return (
    <div className="w-full bg-primary-dark border-y border-gold/20 py-3.5 overflow-hidden relative select-none z-10">
      {/* Soft gradient edge masking */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-primary-dark to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-primary-dark to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max scroll-pause">
        <div className="flex space-x-16 items-center px-8 scroll-left whitespace-nowrap text-gold font-serif text-base md:text-lg tracking-wider">
          {doubleTaglines.map((tag, idx) => (
            <Fragment key={idx}>
              <span className="flex items-center gap-2">
                <span className="text-accent-light mr-1">✦</span>
                {tag}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingTagline;
