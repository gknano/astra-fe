import { axios } from '../../api';

import type { TodosDTO, ApiResponse } from './types';

// export async function getV10Devices(params: { placeId: number }) {
//   return axios.get<V10DevicesDTO>('/v10/devices/', { params });
// }

export async function getData() {
  return axios.get<ApiResponse<TodosDTO>>('/todos/');
}
