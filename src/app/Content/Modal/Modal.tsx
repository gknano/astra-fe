import ReactModal from 'react-modal';

interface ModalProps {
  showModal: boolean;
  onClickClose: () => void;
}

ReactModal.setAppElement('#root');

const customModalStyles = {
  content: {
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
  const { showModal, onClickClose } = props;

  return (
    <>
      <ReactModal
        isOpen={showModal}
        onRequestClose={onClickClose}
        style={customModalStyles}
      >
        <div>
          <h2>Модальное окно</h2>
          <div>
            <label htmlFor="userTitle">User Title:</label>
            <input type="text" id="userTitle" />
          </div>
          <div>
            <label htmlFor="Title">Title:</label>
            <input type="text" id="Title" />
          </div>
          <div>
            <label htmlFor="completed">Completed:</label>
            <input type="text" id="completed" />
          </div>
          <div>
            <button type="button" onClick={onClickClose}>
              Close
            </button>
            <button type="button">Save</button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
