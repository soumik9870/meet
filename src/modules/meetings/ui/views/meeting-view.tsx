"use client"

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meeting-filters";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const [filters, setFilters] = useMeetingsFilters();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters,
    }));

    return (
        <div className="flex-1 pb-4 px-2 md:px-9 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns} onRowClick={(row) => router.push(`/meetings/${row.id}`)} />
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
            {data.items.length === 0 && (
                <EmptyState
                    title="Create your first meeting."
                    description="Schedule a meeting to connect with others. Each meeting can help you collaborate, discuss, and make decisions."
                />
            )}
        </div>
    );
};

export const MeetingsViewLoading = () => {
    return (
        <LoadingState title="Loading Meetings" description="Please wait while we load the meetings." />
    );
};

export const MeetingsViewError = () => {
    return (
        <ErrorState
            title='Error Loading Meetings'
            description='There was an error loading the meetings. Please try again later or contact support if the issue persists.'
        />
    )
}