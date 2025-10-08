import { DollarSign, TrendingDown, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface CostWidgetProps {
  current: number;
  budget: number;
  forecast: number;
  savings: number;
}

export function CostWidget({ current, budget, forecast, savings }: CostWidgetProps) {
  const utilizationPercent = (current / budget) * 100;
  const isOverBudget = forecast > budget;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Cost Management</h3>
        </div>
        {isOverBudget && (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Over Budget
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Current Spend</span>
            <span className="text-lg font-bold">${current.toLocaleString()}</span>
          </div>
          <Progress value={utilizationPercent} className="h-2" />
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">${budget.toLocaleString()} budget</span>
            <span className="text-xs text-muted-foreground">{utilizationPercent.toFixed(0)}% used</span>
          </div>
        </div>

        <div className="border-t pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Forecasted Spend</span>
            <span className="text-sm font-semibold">${forecast.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-4 w-4 text-green-600" />
              Potential Savings
            </span>
            <span className="text-sm font-semibold text-green-600">${savings.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">• 3 idle resources detected</span>
            <span className="text-primary cursor-pointer hover:underline">Cleanup</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">• 2 rightsizing opportunities</span>
            <span className="text-primary cursor-pointer hover:underline">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}
