import { environment } from '../../environments/environment';

export const API_BASE_URL = environment.apiUrl;


export const AuthEndpoints = {
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
};
