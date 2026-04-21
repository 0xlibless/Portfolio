import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) {
      return undefined;
    }

    const xDotTo = gsap.quickTo(cursorDot.current, "x", { duration: 0.1, ease: "power3" });
    const yDotTo = gsap.quickTo(cursorDot.current, "y", { duration: 0.1, ease: "power3" });
    
    const xRingTo = gsap.quickTo(cursorRing.current, "x", { duration: 0.4, ease: "power3" });
    const yRingTo = gsap.quickTo(cursorRing.current, "y", { duration: 0.4, ease: "power3" });

    gsap.set([cursorDot.current, cursorRing.current], { xPercent: -50, yPercent: -50 });

    const showCursor = () => {
      gsap.to([cursorDot.current, cursorRing.current], { opacity: 1, duration: 0.3 });
    };

    const hideCursor = () => {
      gsap.to([cursorDot.current, cursorRing.current], { opacity: 0, duration: 0.3 });
    };

    const moveCursor = (e) => {
      showCursor();
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    window.addEventListener('pointermove', moveCursor, { passive: true });
    window.addEventListener('pointerleave', hideCursor);

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('pointerleave', hideCursor);
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className="cursor cursor-dot" />
      <div ref={cursorRing} className="cursor cursor-ring" />
    </>
  );
}