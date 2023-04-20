import { axios } from '../../api';

import type { TodosDTO } from './types';

export async function getData() {
  return axios.get<TodosDTO>('/todos/');
}
