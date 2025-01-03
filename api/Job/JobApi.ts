import { interviewStageInputTypes } from '@/types/Job/type';
import axios from 'axios';

const accssToken = localStorage.getItem('access_Token');

console.log('AccessToken', accssToken);

export const getJobpostion = async () => {
  const response = await axios.get(
    'https://192.168.0.158:8000/job-position/list',
    {
      headers: {
        Authorization: `Bearer ${accssToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const getDepartments = async () => {
  const response = await axios.get(
    'https://192.168.0.158:8000/job-department/list',
    {
      headers: {
        Authorization: `Bearer ${accssToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const getInterviewStages = async () => {
    const response = await axios.get(
      'https://192.168.0.158:8000/interviewstage/list',
      {
        headers: {
          Authorization: `Bearer ${accssToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  };

  export const handleCreateInterviewStage = async (data: interviewStageInputTypes) => {
    const response = await axios.post(
      'https://192.168.0.158:8000/interviewstage/create',
      data,
      {
        headers: {
          Authorization: `Bearer ${accssToken}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } 
  
