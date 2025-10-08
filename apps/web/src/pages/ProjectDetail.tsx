import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { MetricCard } from "@/components/MetricCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";

export default function ProjectDetail() {
  const { id = "p1" } = useParams();

  const { data: scorecard } = useQuery({
    queryKey: ["scorecard", id],
    queryFn: () => api.get<{ projectId: string; tier: string; metrics: { security: number; quality: number; performance: number; compliance: number } }>(endpoints.scorecards(id)),
  });

  const { data: costs } = useQuery({
    queryKey: ["costs", id],
    queryFn: () => api.get<{ projectId: string; current: number; forecast: number; savingsOpportunities: unknown[] }>(endpoints.costs(id)),
  });

  const { data: audits } = useQuery({
    queryKey: ["audits"],
    queryFn: () => api.get<{ events: { action: string; actor: string; ts?: string; resource?: string }[] }>(endpoints.auditEvents(25)),
  });

  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Project: {id}</h2>
          <p className="text-muted-foreground mt-1">Scorecards, costs, and audit activity</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Security" value={scorecard ? `${scorecard.metrics.security}` : "--"} />
          <MetricCard label="Quality" value={scorecard ? `${scorecard.metrics.quality}` : "--"} />
          <MetricCard label="Performance" value={scorecard ? `${scorecard.metrics.performance}` : "--"} />
          <MetricCard label="Compliance" value={scorecard ? `${scorecard.metrics.compliance}` : "--"} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DashboardCard title="Cost Overview" description="Current and forecasted costs">
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
          </DashboardCard>

          <DashboardCard title="Recent Audit Events" description="Last 25 events">
            <div className="space-y-3">
              {audits?.events?.length ? (
                audits.events.map((e, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded border p-3 text-sm">
                    <div>
                      <div className="font-medium">{e.action}</div>
                      <div className="text-xs text-muted-foreground">{e.resource ?? "resource"}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{e.actor}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">No audit events yet</div>
              )}
            </div>
          </DashboardCard>
        </div>
      </div>
    </AppLayout>
  );
}


