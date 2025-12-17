import { useEffect, useState } from "react";

interface CashItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  symbol: string;
}

const FallingCash = () => {
  const [cashItems, setCashItems] = useState<CashItem[]>([]);

  useEffect(() => {
    const symbols = ["$", "💵", "$", "💸", "$", "💰"];
    const items: CashItem[] = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 16 + Math.random() * 24,
      rotation: Math.random() * 360,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    setCashItems(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {cashItems.map((item) => (
        <span
          key={item.id}
          className="absolute animate-fall opacity-0"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            fontSize: `${item.size}px`,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
};

export default FallingCash;
