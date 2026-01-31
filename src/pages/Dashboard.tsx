import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useJobApplications } from "@/hooks/useJobApplications";
import { useGrantApplications } from "@/hooks/useGrantApplications";
import { useToast } from "@/hooks/use-toast";
import { 
  Bookmark, 
  FileText, 
  Wallet, 
  MapPin, 
  Building2, 
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2
} from "lucide-react";
import AuthModal from "@/components/AuthModal";

interface SavedOpportunity {
  id: string;
  job_id: string;
  job_title: string;
  company: string;
  location: string;
  salary_range: string | null;
  created_at: string;
}

interface JobApplication {
  id: string;
  job_title: string;
  company: string;
  location: string;
  salary_range: string | null;
  status: string;
  applied_at: string | null;
  created_at: string;
}

interface GrantApplication {
  id: string;
  grant_type: string;
  grant_amount: number | null;
  status: string;
  created_at: string;
  first_name: string;
  last_name: string;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
  draft: { label: "Draft", variant: "secondary", icon: <Clock className="w-3 h-3" /> },
  submitted: { label: "Submitted", variant: "default", icon: <FileText className="w-3 h-3" /> },
  under_review: { label: "Under Review", variant: "outline", icon: <Loader2 className="w-3 h-3 animate-spin" /> },
  approved: { label: "Approved", variant: "default", icon: <CheckCircle2 className="w-3 h-3" /> },
  rejected: { label: "Rejected", variant: "destructive", icon: <AlertCircle className="w-3 h-3" /> },
};

const grantTypeLabels: Record<string, string> = {
  chips_workforce: "CHIPS Act Workforce",
  wioa: "WIOA Training",
  state_fund: "State Fund",
  other: "Other",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const { getSavedOpportunities, getMyApplications: getJobApplications, deleteSavedOpportunity } = useJobApplications();
  const { getMyApplications: getGrantApplications } = useGrantApplications();

  const [savedOpportunities, setSavedOpportunities] = useState<SavedOpportunity[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [grantApplications, setGrantApplications] = useState<GrantApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      setAuthModalOpen(true);
    }
  }, [user, authLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const [saved, jobs, grants] = await Promise.all([
          getSavedOpportunities(),
          getJobApplications(),
          getGrantApplications(),
        ]);
        setSavedOpportunities(saved as SavedOpportunity[]);
        setJobApplications(jobs as JobApplication[]);
        setGrantApplications(grants as GrantApplication[]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load your dashboard data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleNavigate = (section: string) => {
    navigate("/");
  };

  const handleSignIn = () => {
    setAuthModalOpen(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSignIn={handleSignIn}
        onGetStarted={() => navigate("/")}
        onNavigate={handleNavigate}
      />

      <main className="container pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Your <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Track your saved opportunities, applications, and grant status.
            </p>
          </div>

          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Saved</span>
                {savedOpportunities.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {savedOpportunities.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Jobs</span>
                {jobApplications.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {jobApplications.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="grants" className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Grants</span>
                {grantApplications.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {grantApplications.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Saved Opportunities Tab */}
            <TabsContent value="saved">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="card-industrial">
                      <CardHeader>
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))
                ) : savedOpportunities.length === 0 ? (
                  <Card className="card-industrial col-span-full">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Bookmark className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No saved opportunities</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Browse opportunities and save the ones you're interested in.
                      </p>
                      <Button onClick={() => navigate("/")}>
                        Explore Opportunities
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  savedOpportunities.map((opportunity) => (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="card-industrial h-full hover:border-primary/50 transition-colors">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg truncate">{opportunity.job_title}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Building2 className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{opportunity.company}</span>
                              </CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                              onClick={async () => {
                                const result = await deleteSavedOpportunity(opportunity.id);
                                if (result.success) {
                                  setSavedOpportunities(prev => prev.filter(o => o.id !== opportunity.id));
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {opportunity.location}
                          </div>
                          {opportunity.salary_range && (
                            <div className="flex items-center gap-2 text-sm text-primary">
                              <DollarSign className="w-4 h-4" />
                              {opportunity.salary_range}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            Saved {formatDate(opportunity.created_at)}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Job Applications Tab */}
            <TabsContent value="applications">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="card-industrial">
                      <CardHeader>
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))
                ) : jobApplications.length === 0 ? (
                  <Card className="card-industrial col-span-full">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No job applications</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Start applying to jobs to track your progress here.
                      </p>
                      <Button onClick={() => navigate("/")}>
                        Find Opportunities
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  jobApplications.map((application) => {
                    const status = statusConfig[application.status] || statusConfig.draft;
                    return (
                      <motion.div
                        key={application.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="card-industrial h-full hover:border-primary/50 transition-colors">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg">{application.job_title}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  {application.company}
                                </CardDescription>
                              </div>
                              <Badge variant={status.variant} className="flex items-center gap-1">
                                {status.icon}
                                {status.label}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              {application.location}
                            </div>
                            {application.salary_range && (
                              <div className="flex items-center gap-2 text-sm text-primary">
                                <DollarSign className="w-4 h-4" />
                                {application.salary_range}
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              Applied {formatDate(application.applied_at || application.created_at)}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </TabsContent>

            {/* Grant Applications Tab */}
            <TabsContent value="grants">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                  Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="card-industrial">
                      <CardHeader>
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))
                ) : grantApplications.length === 0 ? (
                  <Card className="card-industrial col-span-full">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Wallet className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No grant applications</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Apply for training grants to fund your career transition.
                      </p>
                      <Button onClick={() => navigate("/")}>
                        Explore Grants
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  grantApplications.map((grant) => {
                    const status = statusConfig[grant.status] || statusConfig.draft;
                    return (
                      <motion.div
                        key={grant.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="card-industrial h-full hover:border-accent/50 transition-colors">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg">
                                  {grantTypeLabels[grant.grant_type] || grant.grant_type}
                                </CardTitle>
                                <CardDescription>
                                  {grant.first_name} {grant.last_name}
                                </CardDescription>
                              </div>
                              <Badge variant={status.variant} className="flex items-center gap-1">
                                {status.icon}
                                {status.label}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-lg font-semibold text-accent">
                              <DollarSign className="w-5 h-5" />
                              ${grant.grant_amount?.toLocaleString() || "4,500"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              Applied {formatDate(grant.created_at)}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer onNavigate={handleNavigate} />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          if (!user) navigate("/");
        }}
        initialMode="signin"
      />
    </div>
  );
};

export default Dashboard;
