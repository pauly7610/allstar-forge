import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";
import {
  Search,
  Package,
  Network,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from "lucide-react";

interface Service { id: string; name: string; description?: string; owner?: string; slo?: number; health?: "healthy" | "warning" }

export default function Catalog() {
  const { data } = useQuery({
    queryKey: ["catalog"],
    queryFn: () => api.get<{ services: Service[] }>(endpoints.catalog()),
  });

  const services = data?.services ?? [];

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
            const healthy = service.health !== "warning";
            return (
              <DashboardCard
                key={service.id}
                title={service.name}
                description={service.description ?? ""}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">v1</Badge>
                    {healthy ? (
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
                      <p className="font-medium">{service.owner ?? "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">SLO Target</p>
                      <p className="font-medium">{service.slo ?? 99.9}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Dependencies</p>
                      <p className="font-medium">—</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Consumers</p>
                      <p className="font-medium">—</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Network className="h-4 w-4 mr-2" />
                      Dependencies
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      API Docs
                    </Button>
                  </div>
                </div>
              </DashboardCard>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
