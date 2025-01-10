import React, { useState } from 'react';

interface TooltipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

const InteractiveScene = () => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    text: '',
    x: 0,
    y: 0,
  });

  const handleHover = (text: string, event: React.MouseEvent) => {
    const rect = (event.target as SVGElement).getBoundingClientRect();
    setTooltip({
      visible: true,
      text,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className="relative w-full h-screen">
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute z-50 px-4 py-2 text-white bg-black rounded pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y - 10 }}
        >
          {tooltip.text}
        </div>
      )}
      
      {/* Placeholder SVG - Replace with your Figma export */}
      <svg
        viewBox="0 0 1920 1080"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background image */}
        <image
          href="/assets/office-bg.png"
          width="1920"
          height="1080"
          preserveAspectRatio="xMidYMid slice"
        />
        
        {/* Interactive areas - These will be replaced with your actual paths */}
        <rect
          x="960"
          y="540"
          width="100"
          height="100"
          fill="transparent"
          className="cursor-pointer hover:fill-white hover:fill-opacity-20 transition-all"
          onMouseEnter={(e) => handleHover('Contact Information', e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => window.open('/contact', '_blank')}
        />
        
        {/* Add more interactive areas here when you have the SVG ready */}
      </svg>
    </div>
  );
};

export default InteractiveScene;