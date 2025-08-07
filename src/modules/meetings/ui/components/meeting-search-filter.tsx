import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useMeetingsFilters } from "../../hooks/use-meeting-filters"

export const MeetingSearchFilter = () => {
    const [ filters, setFilters ] = useMeetingsFilters();

    return (
        <div className="relative">
            <Input
                placeholder="filter by name..."
                className="bg-white h-9 w-[240px] pl-7"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
            />
            <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
    );
};