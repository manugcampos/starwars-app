import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:6969';

export const fetchPeople = async (params: { page: number; search?: string; sort_by?: string; order?: string }) => {
  const { page, search, sort_by, order } = params;
  const res = await axios.get(`${API_BASE}/people`, {
    params: { page, search, sort_by, order },
  });
  return res.data;
};

export const fetchPlanets = async (params: { page: number; search?: string; sort_by?: string; order?: string }) => {
  const { page, search, sort_by, order } = params;
  const res = await axios.get(`${API_BASE}/planets`, {
    params: { page, search, sort_by, order },
  });
  return res.data;
};

export const simulateAIInsight = async (name: string) => {
  const res = await axios.post(`${API_BASE}/simulate-ai-insight`, { name });
  return res.data;
}; 