import React from 'react';

export const Gridlines = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle Paper Noise Overlay */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-30 dark:opacity-15" />
    </div>
  );
};
