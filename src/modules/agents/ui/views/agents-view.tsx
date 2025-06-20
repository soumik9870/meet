"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";

import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
    const trpc = useTRPC ();
    const { data } = useSuspenseQuery (trpc.agents.getMany.queryOptions());

    return (
        <div>
            {JSON.stringify (data, null, 2)}
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
