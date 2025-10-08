import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  RefreshCw, 
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  Code2,
  Shield,
  TrendingUp
} from "lucide-react";

const migrations = [
  {
    id: 1,
    name: "Claims Processing System",
    source: "Legacy Mainframe",
    target: "Modern Analytics Pipeline",
    status: "in-progress",
    progress: 65,
    startDate: "2024-01-15",
    estimatedCompletion: "2024-03-30",
    issues: 3,
    completedSteps: 13,
    totalSteps: 20
  },
  {
    id: 2,
    name: "Customer Data Warehouse",
    source: "On-Premise Oracle",
    target: "Cloud PostgreSQL",
    status: "planning",
    progress: 15,
    startDate: "2024-02-01",
    estimatedCompletion: "2024-06-15",
    issues: 0,
    completedSteps: 3,
    totalSteps: 18
  },
  {
    id: 3,
    name: "Risk Assessment API",
    source: "Monolithic Application",
    target: "Microservices Architecture",
    status: "completed",
    progress: 100,
    startDate: "2023-10-01",
    estimatedCompletion: "2024-01-10",
    issues: 0,
    completedSteps: 15,
    totalSteps: 15
  }
];

const tools = [
  {
    id: 1,
    name: "Dependency Mapper",
    description: "Automatically map and visualize service dependencies and data flows",
    icon: Database,
    category: "Analysis"
  },
  {
    id: 2,
    name: "Code Modernizer",
    description: "AI-powered code translation and modernization with compliance checks",
    icon: Code2,
    category: "Transformation"
  },
  {
    id: 3,
    name: "Security Assessment",
    description: "Automated security review and vulnerability detection for legacy systems",
    icon: Shield,
    category: "Security"
  },
  {
    id: 4,
    name: "Performance Analyzer",
    description: "Compare performance metrics between legacy and modern implementations",
    icon: TrendingUp,
    category: "Testing"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "planning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export default function Migration() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Legacy Modernization</h2>
            <p className="text-muted-foreground mt-1">
              Tools and workflows for migrating legacy applications to modern platform
            </p>
          </div>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            New Migration
          </Button>
        </div>

        {/* Active Migrations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Active Migrations</h3>
          <div className="space-y-6">
            {migrations.map((migration) => (
              <DashboardCard
                key={migration.id}
                title={migration.name}
                description=""
              >
                <div className="space-y-4">
                  {/* Source to Target */}
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{migration.source}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{migration.target}</span>
                  </div>

                  {/* Status and Dates */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <Badge className={getStatusColor(migration.status)}>
                      {migration.status}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Started {migration.startDate}
                    </div>
                    {migration.status !== "completed" && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        Est. completion: {migration.estimatedCompletion}
                      </div>
                    )}
                    {migration.issues > 0 && (
                      <div className="flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        {migration.issues} issues
                      </div>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Migration Progress</span>
                      <span className="font-medium">
                        {migration.completedSteps}/{migration.totalSteps} steps
                      </span>
                    </div>
                    <Progress value={migration.progress} />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    {migration.status === "completed" ? (
                      <Button variant="outline" size="sm">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        View Report
                      </Button>
                    ) : (
                      <>
                        <Button size="sm">View Details</Button>
                        <Button variant="outline" size="sm">
                          Run Assessment
                        </Button>
                        {migration.issues > 0 && (
                          <Button variant="outline" size="sm">
                            Resolve Issues
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>

        {/* Migration Tools */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Migration Tools</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <DashboardCard
                key={tool.id}
                title={tool.name}
                description={tool.description}
              >
                <div className="flex items-center justify-between pt-4 border-t">
                  <Badge variant="outline">{tool.category}</Badge>
                  <Button size="sm">Launch Tool</Button>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
