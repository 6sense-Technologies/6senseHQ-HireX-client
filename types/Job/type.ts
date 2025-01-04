export type interviewStageInputTypes = {
  interviewStageName: string;
};

export type Item = {
  id: number;
  label: string;
  checked: boolean;
};

export type JobResponsibilitesProps = {
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
