"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, LoaderCircle, Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ComingSoonPageProps {
  launchDate?: Date;
  title?: string;
  subtitle?: string;
  onNotifyMe?: (email: string) => Promise<{ success: boolean; error?: string }>;
}

function ComingSoonPage({
  launchDate = new Date("2025-08-20T11:00:00+05:30"),
  title = "Something Amazing is Coming Soon",
  subtitle = "We're working hard to bring you something extraordinary. Get notified when we launch!",
  onNotifyMe,
}: ComingSoonPageProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  // Store particle positions in state, initialized as an empty array
  const [particlePositions, setParticlePositions] = useState<
    { x: number; y: number }[]
  >([]);

  // Effect to calculate and update time left every second
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = launchDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

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

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
  
    setIsLoading(true);
    setError("");
  
    try {
      // Call the API endpoint directly
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSubscribed(true);
        setEmail("");
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      setError(
        `Failed to subscribe. Please try again.`,
      );
    } finally {
      setIsLoading(false);
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
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-dancing-script font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight px-4"
            style={{
              backgroundSize: "200% 200%",
              animation: "gradient-shift 3s ease-in-out infinite",
              lineHeight: "1.2",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-xl mx-auto font-inter px-4 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12 max-w-lg md:max-w-2xl mx-auto px-4"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="bg-card border border-border rounded-lg p-3 md:p-4 shadow-lg backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1 font-inter">
                  <NumberFlow
                    value={item.value}
                    format={{ minimumIntegerDigits: 2 }}
                    className="tabular-nums"
                    transformTiming={{
                      duration: 800,
                      easing: "ease-out",
                    }}
                  />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-inter">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-sm sm:max-w-md mx-auto px-4"
          >
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form"
                  onSubmit={handleNotifyMe}
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary font-inter"
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !email}
                      className="group relative overflow-hidden font-inter"
                    >
                      <span
                        className={cn(
                          "inline-flex items-center transition-all duration-200",
                          isLoading && "text-transparent",
                        )}
                      >
                        Notify Me
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        </div>
                      )}
                    </Button>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm font-inter"
                    >
                      {error}
                    </motion.p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-6 bg-card border border-border rounded-lg backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 font-inter">You&apos;re all set!</h3>
                  <p className="text-muted-foreground font-inter">
                    We&apos;ll notify you as soon as we launch.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 text-muted-foreground font-inter px-4"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-xs sm:text-sm text-center">
                Launching{" "}
                {launchDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at 11:00 AM IST
              </span>
            </div>
          </motion.div>
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
      `}</style>
    </div>
  );
}

async function mockNotifyMe(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (email.includes("error")) {
    return { success: false, error: "Something went wrong! Please try another email." };
  }
  return { success: true };
}

export default function ComingSoonDemo() {
  return (
    <ComingSoonPage
      launchDate={new Date("2025-08-20T11:00:00+05:30")}
      title="Vizag Writers: A New Chapter is Coming Soon!"
      subtitle="The heart of Vizag's writing community is evolving. Get ready for an even more vibrant space where every voice finds its stage, every story matters, and every writer truly belongs. Join us as we unveil our new home!"
      onNotifyMe={mockNotifyMe}
    />
  );
}