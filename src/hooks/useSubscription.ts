import { useEffect, useState, useCallback } from "react";
import { Capacitor } from "@capacitor/core";
import { Purchases, CustomerInfo, PurchasesPackage } from "@revenuecat/purchases-capacitor";

interface SubscriptionState {
  isSubscribed: boolean;
  isLoading: boolean;
  packages: PurchasesPackage[];
  customerInfo: CustomerInfo | null;
}

// Replace with your RevenueCat API key from the RevenueCat dashboard
const REVENUECAT_API_KEY = "your_revenuecat_api_key";

export const useSubscription = () => {
  const [state, setState] = useState<SubscriptionState>({
    isSubscribed: false,
    isLoading: true,
    packages: [],
    customerInfo: null,
  });

  useEffect(() => {
    const initPurchases = async () => {
      if (!Capacitor.isNativePlatform()) {
        // Not on native platform, skip initialization
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        await Purchases.configure({
          apiKey: REVENUECAT_API_KEY,
        });

        // Get customer info to check subscription status
        const { customerInfo } = await Purchases.getCustomerInfo();
        const isSubscribed = Object.keys(customerInfo.entitlements.active).length > 0;

        // Get available packages
        const offerings = await Purchases.getOfferings();
        const packages = offerings?.current?.availablePackages ?? [];

        setState({
          isSubscribed,
          isLoading: false,
          packages,
          customerInfo,
        });
      } catch (error) {
        console.error("Error initializing purchases:", error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initPurchases();
  }, []);

  const purchasePackage = useCallback(async (pkg: PurchasesPackage) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg });
      const isSubscribed = Object.keys(customerInfo.entitlements.active).length > 0;

      setState(prev => ({
        ...prev,
        isSubscribed,
        customerInfo,
        isLoading: false,
      }));

      return { success: true, customerInfo };
    } catch (error: any) {
      console.error("Purchase error:", error);
      setState(prev => ({ ...prev, isLoading: false }));
      
      // User cancelled
      if (error.code === "1") {
        return { success: false, cancelled: true };
      }
      
      return { success: false, error };
    }
  }, []);

  const restorePurchases = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { customerInfo } = await Purchases.restorePurchases();
      const isSubscribed = Object.keys(customerInfo.entitlements.active).length > 0;

      setState(prev => ({
        ...prev,
        isSubscribed,
        customerInfo,
        isLoading: false,
      }));

      return { success: true, isSubscribed };
    } catch (error) {
      console.error("Restore error:", error);
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error };
    }
  }, []);

  return {
    ...state,
    purchasePackage,
    restorePurchases,
  };
};
