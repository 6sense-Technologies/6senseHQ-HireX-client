import {
  interviewStageInputTypes,
  InterViewStageList,
  JobDepartmentList,
  JobPositionList,
} from '../../types/Job/type';
import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');

console.log('AccessToken', accessToken);

export const getJobpostion = async () => {
  const response = await axios.get('http://localhost:8000/job-position/list', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data as JobPositionList;
};

export const getDepartments = async () => {
  const response = await axios.get(
    'http://localhost:8000/job-department/list',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data as JobDepartmentList;
};

export const getInterviewStages = async () => {
  const response = await axios.get(
    'http://localhost:8000/interviewstage/list',
    {
      headers: {
        Accept: '*/*',
        Authorization: ` Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data as InterViewStageList;
};

export const handleCreateInterviewStage = async (
  data: interviewStageInputTypes
) => {
  const response = await axios.post(
    'http://localhost:8000/interviewstage/create',
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const handleCreateJob = async (data: any) => {
  const response = await axios.post('http://localhost:8000/job/create', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
