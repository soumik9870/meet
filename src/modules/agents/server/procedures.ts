import { z } from "zod";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema, agentUpdateSchema } from "../schemas";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";
// import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
    update: protectedProcedure
        .input(agentUpdateSchema)
        .mutation(async ({ ctx, input }) => {
            const [updatedAgent] = await db
                .update(agents)
                .set(input)
                .where(and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)))
                .returning();

            if (!updatedAgent) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Agent not found or you do not have permission to update this agent."
                });
            }

            return updatedAgent;
        }),

    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [removeAgent] = await db
                .delete(agents)
                .where(and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)))
                .returning();

            if (!removeAgent) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Agent not found or you do not have permission to delete this agent."
                })
            }

            // Optionally return the removed agent
            return removeAgent;
        }),

    getMany: protectedProcedure
        .input(z.object({
            page: z.number().default(DEFAULT_PAGE),
            pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
            search: z.string().nullish()
        }))
        .query(async ({ ctx, input }) => {
            const { search, page, pageSize } = input;
            const data = await db.select({ ...getTableColumns(agents), meetingCount: sql<number>`5`, }).from(agents).where(and(
                eq(agents.userId, ctx.auth.user.id),
                search ? ilike(agents.name, `%${search}%`) : undefined,
            ))
                .orderBy(desc(agents.createdAt), desc(agents.id))
                .limit(pageSize)
                .offset((page - 1) * pageSize)

            const [total] = await db
                .select({ count: count() })
                .from(agents)
                .where(
                    and(
                        eq(agents.userId, ctx.auth.user.id),
                        search ? ilike(agents.name, `%${search}%`) : undefined,
                    )
                )

            const totalPages = Math.ceil(total.count / pageSize);
            return {
                items: data,
                total: total.count,
                totalPages,
            }

            // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay
            // throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "An error occurred while fetching agents." });
        }),
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        const [existingAgents] = await db.select({ ...getTableColumns(agents), meetingCount: sql<number>`5`, }).from(agents).where(and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id),));
        
        if(!existingAgents) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Agent Not found."});
        }
        //TODO: Change to actual count.

        // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay
        // throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "An error occurred while fetching agents." });

        return existingAgents;
    }),
    create: protectedProcedure.input(agentsInsertSchema).mutation(async ({ input, ctx }) => {
        const [createdAgent] = await db
            .insert(agents)
            .values({
                ...input,
                userId: ctx.auth.user.id, // Assuming ctx.auth.user.id is the user ID
            })
            .returning();

        return createdAgent;
    }),
});