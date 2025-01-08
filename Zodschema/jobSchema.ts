import { z } from 'zod';

export const InterviewStageSchema = z.object({
  interviewStageName: z.string(),
  interviewMedium: z
    .string()
    .min(1, { message: 'Interview medium is required.' }),
});

export const CreateJobSchema = z.object({
  jobPositionName: z
    .string({ required_error: 'Job position is required.' })
    .min(1, { message: 'Job position is required.' }),
  vacancy: z
    .string({ required_error: 'No of vacancy is required.' })
    .min(1, { message: 'No of vacancy is required.' })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Vacancy must be a positive integer.',
    }),
  jobDepartmentName: z.string().optional(),
  jobResponsibility: z
    .string({ required_error: 'Job responsibilities is required.' })
    .min(1, { message: 'Job responsibilities is required.' }),
  interviewStages: z
    .array(InterviewStageSchema)
    .min(1, { message: 'Interview stages & medium is required.' }),
  jobKeywords: z.array(z.string()).optional(),
});
