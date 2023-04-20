import { useEffect, useState } from 'react';

import { getData } from './api';
import { Table } from './Table';

import type { AxiosResponse } from 'axios';
import type { TodosDTO } from './types';

import './Content.scss';

export function Content() {
  const [data, setData] = useState<TodosDTO>([]);

  useEffect(() => {
    getData()
      .then((response: AxiosResponse<TodosDTO>) => {
        const todos = response.data;
        setData(todos);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }, []);

  return (
    <main className="content">
      <Table data={data} />
    </main>
  );
}
