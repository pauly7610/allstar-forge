import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Filter {
  id: string;
  label: string;
  count?: number;
}

interface FilterableTabsProps {
  filters: Filter[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export function FilterableTabs({ filters, activeFilter, onFilterChange }: FilterableTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "transition-all",
            activeFilter === filter.id && "shadow-sm"
          )}
        >
          {filter.label}
          {filter.count !== undefined && (
            <span className="ml-2 text-xs opacity-70">
              ({filter.count})
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
