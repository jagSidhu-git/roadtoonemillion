import { Check } from "lucide-react";

const Index = () => {
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
          for your purchase
        </p>

        {/* Divider */}
        <div className="opacity-0 animate-fade-in delay-300 my-10 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-border" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="h-px w-12 bg-border" />
        </div>

        {/* Description */}
        <p className="opacity-0 animate-fade-up delay-400 font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
          Your order has been confirmed and will be shipped shortly. 
          A confirmation email with tracking details is on its way.
        </p>

        {/* Order reference */}
        <div className="opacity-0 animate-fade-up delay-500 mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border">
          <span className="font-body text-sm text-muted-foreground">Order reference</span>
          <span className="font-body text-sm font-medium text-foreground tracking-wide">#ORD-2024-7842</span>
        </div>
      </div>
    </main>
  );
};

export default Index;
