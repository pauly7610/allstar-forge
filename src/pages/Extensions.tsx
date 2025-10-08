import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Puzzle, 
  Download, 
  Star,
  Shield,
  Code2,
  Sparkles,
  Database,
  GitBranch,
  Activity
} from "lucide-react";

const extensions = [
  {
    id: 1,
    name: "Advanced Security Scanner",
    description: "Enhanced SAST/DAST scanning with AI-powered vulnerability detection and remediation suggestions",
    category: "Security",
    icon: Shield,
    downloads: 234,
    rating: 4.9,
    installed: true,
    developer: "Platform Team",
    version: "2.3.0"
  },
  {
    id: 2,
    name: "Custom Deployment Targets",
    description: "Deploy to specialized infrastructure including mainframe bridges and legacy systems",
    category: "Deployment",
    icon: GitBranch,
    downloads: 156,
    rating: 4.7,
    installed: false,
    developer: "Integration Team",
    version: "1.8.2"
  },
  {
    id: 3,
    name: "AI Code Assistant",
    description: "Context-aware code completion and generation with Allstate compliance checks built-in",
    category: "AI/ML",
    icon: Sparkles,
    downloads: 412,
    rating: 4.8,
    installed: true,
    developer: "AI Team",
    version: "3.1.0"
  },
  {
    id: 4,
    name: "Database Performance Analyzer",
    description: "Real-time query optimization and performance tuning recommendations for all database types",
    category: "Database",
    icon: Database,
    downloads: 189,
    rating: 4.6,
    installed: false,
    developer: "Data Engineering",
    version: "1.5.4"
  },
  {
    id: 5,
    name: "Custom Audit Logger",
    description: "Extended audit trail capabilities with custom compliance report generation",
    category: "Governance",
    icon: Activity,
    downloads: 143,
    rating: 4.5,
    installed: true,
    developer: "Compliance Team",
    version: "2.0.1"
  },
  {
    id: 6,
    name: "API Gateway Extension",
    description: "Advanced API management with custom routing, rate limiting, and analytics",
    category: "API",
    icon: Code2,
    downloads: 267,
    rating: 4.8,
    installed: false,
    developer: "Platform Team",
    version: "2.4.0"
  }
];

const categories = ["All", "Security", "Deployment", "AI/ML", "Database", "Governance", "API"];

export default function Extensions() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Extensions Marketplace</h2>
            <p className="text-muted-foreground mt-1">
              Extend platform capabilities with custom plugins and integrations
            </p>
          </div>
          <Button>
            <Puzzle className="mr-2 h-4 w-4" />
            Create Extension
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search extensions..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Extensions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {extensions.map((extension) => (
            <DashboardCard
              key={extension.id}
              title={extension.name}
              description={extension.description}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{extension.downloads}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{extension.rating}</span>
                    </div>
                    <Badge variant="outline">{extension.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {extension.installed ? "Installed" : ""}
                    </span>
                    <Switch checked={extension.installed} />
                  </div>
                </div>

                <div className="border-t pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Developer</p>
                    <p className="text-sm font-medium">{extension.developer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Version</p>
                    <p className="text-sm font-medium">{extension.version}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                    {!extension.installed && (
                      <Button size="sm">
                        Install
                      </Button>
                    )}
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
