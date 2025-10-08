import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { QualityScorecard } from "@/components/QualityScorecard";
import { CostWidget } from "@/components/CostWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  GitBranch, 
  Clock, 
  Users,
  Copy,
  MoreVertical
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "analytics-ml-prod",
    description: "Production ML pipeline for claims processing",
    status: "active",
    tier: "gold" as const,
    team: "Data Science",
    lastDeploy: "2 hours ago",
    cost: 12450,
    budget: 15000,
    forecast: 13200,
    savings: 1800,
    scores: { security: 95, quality: 92, performance: 88, compliance: 96 },
    dora: {
      deploymentFrequency: "12/day",
      leadTime: "45m",
      mttr: "1.2h",
      changeFailureRate: "2.1%"
    }
  },
  {
    id: 2,
    name: "customer-insights-dev",
    description: "Customer analytics and segmentation platform",
    status: "active",
    tier: "silver" as const,
    team: "Analytics",
    lastDeploy: "1 day ago",
    cost: 8200,
    budget: 10000,
    forecast: 8900,
    savings: 1100,
    scores: { security: 88, quality: 85, performance: 90, compliance: 87 },
    dora: {
      deploymentFrequency: "8/day",
      leadTime: "1.2h",
      mttr: "2.5h",
      changeFailureRate: "4.3%"
    }
  },
  {
    id: 3,
    name: "risk-assessment-staging",
    description: "Risk modeling and assessment tools",
    status: "pending",
    tier: "bronze" as const,
    team: "Risk Engineering",
    lastDeploy: "3 days ago",
    cost: 5600,
    budget: 8000,
    forecast: 6100,
    savings: 900,
    scores: { security: 78, quality: 75, performance: 82, compliance: 80 },
    dora: {
      deploymentFrequency: "4/day",
      leadTime: "2.8h",
      mttr: "4.1h",
      changeFailureRate: "7.2%"
    }
  }
];

export default function Projects() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Projects</h2>
            <p className="text-muted-foreground mt-1">
              Manage analytics environments with quality scorecards and cost tracking
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by name, team, or description..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project) => (
            <DashboardCard
              key={project.id}
              title={project.name}
              description={project.description}
              action={
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Clone
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              }
            >
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Column: Quality & DORA */}
                <div>
                  <QualityScorecard
                    tier={project.tier}
                    scores={project.scores}
                    dora={project.dora}
                  />
                </div>

                {/* Right Column: Cost & Metadata */}
                <div className="space-y-6">
                  <CostWidget
                    current={project.cost}
                    budget={project.budget}
                    forecast={project.forecast}
                    savings={project.savings}
                  />

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Project Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Team
                        </span>
                        <span className="text-sm font-medium">{project.team}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Last Deploy
                        </span>
                        <span className="text-sm font-medium">{project.lastDeploy}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <GitBranch className="h-4 w-4" />
                          Status
                        </span>
                        <Badge className={
                          project.status === "active" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }>
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button variant="outline" className="w-full" size="sm">
                        <GitBranch className="h-4 w-4 mr-2" />
                        View in GitHub
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        Configure Environment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
