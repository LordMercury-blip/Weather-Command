import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Main gradient background matching the reference */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/80 to-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-purple-500/10"></div>
      </div>
      
      {/* Animated wireframe grid overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'grid-move 25s linear infinite'
        }}></div>
      </div>
      
      {/* 3D wireframe elements */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M20,80 Q50,20 80,80"
            stroke="rgba(168, 85, 247, 0.6)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <circle cx="50" cy="50" r="30" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-600/15 rounded-full blur-2xl animate-float-delayed"></div>
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>
    </div>
  );
};

export default Background;