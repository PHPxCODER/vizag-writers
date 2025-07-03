"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, ExternalLink } from "lucide-react";

interface NotFoundPageProps {
  onGoHome?: () => void;
  onGoBack?: () => void;
  homeUrl?: string;
}

function NotFoundPage({
  onGoHome,
  onGoBack,
  homeUrl = "/",
}: NotFoundPageProps) {
  // Store particle positions in state, initialized as an empty array
  const [particlePositions, setParticlePositions] = useState<
    { x: number; y: number }[]
  >([]);

  // Effect for particle generation - only run on client after initial render
  useEffect(() => {
    // Check if window is defined to ensure client-side execution for initial values
    if (typeof window !== "undefined") {
      const newPositions = [...Array(20)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setParticlePositions(newPositions);
    }

    // Set up interval for animating particle movement after initial render
    const particleInterval = setInterval(() => {
      if (typeof window !== "undefined") {
        setParticlePositions((prevPositions) =>
          prevPositions.map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          })),
        );
      }
    }, 30000); // Regenerate new target positions periodically for movement

    return () => clearInterval(particleInterval);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = homeUrl;
    }
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            animation: "grid-move 60s linear infinite",
          }}
        />
      </div>

      {/* Static Animated Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 70%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 70%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 70%)
          `,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            initial={{
              x: pos.x,
              y: pos.y,
            }}
            animate={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            }}
            transition={{
              duration: Math.random() * 40 + 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Pulsing Dots Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            animation: "pulse-dots 8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{
            duration: 75,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "60%", right: "10%" }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 54,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "40%", left: "50%" }}
        />
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-8">
        <motion.div
          className="absolute w-32 h-32 border border-primary/30"
          style={{ top: "20%", right: "20%" }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-24 h-24 border border-secondary/30 rounded-full"
          style={{ bottom: "30%", left: "15%" }}
          animate={{
            rotate: [360, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 75,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
          style={{
            top: "70%",
            right: "40%",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
          animate={{
            rotate: [0, 180, 360],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <motion.div
          className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ top: "25%", width: "100%" }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-px bg-gradient-to-b from-transparent via-secondary to-transparent"
          style={{ left: "75%", height: "100%" }}
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-2 sm:px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight"
            style={{
              backgroundSize: "200% 200%",
              animation: "gradient-shift 3s ease-in-out infinite",
              lineHeight: "0.8",
            }}
          >
            404
          </motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight px-4"
            style={{
              backgroundSize: "200% 200%",
              animation: "gradient-shift 3s ease-in-out infinite",
              lineHeight: "1.2",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-xl mx-auto font-inter px-4 leading-relaxed"
          >
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto px-4"
          >
            <Button
              onClick={handleGoHome}
              className="group relative overflow-hidden font-inter w-full sm:w-auto"
            >
              <span className="inline-flex items-center transition-all duration-200">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="group relative overflow-hidden font-inter w-full sm:w-auto bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/90"
            >
              <span className="inline-flex items-center transition-all duration-200">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Go Back
              </span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 md:mt-12 flex items-center justify-center gap-2 text-muted-foreground font-inter px-4"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Search className="h-4 w-4" />
              <span>Lost? Try searching from our homepage</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Crafted with love footer - positioned at bottom */}
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center text-xs text-muted-foreground/70 font-inter"
        >
          Crafted with{" "}
          <span
            className="inline-block text-red-500"
            style={{
              animation: "smoothPulse 1.5s ease-in-out infinite"
            }}
          >❤</span>
          {" "}by{" "}
          <a
            href="https://rdpdatacenter.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/80 font-medium hover:text-primary transition-colors duration-200 inline-flex items-center gap-1"
          >
            RDP Datacenter
            <ExternalLink className="h-3 w-3" />
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes pulse-dots {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        @keyframes smoothPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}

export default function NotFoundDemo() {
  return (
    <NotFoundPage
      homeUrl="/"
    />
  );
}