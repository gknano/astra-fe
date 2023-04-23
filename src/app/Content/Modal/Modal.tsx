import { useContext, useState } from 'react';
import ReactModal from 'react-modal';

import { TodosContext } from '../../../Context';

import type { ITodosEntries } from '../../../Context/types';

interface ModalProps {
  showModal: boolean;
  selectedRow: ITodosEntries;
  clearSelectedRow: () => void;
}

ReactModal.setAppElement('#root');

const customModalStyles = {
  content: {
    width: '400px',
    height: '200px',
    padding: '10px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const Modal = (props: ModalProps) => {
  const { showModal, selectedRow, clearSelectedRow } = props;
  const { contextState, setContextState } = useContext(TodosContext);
  const [updatedRow, setUpdatedRow] = useState<ITodosEntries>(selectedRow);
  console.log('Modal', updatedRow);

  function updateData() {
    // Здесь должен бы быть запрос на бэкенд, чтобы получить обновленый массив объектов.
    // Но т.к. ресурс jsonplaceholder вернет лишь обнолвенный объект, было сымитировано
    // поведение путем редактирования локального стэйта.
    const index = contextState.findIndex((item) => item.id === updatedRow.id);
    const unpdatedTodos = [
      ...contextState.slice(0, index),
      Object.assign({}, contextState[index], updatedRow),
      ...contextState.slice(index + 1),
    ];

    setContextState(unpdatedTodos);
    clearSelectedRow();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { id, value } = e.target;
    setUpdatedRow((prevState: ITodosEntries) => ({
      ...prevState,
      [id]: value,
    }));
  }

  return (
    <>
      <ReactModal
        isOpen={showModal}
        onRequestClose={clearSelectedRow}
        style={customModalStyles}
      >
        <div>
          <div>
            <label htmlFor="userId">UserID:</label>
            <input
              type="text"
              id="userId"
              defaultValue={selectedRow?.userId}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              defaultValue={selectedRow?.title}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="completed">Completed:</label>
            <input
              type="text"
              id="completed"
              defaultValue={String(selectedRow?.completed)}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <button type="button" onClick={clearSelectedRow}>
              Close
            </button>
            <button type="button" onClick={updateData}>
              Save
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
