import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface JobApplicationData {
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salaryRange?: string;
  certificationRequired?: string;
}

export const useJobApplications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveOpportunity = async (data: JobApplicationData) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save opportunities.",
      });
      return { success: false, requiresAuth: true };
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("saved_opportunities").insert({
        user_id: user.id,
        job_id: data.jobId,
        job_title: data.jobTitle,
        company: data.company,
        location: data.location,
        salary_range: data.salaryRange,
      });

      if (error) {
        // Handle unique constraint error (already saved)
        if (error.code === "23505") {
          toast({
            title: "Already Saved",
            description: "This opportunity is already in your saved list.",
          });
          return { success: true, requiresAuth: false };
        }
        throw error;
      }

      toast({
        title: "Opportunity Saved!",
        description: "You can find it in your dashboard.",
      });

      return { success: true, requiresAuth: false };
    } catch (error) {
      console.error("Error saving opportunity:", error);
      toast({
        title: "Error",
        description: "Failed to save opportunity. Please try again.",
        variant: "destructive",
      });
      return { success: false, requiresAuth: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyToJob = async (data: JobApplicationData) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to apply for jobs.",
      });
      return { success: false, requiresAuth: true };
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("job_applications").insert({
        user_id: user.id,
        job_title: data.jobTitle,
        company: data.company,
        location: data.location,
        salary_range: data.salaryRange,
        certification_required: data.certificationRequired,
        status: "submitted",
        applied_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Application Started!",
        description: "We've saved your interest in this role.",
      });

      return { success: true, requiresAuth: false };
    } catch (error) {
      console.error("Error applying to job:", error);
      toast({
        title: "Error",
        description: "Failed to apply. Please try again.",
        variant: "destructive",
      });
      return { success: false, requiresAuth: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSavedOpportunities = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from("saved_opportunities")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching saved opportunities:", error);
      return [];
    }
  };

  const getMyApplications = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from("job_applications")
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
    saveOpportunity,
    applyToJob,
    getSavedOpportunities,
    getMyApplications,
    isSubmitting,
  };
};
