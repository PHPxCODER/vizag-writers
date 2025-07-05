"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, LoaderCircle } from "lucide-react";

// Removed onNotifyMe prop - it will directly call the API route
// interface NotifyFormProps {
//   onNotifyMe: (email: string) => Promise<{ success: boolean; error?: string }>;
// }

export function NotifyForm() { // No props for now, as it handles its own API call
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      // Call the API endpoint directly from the Client Component
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
      // It's good practice to narrow down the error type if possible
      setError(`Failed to subscribe. Please try again. ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            className="text-center p-6 bg-card/30 border border-border/50 rounded-xl backdrop-blur-sm shadow-lg"
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
            <h3 className="text-lg font-semibold mb-2 font-inter">
              You&apos;re all set!
            </h3>
            <p className="text-muted-foreground font-inter">
              We&apos;ll notify you as soon as we launch.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}