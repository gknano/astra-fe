interface TodosEntries {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type TodosDTO = TodosEntries[] | [];
