import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";

type Props = {
    show: boolean
    postKey: string
    confirmDelete: (postKey: string) => void
    cancelDelete: () => void
}

const ModalWindow = ({show, postKey, confirmDelete, cancelDelete}: Props) => {
    return (
        <Modal show={show} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>No, cancel</Button>
                    <Button variant="primary" onClick={() => confirmDelete(postKey)}>Yes, delete</Button>
                </Modal.Footer>
        </Modal>
    )
}

// @ts-ignore
export default ModalWindow