import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";

type Props = {
    show: boolean
    custom?: any
    confirm: any
    cancel: () => void
    text: string
}

const ModalWindow = ({show, custom, confirm, cancel, text}: Props) => {
    return (
        <Modal show={show} onHide={cancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to {text}?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={custom ? () => confirm(custom) : confirm}>Yes</Button>
                    <Button variant="secondary" onClick={cancel}>No</Button>
                </Modal.Footer>
        </Modal>
    )
}

export default ModalWindow