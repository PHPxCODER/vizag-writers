"use client";

import React from "react";
import { ComingSoonBackground } from "./ComingSoonBackground";
import { ComingSoonContent } from "./ComingSoonContent";

interface ComingSoonPageProps {
  launchDate?: Date;
  title?: string;
  subtitle?: string;
  // Removed onNotifyMe prop
  // onNotifyMe?: (email: string) => Promise<{ success: boolean; error?: string }>;
}

export function ComingSoonPage({
  launchDate = new Date("2025-08-20T11:00:00+05:30"),
  title = "Something Amazing is Coming Soon",
  subtitle = "We're working hard to bring you something extraordinary. Get notified when we launch!",
}: ComingSoonPageProps) { // Removed onNotifyMe from destructuring
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ComingSoonBackground />
      <ComingSoonContent
        launchDate={launchDate}
        title={title}
        subtitle={subtitle}
        // No longer passing onNotifyMe to ComingSoonContent
      />
    </div>
  );
}