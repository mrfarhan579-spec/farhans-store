'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
      }
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
      }
      requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      if (cursorRef.current) cursorRef.current.style.transform += ' scale(2)';
      if (followerRef.current) {
        followerRef.current.style.width = '60px';
        followerRef.current.style.height = '60px';
        followerRef.current.style.borderColor = 'rgba(201,168,76,0.8)';
      }
    };

    const onMouseLeaveLink = () => {
      if (followerRef.current) {
        followerRef.current.style.width = '36px';
        followerRef.current.style.height = '36px';
        followerRef.current.style.borderColor = 'rgba(201,168,76,0.5)';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
