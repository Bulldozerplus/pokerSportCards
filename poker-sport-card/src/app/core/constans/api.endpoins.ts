export const API_BASE_URL = 'http://109.195.85.148:8083';


export const AuthEndpoints = {
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
};

export const GameRoomEndpoints = {
  ROOMS_LIST: `${API_BASE_URL}/api/room`,
}
