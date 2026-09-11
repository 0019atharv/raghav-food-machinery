import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * DynamicIndustrialBackground
 * High-performance canvas-based dynamic animated background.
 * Displays mechanical engineering particle nodes, technical blueprint grid,
 * rotating industrial gears, and parallax motion linked directly to page scroll!
 */
export default function DynamicIndustrialBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let scrollY = window.scrollY || 0;
    let targetScrollY = scrollY;
    let scrollVelocity = 0;

    // Mouse interactive coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isMoving: false
    };

    // Particle nodes definition
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.3 ? 'rgba(245, 158, 11, ' : 'rgba(148, 163, 184, ',
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    // Industrial Gears representation
    const gears = [
      { x: width * 0.9, y: height * 0.25, radius: 120, teeth: 16, angle: 0, speed: 0.003, color: 'rgba(245, 158, 11, 0.04)' },
      { x: width * 0.96, y: height * 0.45, radius: 80, teeth: 12, angle: 0, speed: -0.0045, color: 'rgba(255, 255, 255, 0.025)' },
      { x: width * 0.05, y: height * 0.7, radius: 140, teeth: 20, angle: 0, speed: 0.002, color: 'rgba(14, 165, 233, 0.03)' },
      { x: width * 0.12, y: height * 0.88, radius: 70, teeth: 10, angle: 0, speed: -0.004, color: 'rgba(245, 158, 11, 0.035)' }
    ];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gears[0].x = width * 0.9;
      gears[1].x = width * 0.96;
      gears[2].x = width * 0.05;
      gears[3].x = width * 0.12;
    };

    let lastScrollTime = Date.now();
    let prevScrollY = window.scrollY || 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY || 0;
      const now = Date.now();
      const dt = Math.max(now - lastScrollTime, 16);
      scrollVelocity = (currentScroll - prevScrollY) / dt;
      targetScrollY = currentScroll;
      prevScrollY = currentScroll;
      lastScrollTime = now;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isMoving = true;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Helper: Draw gear
    const drawGear = (gear, scrollFactor) => {
      ctx.save();
      ctx.translate(gear.x, gear.y - (scrollY * 0.15) % height);
      ctx.rotate(gear.angle + (scrollY * gear.speed * 0.5));
      ctx.strokeStyle = gear.color;
      ctx.lineWidth = 1.5;

      const innerRadius = gear.radius * 0.8;
      const toothDepth = gear.radius * 0.2;
      const step = (Math.PI * 2) / gear.teeth;

      ctx.beginPath();
      for (let i = 0; i < gear.teeth; i++) {
        const a = i * step;
        ctx.lineTo(Math.cos(a) * (gear.radius + toothDepth), Math.sin(a) * (gear.radius + toothDepth));
        ctx.lineTo(Math.cos(a + step * 0.4) * (gear.radius + toothDepth), Math.sin(a + step * 0.4) * (gear.radius + toothDepth));
        ctx.lineTo(Math.cos(a + step * 0.5) * gear.radius, Math.sin(a + step * 0.5) * gear.radius);
        ctx.lineTo(Math.cos(a + step * 0.9) * gear.radius, Math.sin(a + step * 0.9) * gear.radius);
      }
      ctx.closePath();
      ctx.stroke();

      // Center hole & spokes
      ctx.beginPath();
      ctx.arc(0, 0, gear.radius * 0.35, 0, Math.PI * 2);
      ctx.stroke();

      for (let s = 0; s < 4; s++) {
        const spAngle = (s * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(spAngle) * gear.radius * 0.35, Math.sin(spAngle) * gear.radius * 0.35);
        ctx.lineTo(Math.cos(spAngle) * gear.radius * 0.8, Math.sin(spAngle) * gear.radius * 0.8);
        ctx.stroke();
      }

      ctx.restore();
      gear.angle += gear.speed + (scrollVelocity * 0.015);
    };

    // Render loop
    const render = () => {
      // Smooth interpolation for scroll and mouse
      scrollY += (targetScrollY - scrollY) * 0.08;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic Blueprint Grid that shifts with scroll
      ctx.save();
      const gridSize = 60;
      const gridOffsetY = (scrollY * 0.2) % gridSize;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -gridOffsetY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Render gears
      gears.forEach(gear => drawGear(gear, scrollY));

      // Update and draw particles & connectivity lines
      const maxDistance = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion physics with scroll impulse
        p.x += p.vx + (scrollVelocity * 0.1);
        p.y += p.vy - (scrollVelocity * 0.2);

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse repulsion / attraction
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          p.x -= (dxMouse / distMouse) * 0.8;
          p.y -= (dyMouse / distMouse) * 0.8;
        }

        // Draw particle dot
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.14;
            const curTheme = themeRef.current || 'dark';
            if (curTheme === 'light') {
              ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha * 1.4})`;
            } else if (curTheme === 'navy') {
              ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha * 1.2})`;
            } else if (curTheme === 'amber') {
              ctx.strokeStyle = `rgba(251, 191, 36, ${lineAlpha * 1.3})`;
            } else {
              ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`;
            }
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Canvas with Particles & Gears */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Atmospheric Ambient Glow Gradients */}
      <div 
        className={`absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          theme === 'light' ? 'bg-amber-500/10' : theme === 'navy' ? 'bg-cyan-500/10' : 'bg-amber-500/5'
        }`} 
      />
      <div 
        className={`absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
          theme === 'light' ? 'bg-slate-400/10' : theme === 'navy' ? 'bg-blue-600/10' : 'bg-sky-500/5'
        }`} 
      />
      <div 
        className={`absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none transition-all duration-700 ${
          theme === 'light' ? 'bg-amber-600/10' : theme === 'navy' ? 'bg-cyan-600/10' : 'bg-amber-600/5'
        }`} 
      />
    </div>
  );
}

