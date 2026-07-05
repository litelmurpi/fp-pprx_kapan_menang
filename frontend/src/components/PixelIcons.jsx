import React from 'react';

// Common SVG props for authentic 8-bit Neo-Retro pixel rendering
const svgProps = (className = "w-5 h-5") => ({
  viewBox: "0 0 16 16",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  shapeRendering: "crispEdges",
  className: `${className} shrink-0 inline-block`
});

export const PixelSparkle = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M7 1H9V3H7V1ZM7 13H9V15H7V13ZM1 7H3V9H1V7ZM13 7H15V9H13V7ZM7 5H9V7H11V9H9V11H7V9H5V7H7V5ZM3 3H5V5H3V3ZM11 3H13V5H11V3ZM3 11H5V13H3V11ZM11 11H13V13H11V11Z" />
  </svg>
);

export const PixelHeart = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M2 3H6V4H7V5H9V4H10V3H14V7H13V9H12V10H11V11H10V12H9V13H7V12H6V11H5V10H4V9H3V7H2V3Z" />
  </svg>
);

export const PixelShield = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M3 2H13V4H14V9H13V11H12V12H11V13H10V14H8V15H6V14H5V13H4V12H3V11H2V9H3V4H3V2ZM5 7V9H7V11H9V9H11V7H9V9H7V7H5Z" />
  </svg>
);

export const PixelTrophy = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M4 2H12V4H14V7H12V9H10V11H9V13H11V15H5V13H7V11H6V9H4V7H2V4H4V2ZM4 4V7H6V4H4ZM10 4V7H12V4H10ZM6 13H10V14H6V13Z" />
  </svg>
);

export const PixelCheck = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M13 3H15V5H13V7H11V9H9V11H7V13H5V11H3V9H1V7H3V9H5V11H7V9H9V7H11V5H13V3Z" />
  </svg>
);

export const PixelArrow = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M2 7H10V5H12V7H14V9H12V11H10V9H2V7ZM10 3H12V5H10V3ZM10 11H12V13H10V11Z" />
  </svg>
);

export const PixelRobot = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M7 1H9V3H13V5H15V11H13V13H11V15H5V13H3V11H1V5H3V3H7V1ZM5 5V11H11V5H5ZM6 6H7V8H6V6ZM9 6H10V8H9V6ZM6 9H10V10H6V9Z" />
  </svg>
);

export const PixelStar = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M7 1H9V5H13V7H15V9H11V11H13V15H11V13H9V15H7V13H5V15H3V11H5V9H1V7H3V5H7V1Z" />
  </svg>
);

export const PixelTerminal = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M2 3H4V5H6V7H8V9H6V11H4V13H2V11H4V9H6V7H4V5H2V3ZM9 11H14V13H9V11Z" />
  </svg>
);

export const PixelLock = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M6 2H10V4H12V6H14V14H2V6H4V4H6V2ZM6 4V6H10V4H6ZM7 9H9V12H7V9Z" />
  </svg>
);

export const PixelAlert = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M7 1H9V3H10V5H11V7H12V9H13V11H14V13H15V15H1V13H2V11H3V9H4V7H5V5H6V3H7V1ZM7 6V10H9V6H7ZM7 11V13H9V11H7Z" />
  </svg>
);

export const PixelGrid = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M1 1H5V5H1V1ZM6 1H10V5H6V1ZM11 1H15V5H11V1ZM1 6H5V10H1V6ZM6 6H10V10H6V6ZM11 6H15V10H11V6ZM1 11H5V15H1V11ZM6 11H10V15H6V11ZM11 11H15V15H11V11Z" />
  </svg>
);

export const PixelLogo = ({ className }) => (
  <svg {...svgProps(className)}>
    <path d="M2 2H6V6H4V10H6V14H2V2ZM10 2H14V14H10V10H12V6H10V2ZM6 6H10V10H6V6Z" />
  </svg>
);

export const PixelCloud = ({ className }) => (
  <svg {...svgProps(className)} viewBox="0 0 20 14">
    <path d="M4 4H10V2H14V4H18V10H16V12H2V8H4V4Z" fill="currentColor" stroke="#000000" strokeWidth="1.5" />
  </svg>
);

export const PixelDino = ({ className }) => (
  <svg {...svgProps(className)} viewBox="0 0 20 20">
    <path d="M10 2H18V4H16V6H18V8H12V10H14V12H16V14H14V18H12V16H10V18H8V14H6V12H4V10H2V6H4V8H6V10H8V8H10V2Z" fill="currentColor" stroke="#000000" strokeWidth="1" />
    <rect x="13" y="3" width="2" height="2" fill="#000000" />
  </svg>
);

