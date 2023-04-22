import { useEffect, useContext } from 'react';

import { getData } from './api';
import { MemoizeTable } from './Table';
import { Modal } from './Modal';
import { useBooleanState } from '../../hooks';
import { TodosContext } from '../../Context';

import type { AxiosResponse } from 'axios';
import type { TodosDTO } from '../../Context/types';

import './Content.scss';

export function Content() {
  const { contextState, setContextState } = useContext(TodosContext);
  const [isShowModal, setTrue, setFalse] = useBooleanState(false);

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
      <Modal showModal={isShowModal} onClickClose={setFalse} />
      <MemoizeTable data={contextState} onClickOpen={setTrue} />
    </main>
  );
}
