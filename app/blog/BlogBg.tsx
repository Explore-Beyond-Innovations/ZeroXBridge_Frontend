"use client";
import React, { useRef, useEffect } from "react";

const NUM_PARTICLES = 40;

const random = (min: number, max: number) =>
    Math.random() * (max - min) + min;

const BlogBg: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles = Array.from({ length: NUM_PARTICLES }, () => ({
            x: random(0, width),
            y: random(0, height),
            r: random(1, 3),
            dx: random(-0.2, 0.2),
            dy: random(-0.2, 0.2),
            opacity: random(0.2, 0.7),
        }));

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`; // White color with opacity
                ctx.shadowColor = "#FFFFFF";
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.closePath();

                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0 || p.x > width) p.dx *= -1;
                if (p.y < 0 || p.y > height) p.dy *= -1;
            }
            requestAnimationFrame(draw);
        }

        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full z-[-1]">
            
            <div className="absolute inset-0 w-full h-full bg-[#09050E]" />
            
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            <style jsx global>{`
                @keyframes gradient-move {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                .animate-gradient-move {
                    background-size: 200% 200%;
                    animation: gradient-move 12s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default BlogBg;