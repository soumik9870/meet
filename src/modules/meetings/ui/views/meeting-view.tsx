"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    
    return (
        <div>
            {/* {JSON.stringify(data)} */} TODO: Render Meetings List
        </div>
    );
};

export const MeetingsViewLoading = () => {
    return (
        <LoadingState title="Loading Meetings" description="Please wait while we load the meetings." />
    );
};

export const MeetingsViewError = () => {
    return(
        <ErrorState
                title='Error Loading Meetings'
                description='There was an error loading the meetings. Please try again later or contact support if the issue persists.'
            />
    )
}