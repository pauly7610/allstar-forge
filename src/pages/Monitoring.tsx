import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  AlertTriangle, 
  Clock, 
  Zap,
  TrendingUp,
  Server,
  Eye,
  Network
} from "lucide-react";

export default function Monitoring() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Monitoring & Observability</h2>
            <p className="text-muted-foreground mt-1">
              Real-time platform health with SLO tracking and predictive alerts
            </p>
          </div>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Create Alert
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Service Uptime"
            value="99.97%"
            icon={<Activity className="h-5 w-5" />}
          />
          <MetricCard
            label="Avg Response Time"
            value="124ms"
            change={-12}
            changeLabel="vs last hour"
            icon={<Zap className="h-5 w-5" />}
          />
          <MetricCard
            label="Active Incidents"
            value="2"
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <MetricCard
            label="SLO Compliance"
            value="98.4%"
            change={2}
            changeLabel="this week"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        {/* Tabs for different monitoring views */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="slo">SLO/SLI</TabsTrigger>
            <TabsTrigger value="traces">Distributed Tracing</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Incidents</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <DashboardCard title="Service Health" description="Real-time status monitoring">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Analytics API</p>
                        <p className="text-xs text-muted-foreground">Availability: 99.98%</p>
                      </div>
                    </div>
                    <StatusBadge status="healthy" label="Operational" />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">ML Inference Service</p>
                        <p className="text-xs text-muted-foreground">Availability: 99.95%</p>
                      </div>
                    </div>
                    <StatusBadge status="warning" label="Degraded" />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Data Pipeline</p>
                        <p className="text-xs text-muted-foreground">Availability: 99.99%</p>
                      </div>
                    </div>
                    <StatusBadge status="healthy" label="Healthy" />
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Performance Metrics" description="Latency and throughput">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">P50 Latency</span>
                      <span className="text-sm font-semibold">87ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">P95 Latency</span>
                      <span className="text-sm font-semibold">234ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">P99 Latency</span>
                      <span className="text-sm font-semibold">412ms</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Request Rate</span>
                      <span className="text-sm font-semibold">1,247 req/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Error Rate</span>
                      <span className="text-sm font-semibold text-green-600">0.12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Throughput</span>
                      <span className="text-sm font-semibold">4.3 GB/s</span>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </TabsContent>

          <TabsContent value="slo" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <DashboardCard title="Service Level Objectives" description="SLO tracking and error budgets">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">API Availability</p>
                        <p className="text-xs text-muted-foreground">Target: 99.9%</p>
                      </div>
                      <span className="text-sm font-semibold text-green-600">99.97%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "99.97%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Error Budget: 78% remaining</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-xs text-muted-foreground">Target: &lt;200ms (P95)</p>
                      </div>
                      <span className="text-sm font-semibold text-yellow-600">234ms</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: "85%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Error Budget: 15% remaining</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Freshness</p>
                        <p className="text-xs text-muted-foreground">Target: &lt;5min</p>
                      </div>
                      <span className="text-sm font-semibold text-green-600">2.8min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "95%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Error Budget: 95% remaining</p>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Predictive Alerts" description="ML-powered anomaly detection">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Predicted Latency Spike</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ML model predicts 30% latency increase in next 2 hours based on traffic patterns
                      </p>
                      <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                        View Details →
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Capacity Planning Alert</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Current growth rate will exceed capacity in 14 days
                      </p>
                      <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                        Scale Resources →
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Performance Optimization</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Database query optimization could reduce latency by 40%
                      </p>
                      <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                        Apply Suggestion →
                      </Button>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </TabsContent>

          <TabsContent value="traces" className="space-y-6">
            <DashboardCard 
              title="Distributed Tracing" 
              description="Cross-service request tracking and dependency analysis"
            >
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Network className="h-5 w-5 text-primary" />
                      <span className="font-medium">Request Trace: req_8x9k2m</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Total: 187ms</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-xs text-muted-foreground">API Gateway</div>
                      <div className="flex-1 bg-primary-light h-6 rounded flex items-center px-2 text-xs font-medium">
                        12ms
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="w-28 text-xs text-muted-foreground">Auth Service</div>
                      <div className="flex-1 bg-accent h-6 rounded flex items-center px-2 text-xs font-medium">
                        34ms
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="w-28 text-xs text-muted-foreground">Analytics API</div>
                      <div className="flex-1 bg-accent h-6 rounded flex items-center px-2 text-xs font-medium">
                        89ms
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-8">
                      <div className="w-24 text-xs text-muted-foreground">Database</div>
                      <div className="flex-1 bg-muted h-6 rounded flex items-center px-2 text-xs font-medium">
                        52ms
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 border rounded-lg">
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-xs text-muted-foreground">Services Involved</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Total Spans</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-xs text-muted-foreground">Errors</p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <DashboardCard 
              title="Active Incidents" 
              description="Real-time incident tracking and resolution"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">ML Inference Latency Degradation</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          P95 latency exceeds 500ms threshold • Started 12 minutes ago
                        </p>
                      </div>
                      <StatusBadge status="warning" label="Investigating" />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">View Runbook</Button>
                      <Button size="sm">Update Status</Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Database Connection Pool Exhaustion</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Connection timeouts detected • Started 2 minutes ago
                        </p>
                      </div>
                      <StatusBadge status="error" label="Critical" />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">Auto-Remediate</Button>
                      <Button size="sm">Escalate</Button>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
