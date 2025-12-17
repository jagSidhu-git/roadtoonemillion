import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import FallingCash from "@/components/FallingCash";
import Paywall from "@/components/Paywall";
import { useSubscription } from "@/hooks/useSubscription";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [downloadCount, setDownloadCount] = useState<number | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const { isSubscribed, isLoading: subscriptionLoading } = useSubscription();

  useEffect(() => {
    // Check if user has already seen thank you page (has a number)
    const storedNumber = localStorage.getItem("user_number");
    if (storedNumber) {
      setShowThankYou(true);
      setDownloadCount(parseInt(storedNumber, 10));
    }
  }, []);

  useEffect(() => {
    // When subscription is confirmed, get their number
    if (isSubscribed && !downloadCount) {
      const getNumber = async () => {
        const storedNumber = localStorage.getItem("user_number");
        
        if (storedNumber) {
          setDownloadCount(parseInt(storedNumber, 10));
        } else {
          const { data, error } = await supabase.rpc("increment_download_count");
          if (!error && data !== null) {
            setDownloadCount(data);
            localStorage.setItem("user_number", data.toString());
          }
        }
        setShowThankYou(true);
      };
      getNumber();
    }
  }, [isSubscribed, downloadCount]);

  const handleSubscribed = () => {
    setShowThankYou(true);
  };

  // Show loading state while checking subscription
  if (subscriptionLoading && !showThankYou) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </main>
    );
  }

  // Show paywall if not subscribed and hasn't seen thank you
  if (!isSubscribed && !showThankYou) {
    return <Paywall onSubscribed={handleSubscribed} />;
  }

  const formattedCount = downloadCount?.toLocaleString() ?? "...";

  return (
    <>
      <FallingCash />
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
            for your subscription
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
    </>
  );
};

export default Index;
