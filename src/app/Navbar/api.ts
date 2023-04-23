import { axios } from '../../api';

import type { TodosDTO } from '../../Context/types';
import type { IFilters } from './types';

export async function filterData(params: IFilters) {
  return axios.get<TodosDTO>('/todos/', { params });
}
