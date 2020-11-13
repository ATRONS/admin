import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';

export const DeleteProviderModal = ({
  modalOpen,
  toggleModal,
  onComfirm,
  providersName,
}) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader>
        <IntlMessages id="modal.comfirmation" />
      </ModalHeader>
      <ModalBody>
        Are you sure you want to permenently delete {providersName.join(', ')}
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            toggleModal();
            onComfirm();
          }}
        >
          Yes, Delete
        </Button>{' '}
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
