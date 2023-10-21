
import React from "react";
import clsx from "clsx";
import { Modal } from "react-bootstrap";
import {ReactComponent as CloseIcon } from "../../assets/icons/close-icon.svg"
import "./CustomModal.scss";

const CustomModal = ({
    showModal,
    onOk,
    onCancel,
    title = "Are you sure?",
    children,
    className,
    okButtonLabel = "OK",
    cancelButtonLabel = "Cancel",
    btnType
}) => {

    return (
        <Modal
            centered
            dialogClassName={clsx("confirmation-modal", className)}
            show={showModal}
            onHide={onCancel}
        >
            <Modal.Header className="confirmation-modal__header">
                <Modal.Title
                    className="confirmation-modal-title"
                    id="example-custom-modal-styling-title"
                >
                    <div className="confirmation-modal-title__header">
                        {title}
                    </div>
                    <div className="confirmation-modal__icon">
                        <button className="confirmation-modal__icon__close" onClick={onCancel}>                           
                            <CloseIcon width={15} height={15}/>
                        </button>
                    </div>
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="text-align-center">
                <hr className="mb-3" />
                {children}
                <hr />
            </Modal.Body>

            <Modal.Footer>
                <button
                    className="btn btn-secondary btn-style"
                    onClick={onCancel}
                >
                    {cancelButtonLabel}
                </button>

                <button
                    className={`btn btn-primary btn-${btnType}`}
                    onClick={onOk}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                >
                    {okButtonLabel}
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
