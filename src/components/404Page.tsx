"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotFoundContentProps {
  onGoHome?: () => void;
  onGoBack?: () => void;
  homeUrl?: string;
}

export function NotFoundContent({
  onGoHome,
  onGoBack,
  homeUrl = "/",
}: NotFoundContentProps) {
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
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or you entered the wrong URL.
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
              animation: "smoothPulse 1.5s ease-in-out infinite",
            }}
          >
            ❤
          </span>
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
    </div>
  );
}