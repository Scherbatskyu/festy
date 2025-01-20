import React, { useState, useRef, useEffect } from 'react';

const MovingTextGame = () => {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const messages = [
    'click me cutie',
    'loser can\'t even click a button',
    'your mom is a hoe',
    'you srsly suck',
    'i am here u dumbass',
    'last try',
  ];

  const getCurrentMessage = () => {
    return attempts < messages.length ? messages[attempts] : messages[messages.length - 1];
  };

  const moveText = () => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const maxX = container.width - 120; // Button width
      const maxY = container.height - 40; // Button height

      const newX = Math.max(0, Math.random() * maxX);
      const newY = Math.max(0, Math.random() * maxY);

      setPosition({ x: newX, y: newY });
    }
  };

  const handleClick = () => {
    if (attempts < 5) {
      setAttempts(attempts + 1);
      moveText();
    } else {
      window.location.href = 'https://www.festember.com/'; // Replace with your target URL
    }
  };

  useEffect(() => {
    // Recalculate button position on window resize
    const handleResize = moveText;
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-gray-100 flex items-center justify-center"
    >
      <button
        className={`absolute px-4 py-2 text-base font-bold text-white rounded-lg transition-all duration-300 ${
          attempts < 5 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: attempts < 5 ? 'pointer' : 'pointer',
        }}
        onClick={handleClick}
      >
        {getCurrentMessage()}
      </button>
      <div className="fixed top-4 right-4 text-base font-semibold text-gray-700">
        Attempts: {attempts}/5
      </div>
    </div>
  );
};

export default MovingTextGame;
