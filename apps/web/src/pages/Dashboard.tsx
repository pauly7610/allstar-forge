import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { CreateProjectModal } from "@/components/CreateProjectModal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";
import { 
  Plus, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Shield,
  TrendingUp,
  Server,
  Users,
  FileText,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  // Example selected project id for dashboard summary
  const selectedProjectId = "p1";

  const { data: scorecard } = useQuery({
    queryKey: ["scorecard", selectedProjectId],
    queryFn: () => api.get<{ projectId: string; tier: string; metrics: { security: number; quality: number; performance: number; compliance: number } }>(endpoints.scorecards(selectedProjectId)),
  });

  const { data: costs } = useQuery({
    queryKey: ["costs", selectedProjectId],
    queryFn: () => api.get<{ projectId: string; current: number; forecast: number; savingsOpportunities: unknown[] }>(endpoints.costs(selectedProjectId)),
  });

  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold">Welcome back, Platform Team</h2>
          <p className="mt-2 text-muted-foreground">
            Monitor your analytics infrastructure and provision new environments
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Active Projects"
            value="24"
            change={12}
            changeLabel="vs last month"
            icon={<Server className="h-5 w-5" />}
          />
          <MetricCard
            label="Security Score"
            value={scorecard ? `${scorecard.metrics.security}` : "--"}
            icon={<Activity className="h-5 w-5" />}
          />
          <MetricCard
            label="Quality Score"
            value={scorecard ? `${scorecard.metrics.quality}` : "--"}
            icon={<Clock className="h-5 w-5" />}
          />
          <MetricCard
            label="Current Cost"
            value={costs ? `$${costs.current.toFixed(2)}` : "--"}
            icon={<Users className="h-5 w-5" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Environment Setup */}
          <DashboardCard
            title="Environment Setup"
            description="Quick provision a new project"
            action={
              <Button size="sm" onClick={() => setCreateModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            }
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Setup Progress</span>
                  <span className="text-muted-foreground">3 of 5 steps</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Infrastructure provisioned</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">CI/CD pipeline configured</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Monitoring enabled</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Security scanning pending</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Team onboarding scheduled</span>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Platform Health */}
          <DashboardCard
            title="Platform Health"
            description="Real-time system status"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Kubernetes Cluster</p>
                    <p className="text-sm text-muted-foreground">AKS Production</p>
                  </div>
                </div>
                <StatusBadge status="healthy" label="Healthy" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">CI/CD Pipeline</p>
                    <p className="text-sm text-muted-foreground">GitHub Actions</p>
                  </div>
                </div>
                <StatusBadge status="healthy" label="Operational" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Security Scanning</p>
                    <p className="text-sm text-muted-foreground">CodeQL + Dependabot</p>
                  </div>
                </div>
                <StatusBadge status="healthy" label="Active" />
              </div>
            </div>
          </DashboardCard>

          {/* Compliance Status */}
          <DashboardCard
            title="Compliance & Performance Scorecard"
            description={scorecard ? `Tier: ${scorecard.tier}` : "Project scorecard"}
            action={<Button variant="ghost" size="sm">View Details</Button>}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Compliance</span>
                <span className="text-sm font-bold">{scorecard ? `${scorecard.metrics.compliance}%` : "--"}</span>
              </div>
              <Progress value={100} className="h-2" />
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium">Performance</span>
                <span className="text-sm font-bold">{scorecard ? `${scorecard.metrics.performance}%` : "--"}</span>
              </div>
              <Progress value={100} className="h-2" />
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium">Security</span>
                <span className="text-sm font-bold">{scorecard ? `${scorecard.metrics.security}%` : "--"}</span>
              </div>
              <Progress value={100} className="h-2" />

              <div className="mt-4 rounded-lg bg-primary-light p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary">Scorecard Summary</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {scorecard ? `Tier ${scorecard.tier} across security, quality, performance, and compliance` : "Awaiting data"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Recent Activity */}
          <DashboardCard
            title="Cost Overview"
            description="Current and forecasted costs"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Current</p>
                  <p className="text-xl font-bold">{costs ? `$${costs.current.toFixed(2)}` : "--"}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Forecast</p>
                  <p className="text-xl font-bold">{costs ? `$${costs.forecast.toFixed(2)}` : "--"}</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Savings opportunities: {costs ? costs.savingsOpportunities.length : 0}</div>
            </div>
          </DashboardCard>

          {/* Quick Actions */}
          <DashboardCard
            title="Quick Actions"
            description="Common platform operations"
          >
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto flex-col items-start p-4" onClick={() => setCreateModalOpen(true)}>
                <Plus className="h-5 w-5 mb-2 self-start" />
                <span className="font-medium">Create Project</span>
                <span className="text-xs text-muted-foreground">Provision new environment</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-start p-4">
                <FileText className="h-5 w-5 mb-2 self-start" />
                <span className="font-medium">View Reports</span>
                <span className="text-xs text-muted-foreground">Compliance & audit logs</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-start p-4">
                <Shield className="h-5 w-5 mb-2 self-start" />
                <span className="font-medium">Security Scan</span>
                <span className="text-xs text-muted-foreground">Run vulnerability check</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-start p-4">
                <Zap className="h-5 w-5 mb-2 self-start" />
                <span className="font-medium">Cost Analysis</span>
                <span className="text-xs text-muted-foreground">Optimize spending</span>
              </Button>
            </div>
          </DashboardCard>
        </div>
      </div>

      <CreateProjectModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </AppLayout>
  );
}
