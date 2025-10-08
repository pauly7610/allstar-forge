import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Shield,
  TrendingUp,
  Server,
  Users
} from "lucide-react";

export default function Dashboard() {
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
            label="Platform Uptime"
            value="99.9%"
            icon={<Activity className="h-5 w-5" />}
          />
          <MetricCard
            label="Avg Onboarding Time"
            value="18m"
            change={-67}
            changeLabel="vs baseline"
            icon={<Clock className="h-5 w-5" />}
          />
          <MetricCard
            label="Active Users"
            value="142"
            change={8}
            changeLabel="this week"
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
              <Button size="sm">
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
            title="Compliance Status"
            description="SOC 2 & NIST alignment"
            action={
              <Button variant="ghost" size="sm">View Details</Button>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Repository Coverage</span>
                <span className="text-sm font-bold">100%</span>
              </div>
              <Progress value={100} className="h-2" />
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium">Security Policies</span>
                <span className="text-sm font-bold">24/24</span>
              </div>
              <Progress value={100} className="h-2" />
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium">Audit Logs</span>
                <span className="text-sm font-bold">Active</span>
              </div>
              <Progress value={100} className="h-2" />

              <div className="mt-4 rounded-lg bg-primary-light p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary">Fully Compliant</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      All security controls automated and enforced
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Recent Activity */}
          <DashboardCard
            title="Recent Activity"
            description="Latest platform events"
          >
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Project "analytics-ml-prod" deployed</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Security scan completed</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">3 new users onboarded</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                  <Shield className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Compliance report generated</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </AppLayout>
  );
}
