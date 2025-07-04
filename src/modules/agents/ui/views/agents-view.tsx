"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";


export const AgentsView = () => {
    const trpc = useTRPC ();
    const { data } = useSuspenseQuery (trpc.agents.getMany.queryOptions());

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable 
                data={data}
                columns={columns}
            />
            {data.length === 0 && (
                <EmptyState 
                    title="Create your first agent."
                    description="Create your first agent to get started. Agents can help you automate tasks, answer questions, and more."
                />
            )}
        </div>
    );
};

export const AgentsViewLoading = () => {
    return (
        <LoadingState title="Loading Agents" description="Please wait while we load the agents." />
    );
};

export const AgentsViewError = () => {
    return(
        <ErrorState 
                title='Error Loading Agents'
                description='There was an error loading the agents. Please try again later or contact support if the issue persists.'
            />
    )
}
