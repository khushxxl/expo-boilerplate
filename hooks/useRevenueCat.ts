import { useEffect, useState } from "react";
import Purchases, {
  PurchasesOffering,
  CustomerInfo,
  PurchasesOfferings,
} from "react-native-purchases";
import { router } from "expo-router";
import { supabase } from "@/db/supabase";

export const useRevenueCat = () => {
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  const [allOfferings, setAllOfferings] = useState<PurchasesOfferings | null>(
    null
  );
  const [isProMember, setIsProMember] = useState(false);

  useEffect(() => {
    const initPurchases = async () => {
      try {
        Purchases.setDebugLogsEnabled(true);

        // Configure RevenueCat with API key
        Purchases.configure({
          apiKey: "",
        });

        // Get current offerings
        const offerings = await Purchases.getOfferings();
        if (offerings.current) {
          setCurrentOffering(offerings.current);
        }

        setAllOfferings(offerings);
        const info = await Purchases.getCustomerInfo();

        if (info?.entitlements?.active["pro_features"]) {
          setIsProMember(true);
          // Update Supabase user record
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!user) {
            return;
          }

          const { data, error: dbError } = await supabase
            .from("users")
            .select("*")
            .eq("email", user.email)
            .single();

          if (dbError) throw dbError;

          if (data) {
            await supabase
              .from("users")
              .update({ has_access: true })
              .eq("id", data.id);
          }
        }
      } catch (error) {
        console.error("Error initializing RevenueCat:", error);
      }
    };

    initPurchases();
  }, []);

  const purchasePackage = async (
    packageToPurchase: any,
    userAnswers: any,
    macros: any
  ) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(
        packageToPurchase
      );
      setCustomerInfo(customerInfo);

      return customerInfo;
    } catch (error) {
      console.error("Error purchasing package:", error);
      throw error;
    }
  };

  const restorePurchases = async () => {
    try {
      const info = await Purchases.restorePurchases();
      setCustomerInfo(info);
      const hasPro = info.entitlements.active["pro_features"] !== undefined;
      setIsProMember(hasPro);

      // Update Supabase after restore
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("users")
          .update({ has_access: hasPro })
          .eq("id", user.id);
      }

      return info;
    } catch (error) {
      console.error("Error restoring purchases:", error);
      throw error;
    }
  };

  return {
    currentOffering,
    customerInfo,
    isProMember,
    purchasePackage,
    restorePurchases,
    allOfferings,
  };
};
