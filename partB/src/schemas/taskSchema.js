const { z } = require('zod');

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().max(2000).optional(),
  priority: z.number().int().min(0).max(3).optional().default(0),
  dueDate: z.string().datetime().optional(),
  completed: z.boolean().optional().default(false),
});

const taskUpdateSchema = taskSchema.partial();

const labelSchema = z.object({
  name: z.string().min(1, 'Label name is required').max(100),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').optional(),
});

const taskFilterSchema = z.object({
  completed: z.string().optional().transform((v) => {
    if (!v) return undefined;
    return v === 'true' || v === '1';
  }),
  priority: z.string().optional().transform((v) => {
    if (!v) return undefined;
    const num = parseInt(v, 10);
    return Number.isNaN(num) ? undefined : num;
  }),
  label: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['created_at', 'due_date', 'priority']).optional().default('created_at'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

module.exports = {
  taskSchema,
  taskUpdateSchema,
  labelSchema,
  taskFilterSchema,
};
