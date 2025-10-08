import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Package, 
  Network,
  Shield,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from "lucide-react";

const services = [
  {
    id: 1,
    name: "Claims Processing API",
    description: "Automated claims intake, validation, and routing service",
    owner: "Platform Team",
    maturity: "production",
    version: "v2.4.1",
    dependencies: 3,
    consumers: 12,
    health: "healthy",
    apiDocs: true,
    slo: 99.95
  },
  {
    id: 2,
    name: "Customer Data Service",
    description: "Centralized customer profile and history management",
    owner: "Data Team",
    maturity: "stable",
    version: "v3.1.0",
    dependencies: 5,
    consumers: 24,
    health: "healthy",
    apiDocs: true,
    slo: 99.9
  },
  {
    id: 3,
    name: "Risk Scoring Engine",
    description: "ML-based risk assessment and fraud detection",
    owner: "ML Team",
    maturity: "beta",
    version: "v1.2.0-beta",
    dependencies: 8,
    consumers: 6,
    health: "warning",
    apiDocs: true,
    slo: 99.5
  },
  {
    id: 4,
    name: "Policy Management System",
    description: "Insurance policy lifecycle and document management",
    owner: "Policy Team",
    maturity: "production",
    version: "v4.0.2",
    dependencies: 4,
    consumers: 18,
    health: "healthy",
    apiDocs: true,
    slo: 99.99
  },
  {
    id: 5,
    name: "Payment Gateway Integration",
    description: "Secure payment processing and transaction management",
    owner: "Platform Team",
    maturity: "production",
    version: "v2.8.3",
    dependencies: 2,
    consumers: 32,
    health: "healthy",
    apiDocs: true,
    slo: 99.95
  },
  {
    id: 6,
    name: "Document Analysis Service",
    description: "OCR and document classification for claims processing",
    owner: "AI Team",
    maturity: "deprecated",
    version: "v1.5.4",
    dependencies: 6,
    consumers: 4,
    health: "warning",
    apiDocs: false,
    slo: 99.0
  }
];

const maturityConfig = {
  production: { label: "Production", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  stable: { label: "Stable", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  beta: { label: "Beta", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  deprecated: { label: "Deprecated", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" }
};

export default function Catalog() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Service Catalog</h2>
            <p className="text-muted-foreground mt-1">
              Discover, manage, and monitor platform services with dependency tracking
            </p>
          </div>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            Register Service
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services by name, owner, or description..."
            className="pl-10"
          />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => {
            const maturity = maturityConfig[service.maturity as keyof typeof maturityConfig];
            
            return (
              <DashboardCard
                key={service.id}
                title={service.name}
                description={service.description}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={maturity.color}>{maturity.label}</Badge>
                    <Badge variant="outline">{service.version}</Badge>
                    {service.health === "healthy" ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Healthy
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Warning
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Owner</p>
                      <p className="font-medium">{service.owner}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">SLO Target</p>
                      <p className="font-medium">{service.slo}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Dependencies</p>
                      <p className="font-medium">{service.dependencies} services</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Consumers</p>
                      <p className="font-medium">{service.consumers} services</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Network className="h-4 w-4 mr-2" />
                      Dependencies
                    </Button>
                    {service.apiDocs ? (
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        API Docs
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1" disabled>
                        No Docs
                      </Button>
                    )}
                  </div>
                </div>
              </DashboardCard>
            );
          })}
        </div>

        {/* Dependency Visualization Section */}
        <DashboardCard 
          title="Dependency Graph" 
          description="Service dependency visualization and impact analysis"
        >
          <div className="p-8 bg-muted/30 rounded-lg border-2 border-dashed flex items-center justify-center">
            <div className="text-center">
              <Network className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium">Interactive Dependency Graph</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click on a service to view its dependencies and consumers
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Launch Graph View
              </Button>
            </div>
          </div>
        </DashboardCard>
      </div>
    </AppLayout>
  );
}
