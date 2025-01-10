import {
  interviewStageInputTypes,
  InterViewStageList,
  JobDepartmentList,
  JobPositionList,
  TJobList,
} from '../../types/Job/type';
import axios from 'axios';
import { BaseUrl } from '@/config';
const accessToken = localStorage.getItem('accessToken');

console.log('AccessToken', accessToken);

export const getJobpostion = async () => {
  const response = await axios.get(`${BaseUrl}/job-position/list`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data as JobPositionList;
};

export const getDepartments = async () => {
  const response = await axios.get(`${BaseUrl}/job-department/list`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data as JobDepartmentList;
};

export const getInterviewStages = async () => {
  const response = await axios.get(`${BaseUrl}/interviewstage/list`, {
    headers: {
      Accept: '*/*',
      Authorization: ` Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data as InterViewStageList;
};

export const handleCreateInterviewStage = async (
  data: interviewStageInputTypes
) => {
  const response = await axios.post(`${BaseUrl}/interviewstage/create`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const handleCreateJob = async (data: any) => {
  const response = await axios.post(`${BaseUrl}/job/create`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getJobList = async (pageNumber:string) => {
  const response = await axios.get(`${BaseUrl}/job/list?page=${pageNumber}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data as TJobList;
};
