import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [downloadCount, setDownloadCount] = useState<number | null>(null);

  useEffect(() => {
    const initCount = async () => {
      const storedNumber = localStorage.getItem("user_number");
      
      if (storedNumber) {
        // Already has a number - use it
        setDownloadCount(parseInt(storedNumber, 10));
      } else {
        // First time - get their number and store it permanently
        const { data, error } = await supabase.rpc("increment_download_count");
        if (!error && data !== null) {
          setDownloadCount(data);
          localStorage.setItem("user_number", data.toString());
        }
      }
    };

    initCount();
  }, []);

  const formattedCount = downloadCount?.toLocaleString() ?? "...";

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        {/* Checkmark Icon */}
        <div className="opacity-0 animate-scale-in mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/15 border border-accent/30">
            <Check className="w-10 h-10 text-accent" strokeWidth={2.5} />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="opacity-0 animate-fade-up delay-100 font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-tight">
          Thank You
        </h1>

        {/* Subheading */}
        <p className="opacity-0 animate-fade-up delay-200 mt-6 font-display text-2xl md:text-3xl text-muted-foreground italic">
          your subscription
        </p>

        {/* Divider */}
        <div className="opacity-0 animate-fade-in delay-300 my-10 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-border" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="h-px w-12 bg-border" />
        </div>

        {/* Description */}
        <p className="opacity-0 animate-fade-up delay-400 font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
          You are number <span className="font-medium text-foreground">{formattedCount}/1,000,000</span>
        </p>
      </div>
    </main>
  );
};

export default Index;
