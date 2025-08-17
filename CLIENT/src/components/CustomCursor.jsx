import { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let rafId;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Use requestAnimationFrame to avoid React re-render on every pixel
      rafId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
      });

      setVisible(true);

      // Hover detection
      const hoverElements = document.querySelectorAll(
        'button, a, [role="button"], .clickable'
      );
      let hovering = false;
      const cursorRadius = 70;

      hoverElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;

        const distance = Math.hypot(x - elCenterX, y - elCenterY);
        if (distance < cursorRadius + Math.max(rect.width, rect.height) / 2) {
          hovering = true;
        }
      });

      setIsHovering(hovering);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[51]"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease-out',
        willChange: 'transform',
      }}
    >
      {/* Glow Effect */}
      <div
        className="absolute w-24 h-24 rounded-full"
        style={{
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          background:
            'radial-gradient(circle, rgba(45, 212, 191, 0.4) 0%, rgba(45, 212, 191, 0.2) 40%, transparent 70%)',
          filter: 'blur(8px)',
          opacity: isHovering ? 1 : 0.6,
          animation: isHovering ? 'none' : 'pulse 2s ease-in-out infinite',
          left: '12px',
          top: '12px',
        }}
      />

      {/* Arrow SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="42"
        viewBox="6 0 24 24"
        className="absolute z-10"
        style={{ transform: `scale(${isHovering ? 1.1 : 1})` }}
      >
        <defs>
          <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf">
              <animate
                attributeName="stop-color"
                values="#2dd4bf;#2dd4bf;#f87171;#f87171;#2dd4bf"
                dur="7s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#2dd4bf">
              <animate
                attributeName="stop-color"
                values="#2dd4bf;#2dd4bf;#f87171;#f87171;#2dd4bf"
                dur="7s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <path fill="url(#animatedGradient)" d="M4.5.79v22.42l6.56-6.57h9.29L4.5.79z" />
      </svg>
    </div>
  );
};

export default CustomCursor;
