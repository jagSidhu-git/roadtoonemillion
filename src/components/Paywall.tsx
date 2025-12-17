import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

interface PaywallProps {
  onSubscribed: () => void;
}

const Paywall = ({ onSubscribed }: PaywallProps) => {
  const { packages, isLoading, purchasePackage, restorePurchases } = useSubscription();

  const handlePurchase = async () => {
    if (packages.length === 0) return;
    
    const result = await purchasePackage(packages[0]);
    if (result.success) {
      onSubscribed();
    }
  };

  const handleRestore = async () => {
    const result = await restorePurchases();
    if (result.success && result.isSubscribed) {
      onSubscribed();
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Header */}
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-4">
          Join the Journey
        </h1>
        <p className="font-body text-muted-foreground mb-10">
          Subscribe to be part of the 1,000,000
        </p>

        {/* Subscription Card */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-6">
          <div className="font-display text-2xl text-foreground mb-2">
            Premium Access
          </div>
          
          {packages.length > 0 ? (
            <div className="font-body text-3xl font-medium text-foreground mb-6">
              {packages[0].product.priceString}
              <span className="text-base text-muted-foreground font-normal">
                /{packages[0].packageType === "ANNUAL" ? "year" : "month"}
              </span>
            </div>
          ) : (
          <div className="font-body text-3xl font-medium text-foreground mb-6">
            $1.00
            <span className="text-base text-muted-foreground font-normal">/month</span>
          </div>
          )}

          {/* Features */}
          <div className="space-y-3 mb-8 text-left">
            {["Exclusive access", "Part of the 1,000,000", "Support the mission"].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <span className="font-body text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Subscribe Button */}
          <Button
            onClick={handlePurchase}
            disabled={isLoading}
            className="w-full h-14 text-lg font-body"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Subscribe Now"
            )}
          </Button>
        </div>

        {/* Restore Purchases */}
        <button
          onClick={handleRestore}
          disabled={isLoading}
          className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Restore Purchases
        </button>

        {/* Terms */}
        <p className="mt-6 font-body text-xs text-muted-foreground/60">
          Subscription automatically renews. Cancel anytime in Settings.
        </p>
      </div>
    </main>
  );
};

export default Paywall;
