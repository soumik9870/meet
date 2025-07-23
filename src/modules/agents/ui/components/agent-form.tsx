import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AgentGetOne } from "../../types";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GeneratedAvatar from "@/components/generated-avatar";
import { toast } from "sonner";

import { agentsInsertSchema } from "../../schemas";

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
};

export const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                );

                if (initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({
                            id: initialValues.id,
                        })
                    );
                }
                onSuccess?.();
            },
            onError: ( error ) => {
                toast.error(error.message || "An error occurred while creating the agent.");

                //TODO: check if code is 'FORBIDDEN' and redirect to "/upgrade" page
            },
        }),
    );

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: initialValues
            ? {
                name: initialValues.name ?? "",
                instructions: initialValues.instructions ?? "",
            }
            : {
                name: "",
                instructions: "",
            },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onsubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            console.log("Editing agent is not implemented yet");
        }else {
            createAgent.mutate(values);
        }
    };

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onsubmit)}>
                <GeneratedAvatar
                    seed={form.watch("name") || "New Agent"}
                    variant= "botttsNeutral"
                    className="border size-16"
                />
                <FormField 
                    name="name"
                    control={form.control}
                    render={({ field }) =>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Agent Name"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    name="instructions"
                    control={form.control}
                    render={({ field }) =>(
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Provide instructions for the agent."
                                    {...field}
                                />
                                </FormControl>
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
                        {isEdit ? "Update Agent" : "Create Agent"}
                        {isPending && <span className="ml-2">Loading...</span>}
                    </Button>
                </div>
            </form>
        </Form>
    )
}