import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type GrantType = Database["public"]["Enums"]["grant_type"];

export interface GrantApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssnLastFour?: string;
  annualIncome?: string;
  grantAmount?: number;
  grantType?: GrantType;
}

export const useGrantApplications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitApplication = async (data: GrantApplicationData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a grant application.",
        variant: "destructive",
      });
      return { success: false, requiresAuth: true };
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("grant_applications").insert({
        user_id: user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        ssn_last_four: data.ssnLastFour,
        annual_income: data.annualIncome,
        grant_amount: data.grantAmount || 4500,
        grant_type: data.grantType || "chips_workforce",
        status: "submitted",
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "You'll receive a confirmation email within 24 hours.",
      });

      return { success: true, requiresAuth: false };
    } catch (error) {
      console.error("Error submitting grant application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
      return { success: false, requiresAuth: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMyApplications = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from("grant_applications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching applications:", error);
      return [];
    }
  };

  return {
    submitApplication,
    getMyApplications,
    isSubmitting,
  };
};
