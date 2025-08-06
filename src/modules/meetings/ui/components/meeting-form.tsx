import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MeetingGetOne } from "../../types";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CommandSelect } from "@/components/command-select";
import GeneratedAvatar from "@/components/generated-avatar";
import { meetingsInsertSchema } from "../../schemas";
import { useState } from "react";
import { NewAgentDialog } from "@/modules/agents/ui/components/agent-dialog";

interface MeetingFormProps {
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne;
};

export const MeetingForm = ({ onSuccess, onCancel, initialValues }: MeetingFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const [agentSearch, setAgentSearch] = useState("");
    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);

    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch,
        }),
    );

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );
                //TODO: Invalidate free tier usage
                onSuccess?.(data.id);
            },
            onError: (error) => {
                toast.error(error.message || "An error occurred while creating the agent.");

                //TODO: check if code is 'FORBIDDEN' and redirect to "/upgrade" page
            },
        }),
    );

    const UpdateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );

                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({
                            id: initialValues.id,
                        })
                    );
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message || "An error occurred while creating the agent.");

                //TODO: check if code is 'FORBIDDEN' and redirect to "/upgrade" page
            },
        }),
    );

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: initialValues
            ? {
                name: initialValues.name ?? "",
                agentId: initialValues.agentId ?? "",
            }
            : {
                name: "",
                agentId: "",
            },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createMeeting.isPending || UpdateMeeting.isPending;

    const onsubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            UpdateMeeting.mutate({
                ...values,
                id: initialValues.id
            });
        } else {
            createMeeting.mutate(values);
        }
    };

    return (
        <>
            <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onsubmit)}>
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Math Consultations"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="agentId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent</FormLabel>
                                <FormControl>
                                    <CommandSelect
                                        option={(agents.data?.items ?? []).map((agent) => ({
                                            id: agent.id,
                                            value: agent.id,
                                            children: (
                                                <div className="flex items-center gap-x-2">
                                                    <GeneratedAvatar
                                                        seed={agent.name}
                                                        variant="botttsNeutral"
                                                        className="border size-6"
                                                    />
                                                    <span>{agent.name}</span>
                                                </div>
                                            )
                                        }))}
                                        onSelect={field.onChange}
                                        onSearch={setAgentSearch}
                                        value={field.value}
                                        placeholder="Select an agent"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Not found what you&apos;re looking for?{""}
                                    <button type="button" onClick={() => setOpenNewAgentDialog(true)} className="text-primary hover:underline">
                                        create a new agent
                                    </button>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between gap-x-2">
                        {onCancel && (
                            <Button variant="ghost" disabled={isPending} type="button" onClick={() => onCancel()}>
                                Cancel
                            </Button>
                        )}
                        <Button disabled={isPending} type="submit">
                            {isEdit ? "Update" : "Create"}
                            {isPending && <span className="ml-2">Loading...</span>}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}