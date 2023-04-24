import { useEffect, useContext } from 'react';

import { getData } from './api';
import { MemoizeTable } from './Table';
import { TodosContext } from '../../Context';

import type { AxiosResponse } from 'axios';
import type { TodosDTO } from '../../Context/types';

import './Content.scss';

export function Content() {
  const { setContextState } = useContext(TodosContext);

  useEffect(() => {
    getData()
      .then((response: AxiosResponse<TodosDTO>) => {
        const todos = response.data;
        setContextState(todos);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }, [setContextState]);

  return (
    <main className="content">
      <MemoizeTable />
    </main>
  );
}
