import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

interface QualityScorecardProps {
  tier: "bronze" | "silver" | "gold";
  scores: {
    security: number;
    quality: number;
    performance: number;
    compliance: number;
  };
  dora: {
    deploymentFrequency: string;
    leadTime: string;
    mttr: string;
    changeFailureRate: string;
  };
}

const tierConfig = {
  bronze: {
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: Shield,
    label: "Bronze"
  },
  silver: {
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    icon: Shield,
    label: "Silver"
  },
  gold: {
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    icon: Shield,
    label: "Gold"
  }
};

export function QualityScorecard({ tier, scores, dora }: QualityScorecardProps) {
  const config = tierConfig[tier];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <config.icon className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold">Production Readiness</h3>
            <Badge className={config.color}>{config.label} Tier</Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{Math.round((scores.security + scores.quality + scores.performance + scores.compliance) / 4)}%</p>
          <p className="text-xs text-muted-foreground">Overall Score</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Security</span>
            <span className="text-sm text-muted-foreground">{scores.security}%</span>
          </div>
          <Progress value={scores.security} className="h-2" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Code Quality</span>
            <span className="text-sm text-muted-foreground">{scores.quality}%</span>
          </div>
          <Progress value={scores.quality} className="h-2" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Performance</span>
            <span className="text-sm text-muted-foreground">{scores.performance}%</span>
          </div>
          <Progress value={scores.performance} className="h-2" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Compliance</span>
            <span className="text-sm text-muted-foreground">{scores.compliance}%</span>
          </div>
          <Progress value={scores.compliance} className="h-2" />
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          DORA Metrics
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Deploy Frequency</p>
            <p className="text-sm font-semibold">{dora.deploymentFrequency}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Lead Time</p>
            <p className="text-sm font-semibold">{dora.leadTime}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">MTTR</p>
            <p className="text-sm font-semibold">{dora.mttr}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Change Failure Rate</p>
            <p className="text-sm font-semibold">{dora.changeFailureRate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
