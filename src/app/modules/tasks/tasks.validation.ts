// Define your validations here

import { z } from 'zod';

const createTaskZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    isFavorite: z.boolean({
      required_error: 'Favorite is required',
    }),
    status: z.string({
      required_error: 'Status is required',
    }),
  }),
});

export const TaskValidation = {
  createTaskZodSchema,
};
