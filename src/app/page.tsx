import { ComingSoonPage } from "@/components/coming-soon/ComingSoonPage";


export default function Home() {
  return (
    <ComingSoonPage
      launchDate={new Date("2025-11-20T11:00:00+05:30")} // Adjust your launch date
      title="Vizag Writers: A New Chapter is Coming Soon!"
      subtitle="The heart of Vizag's writing community is evolving. Get ready for an even more vibrant space where every voice finds its stage, every story matters, and every writer truly belongs. Join us as we unveil our new home!"
    />
  );
}