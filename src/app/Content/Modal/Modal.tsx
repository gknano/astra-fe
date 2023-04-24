import { useContext, useState } from 'react';
import ReactModal from 'react-modal';

import { TodosContext } from '../../../Context';

import type { ITodosEntries, TodosDTO } from '../../../Context/types';

import './Modal.scss';

interface ModalProps {
  showModal: boolean;
  selectedRow: ITodosEntries;
  clearSelectedRow: () => void;
}

ReactModal.setAppElement('#root');

const customModalStyles = {
  content: {
    width: '400px',
    height: 'auto',
    padding: '20px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  close: {
    position: 'absolute',
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
};

export const Modal = (props: ModalProps) => {
  const { showModal, selectedRow, clearSelectedRow } = props;
  const { contextState, setContextState } = useContext(TodosContext);
  const [updatedRow, setUpdatedRow] = useState<ITodosEntries>(selectedRow);

  const addData = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setContextState((prevState: TodosDTO) => {
      const newTodos = [
        ...prevState,
        { ...updatedRow, id: prevState.length + 1 },
      ];
      return newTodos;
    });

    clearSelectedRow();
  };

  const updateData = () => {
    // Здесь должен бы быть запрос на бэкенд, чтобы получить обновленый массив объектов.
    // Но т.к. ресурс jsonplaceholder вернет лишь обнолвенный объект, было сымитировано
    // поведение путем редактирования локального стэйта.
    if (updatedRow.id === 0) {
      addData();
      return;
    }

    const index = contextState.findIndex((item) => item.id === updatedRow.id);
    const updatedTodos = [
      ...contextState.slice(0, index),
      Object.assign({}, contextState[index], updatedRow),
      ...contextState.slice(index + 1),
    ];

    setContextState(updatedTodos);
    clearSelectedRow();
  };

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
        <div className="modal-container">
          <div>
            <label htmlFor="userId">UserID:</label>
            <input
              type="text"
              id="userId"
              defaultValue={selectedRow?.userId}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="modal-tem">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              defaultValue={selectedRow?.title}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="modal-tem">
            <label htmlFor="completed">Completed:</label>
            <input
              type="text"
              id="completed"
              defaultValue={String(selectedRow?.completed)}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="modal-tem">
            <button
              type="button"
              className="modal-button"
              onClick={clearSelectedRow}
            >
              Close
            </button>
            <button type="button" className="modal-button" onClick={updateData}>
              Save
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
