import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

export function validate<T>(schema: z.ZodSchema<T>, data: any): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new BadRequestException(result.error.errors);
  }
  return result.data;
}