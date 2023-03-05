import api from '../config/api';

const BASE_URL = '/users/auth';

interface LoginBody {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  username: string;
  id: string;
}

export const login = (username: string, password: string) => api.post<LoginBody, LoginResponse>(`${BASE_URL}/login`, { username, password });
