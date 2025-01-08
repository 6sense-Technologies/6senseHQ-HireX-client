import { z } from 'zod';

export const InterviewStageSchema = z.object({
  interviewStageName: z
  .string(),
  interviewMedium: z
    .string()
    .min(1, { message: 'Interview medium is required.' }),
});

export const CreateJobSchema = z.object({
  jobPositionName: z
    .string({ required_error: 'Job Position is required.' })
    .min(1, { message: 'Job Position is required.' }),
  vacancy: z
    .string({ required_error: 'Vacancy is required.' })
    .min(1, { message: 'No of vacancy is required.' })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Vacancy must be a positive integer.',
    }),
  jobDepartmentName: z.string().optional(),
  jobResponsibility: z
    .string({ required_error: 'Job responsibilities are required.' })
    .min(1, { message: 'Job responsibilities are required.' }),
  interviewStages: z
    .array(InterviewStageSchema)
    .min(1, { message: 'Interview stages & medium are required.' }),
    jobKeywords:z.array(z.string()).optional(),
});
