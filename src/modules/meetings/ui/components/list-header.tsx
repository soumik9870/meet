"use client";

import { PlusIcon, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewMeetingDialog } from "./meeting-dialog";
import { useState } from "react";
import { MeetingSearchFilter } from "./meeting-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meeting-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";

export const MeetingsListHeader = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isAnyFilterModified = !!filters.search || !!filters.status || !!filters.agentId;

    const onClearFilters = () => {
        setFilters({
            status: null,
            agentId: null,
            search: "",
            page: DEFAULT_PAGE, // Reset to the first page when clearing filters
        });
    };

    return (
        <>
            <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Meetings</h5>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusIcon />
                        New Meeting
                    </Button>
                </div>
                <ScrollArea>
                    <div className="flex items-center gap-x-2 p-1">
                        <MeetingSearchFilter />
                        <StatusFilter />
                        <AgentIdFilter />
                        {isAnyFilterModified && (
                            <Button variant="outline" onClick={onClearFilters}>
                                <XCircleIcon className="size-4" />
                                Clear Filters
                            </Button>
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" className="mt-2" />
                </ScrollArea>
            </div>
        </>
    );
};