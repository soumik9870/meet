"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";


interface Props {
    meetingId: string;
};

export const MeetingIdView = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );

    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you Sure?",
        "The following action will remove this meeting"
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                //TODO: Invalidate free tier usage
                router.push("/meetings");
            },
        })
    );

    const handleRemove = async () => {
        const ok = await confirmRemove();

        if (!ok) return;

        await removeMeeting.mutateAsync({ id: meetingId });
    }

    const isActive = data.status === "active";
    const isUpcoming = data.status === "upcoming";
    const isCompleted = data.status === "completed";
    const isCancelled = data.status === "cancelled";
    const isProcessing = data.status === "processing";


    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 flex px-4 py-4 md:px-8 flex-col gap-y-4">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                    onRemove={handleRemove}
                />
                {isCancelled && <CancelledState />}
                {isProcessing && <ProcessingState />}
                {isCompleted && <div>Completed</div>}
                {isUpcoming && <UpcomingState 
                    meetingId={meetingId}
                    onCancelMeeting={() => {}}
                    isCancelling={false}
                />}
                {isActive && <ActiveState meetingId={meetingId} />}
            </div>
        </>
    );
};

export const MeetingIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meeting"
            description="Please wait while we fetch the meeting details."
        />
    );
};

export const MeetingIdViewError = () => {
    return (
        <ErrorState
            title="Error Loading Meeting"
            description="There was an error loading the meeting details. Please try again later."
        />
    );
};
