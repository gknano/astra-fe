interface TodosEntries {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type TodosDTO = TodosEntries[] | [];

// export interface TodosState {
//   data: TodosDTO;
// }

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}
