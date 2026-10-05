import React, { useState } from 'react';

export const Tooltip = ({ content, children, position = 'top', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && (
        <div
          role="tooltip"
          className={`absolute z-50 pointer-events-none whitespace-nowrap bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase font-mono px-2.5 py-1 border border-[#D4AF37]/40 shadow-lg transition-opacity duration-300 ${positionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};
