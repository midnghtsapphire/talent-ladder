import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface AssessmentData {
  zipCode: string;
  currentOccupation: string;
  interestedSectors?: string[];
  skillLevel?: string;
  educationLevel?: string;
  yearsExperience?: number;
  willingToRelocate?: boolean;
}

export const useAssessments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAssessment = async (data: AssessmentData) => {
    if (!user) {
      // Store in localStorage for non-authenticated users
      localStorage.setItem("pendingAssessment", JSON.stringify(data));
      return { success: true, requiresAuth: true };
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("user_assessments").insert({
        user_id: user.id,
        zip_code: data.zipCode,
        current_occupation: data.currentOccupation,
        interested_sectors: data.interestedSectors || [],
        skill_level: data.skillLevel,
        education_level: data.educationLevel,
        years_experience: data.yearsExperience,
        willing_to_relocate: data.willingToRelocate,
      });

      if (error) throw error;

      // Also update profile with the info
      await supabase.from("profiles").update({
        zip_code: data.zipCode,
        current_job: data.currentOccupation,
      }).eq("user_id", user.id);

      return { success: true, requiresAuth: false };
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast({
        title: "Error",
        description: "Failed to save your assessment. Please try again.",
        variant: "destructive",
      });
      return { success: false, requiresAuth: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLatestAssessment = async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("user_assessments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching assessment:", error);
      return null;
    }
  };

  // Submit any pending assessment after login
  const submitPendingAssessment = async () => {
    const pending = localStorage.getItem("pendingAssessment");
    if (pending && user) {
      const data = JSON.parse(pending) as AssessmentData;
      const result = await submitAssessment(data);
      if (result.success) {
        localStorage.removeItem("pendingAssessment");
      }
      return result;
    }
    return null;
  };

  return {
    submitAssessment,
    getLatestAssessment,
    submitPendingAssessment,
    isSubmitting,
  };
};
