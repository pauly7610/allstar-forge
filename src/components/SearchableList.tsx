import { useState, useMemo, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchableListProps<T> {
  items: T[];
  searchKeys: (keyof T)[];
  renderItem: (item: T) => ReactNode;
  placeholder?: string;
  emptyMessage?: string;
}

export function SearchableList<T extends Record<string, any>>({
  items,
  searchKeys,
  renderItem,
  placeholder = "Search...",
  emptyMessage = "No results found"
}: SearchableListProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter(item =>
      searchKeys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        }
        if (typeof value === 'number') {
          return value.toString().includes(query);
        }
        return false;
      })
    );
  }, [items, searchQuery, searchKeys]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map(renderItem)}
        </div>
      )}
    </div>
  );
}
