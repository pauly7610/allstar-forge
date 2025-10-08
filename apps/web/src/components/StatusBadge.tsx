import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "healthy" | "warning" | "error" | "pending";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
}

const statusConfig = {
  healthy: {
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    label: "Healthy"
  },
  warning: {
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    label: "Warning"
  },
  error: {
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    label: "Error"
  },
  pending: {
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    label: "Pending"
  }
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={cn("font-medium", config.className)}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {label || config.label}
    </Badge>
  );
}
