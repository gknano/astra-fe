import { axios } from '../../api';

import type { TodosDTO } from '../../Context/types';

export async function getData() {
  return axios.get<TodosDTO>('/todos/');
}
