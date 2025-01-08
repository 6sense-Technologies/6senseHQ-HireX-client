import { DragEvent } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export type interviewStageInputTypes = {
  interviewStageName: string;
};

export type Item = {
  id: number;
  label: string;
  checked: boolean;
};

export type JobResponsibilitiesProps = {
  control: any;
  errors: any;
};

export type IdealCandidateProps = {
  control: any;
  errors: any;
};

export type DropdownMenuProps = {
  control: any;
  name: string;
};

export type TagProps = {
  selectedSkills: string[];
  onRemoveSkill: (skill: string) => void;
};

export type InterViewStageList = InterviewStages[];

export interface InterviewStages {
  interviewStageId: string;
  interviewStageName: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export type JobPositionList = JobPositions[];

export interface JobPositions {
  jobPositionId: string;
  jobPositionName: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export type JobDepartmentList = JobDepartments[];

export interface JobDepartments {
  jobDepartmentId: string;
  jobDepartmentName: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export type JobInformationProps = {
  control: any;
  errors: any;
  setValue: UseFormSetValue<JobFormInputs>;
  jobPositionOptions: { label: string; value: string }[];
  departmentOptions: { label: string; value: string }[];
};

export type InterviewStageProps = {
  control: any;
  errors: any;
  setValue: UseFormSetValue<JobFormInputs>;
  isButtonClicked: boolean;
};

export type IdealCandidatesProps = {
  control: any;
  errors: any;
};

export type InterviewStageItem = {
  id: number;
  interviewMedium?: string;
  label?: string;
  checked?: boolean;
};

export type JobFormInputs = {
  jobPositionName: string;
  jobDepartmentName?: string;
  vacancy: string;
  interviewStages?: InterviewStageItem[];
  jobResponsibilities?: string;
  idealCandidate?: string;
};