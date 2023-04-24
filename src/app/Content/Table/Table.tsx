import { useState, memo, useContext, useCallback } from 'react';

import { Modal } from '../Modal';
import { useBooleanState } from '../../../hooks';
import { TodosContext } from '../../../Context';

import { columns, defaultSelectedRow } from './utils';

import type { ITodosEntries } from '../../../Context/types';

import './Table.scss';

export function Table() {
  console.log('Table render');

  const { contextState, setContextState } = useContext(TodosContext);
  const [isShowModal, setTrue, setFalse] = useBooleanState(false);
  const [selectedRow, setSelectedRow] =
    useState<ITodosEntries>(defaultSelectedRow);

  const onChangeHandle = useCallback(
    (todoItem: ITodosEntries) => {
      setSelectedRow(todoItem);
      setTrue();
    },
    [setTrue]
  );

  const clearSelectedRow = useCallback(() => {
    setSelectedRow(defaultSelectedRow);
    setFalse();
  }, [setFalse]);

  function deleteData(id: number) {
    // Здесь должен бы быть запрос на бэкенд, чтобы получить обновленый массив объектов.
    // Но т.к. ресурс jsonplaceholder не вернет обнолвенный массив, было сымитировано
    // поведение путем редактирования локального стэйта.
    const index = contextState.findIndex((item) => item.id === id);
    const updatedTodos = [...contextState];
    updatedTodos.splice(index, 1);

    setContextState(updatedTodos);
    clearSelectedRow();
  }

  return (
    <>
      {isShowModal && (
        <Modal
          showModal={isShowModal}
          selectedRow={selectedRow}
          clearSelectedRow={clearSelectedRow}
        />
      )}
      <div className="table-container">
        <div className="table-header">
          {columns.map((column, index) => (
            <div
              key={index}
              className={`table-header-column column-${index}`}
              style={{ width: column.width }}
            >
              {column.label}
            </div>
          ))}
        </div>
        <div className="table-body">
          {contextState.map((item) => (
            <div key={item.id} className="table-row">
              <div
                className="table-row-column column-0"
                style={{ width: columns[0].width }}
              >
                {item.id}
              </div>
              <div
                className="table-row-column column-1"
                style={{ width: columns[1].width }}
              >
                User {item.userId}
              </div>
              <div
                className="table-row-column column-2"
                style={{ width: columns[2].width }}
              >
                {item.title}
              </div>
              <div
                className="table-row-column column-3"
                style={{ width: columns[3].width }}
              >
                {item.completed ? 'Done' : 'Not done'}
              </div>
              <div className="table-row-column column-4">
                <button
                  className="buttons"
                  onClick={() => onChangeHandle(item)}
                >
                  Edit
                </button>
                <button className="buttons" onClick={() => deleteData(item.id)}>
                  Delete
                </button>
                <button
                  className="buttons"
                  onClick={() => onChangeHandle(defaultSelectedRow)}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const MemoizeTable = memo(Table);
