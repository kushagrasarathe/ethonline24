"use client";

import React, { useEffect, useRef } from "react";

interface FloatingImage {
  x: number;
  y: number;
  src: string;
  v: { x: number; y: number };
  range: [number, number];
  element: HTMLImageElement;
  update: () => void;
}

interface FloatingBackgroundProps {
  images: string[];
  children: React.ReactNode;
}

const FloatingBackground: React.FC<FloatingBackgroundProps> = ({
  images,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingImagesRef = useRef<FloatingImage[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const addFloatingImage = (
      delay: number,
      range: [number, number],
      src: string
    ) => {
      setTimeout(() => {
        if (!containerRef.current) return;

        const floatingImage: FloatingImage = {
          x: range[0] + Math.random() * range[1],
          y: window.innerHeight + Math.random() * 100,
          src,
          v: { x: -0.15 + Math.random() * 0.3, y: -0.5 - Math.random() * 0.5 },
          range,
          element: new Image(),
          update: function () {
            if (this.y < -100) {
              this.y = window.innerHeight + 100;
              this.x = this.range[0] + Math.random() * this.range[1];
            }
            this.y += this.v.y;
            this.x += this.v.x;
            this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
          },
        };

        floatingImage.element.src = src;
        floatingImage.element.style.position = "absolute";
        floatingImage.element.style.width = "50px";
        floatingImage.element.style.height = "auto";
        floatingImage.element.style.opacity = "0.9";
        containerRef.current.appendChild(floatingImage.element);

        floatingImagesRef.current.push(floatingImage);
      }, delay);
    };

    const totalImages = 30;
    const imagesPerType = Math.ceil(totalImages / images.length);

    for (let i = 0; i < totalImages; i++) {
      const imageIndex = Math.floor(i / imagesPerType);
      const src = images[imageIndex % images.length];
      addFloatingImage(i * 100, [0, window.innerWidth], src);
    }

    const animate = () => {
      floatingImagesRef.current.forEach((image) => image.update());
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      floatingImagesRef.current.forEach((image) => {
        image.range = [0, window.innerWidth];
        if (image.y < -100 || image.y > window.innerHeight + 100) {
          image.y = Math.random() * window.innerHeight;
        }
        if (image.x < -100 || image.x > window.innerWidth + 100) {
          image.x = Math.random() * window.innerWidth;
        }
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      floatingImagesRef.current.forEach((image) => image.element.remove());
      floatingImagesRef.current = [];
      window.removeEventListener("resize", handleResize);
    };
  }, [images]);

  return (
    <div className="floating-background">
      <div className="container" ref={containerRef}></div>
      <div className="content">{children}</div>
      <style jsx>{`
        .floating-background {
          width: 100%;
          height: 100vh;
          background: #fff;
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          z-index: -1;
        }

        .container {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .content {
          position: relative;
          z-index: 1;
          height: 100vh;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default FloatingBackground;
