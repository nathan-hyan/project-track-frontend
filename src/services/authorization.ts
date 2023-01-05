import api from '../config/api';

const BASE_URL = '/users/auth';

interface LoginBody {
  DNI: number;
  password: string;
}

export const login = (DNI: number, password: string) => api.post<LoginBody>(`${BASE_URL}/login`, { DNI, password });
