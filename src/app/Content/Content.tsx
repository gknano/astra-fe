import { useEffect, useState } from 'react';

import { getData } from './api';
import { MemoizeTable } from './Table';
import { Modal } from './Modal';
import { useBooleanState } from '../../hooks';

import type { AxiosResponse } from 'axios';
import type { TodosDTO } from './types';

import './Content.scss';

export function Content() {
  const [data, setData] = useState<TodosDTO>([]);
  const [isShowModal, setTrue, setFalse] = useBooleanState(false);

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
      <Modal showModal={isShowModal} onClickClose={setFalse} />
      <MemoizeTable data={data} onClickOpen={setTrue} />
    </main>
  );
}
