import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { VideoIcon, BanIcon } from "lucide-react"

interface Props {
    meetingId: string;
    onCancelMeeting: () => void;
    isCancelling: boolean;
}

export const UpcomingState = ({
    meetingId,
    onCancelMeeting,
    isCancelling
}: Props) => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex-col gap-y-8 items-center justify-center">
            <EmptyState
                image="/upcoming.svg"
                title="Meeting not started"
                description="Once you start a meeting, the summary will appear here."
            />
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-4 w-full py-8">
                <Button
                    variant="secondary"
                    onClick={onCancelMeeting}
                    disabled={isCancelling}
                    className="w-full lg:w-auto"
                >
                    <BanIcon />
                    Cancel Meeting
                </Button>
                <Button asChild
                    className="w-full lg:w-auto"
                    disabled={isCancelling}
                >
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Start Meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}