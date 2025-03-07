import { z } from "zod";

// Subject Schema
export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required" }),
    teachers: z.array(z.string())
  
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

// Class Schema
export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required" }),
  capacity: z.coerce.number().min(1, { message: "Capacity is required" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required" }),
  supervisorId: z.coerce.string().optional()
  
});

export type ClassSchema = z.infer<typeof classSchema>;