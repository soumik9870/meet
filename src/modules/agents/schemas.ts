import { z } from 'zod';

export const agentsInsertSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    instructions: z.string().min(1, 'instructions are required'),
})

export const agentUpdateSchema = agentsInsertSchema.extend({
    id: z.string().min(1, {message: 'ID is required'}),
})