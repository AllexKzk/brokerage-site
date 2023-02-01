import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {sendPing} from "../soket";

export default function BrokersEditDialog(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onFormSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj);
        await fetch('http://localhost:4000/editbroker' + props.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(formDataObj)
        });
        sendPing('addBroker', 'broker was edited');
    };

    return (
      <>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Добавление брокера</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={onFormSubmit}>
                      <Form.Group className="mb-3" controlId="name">
                          <Form.Label>Название</Form.Label>
                          <Form.Control defaultValue={props.name} name = 'name' type="text"/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="commission">
                          <Form.Label>Комиссия (%)</Form.Label>
                          <Form.Control defaultValue={props.commission} name = 'commission' type="number"/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="startMoney">
                          <Form.Label>Начальная сумма ($)</Form.Label>
                          <Form.Control defaultValue={props.startMoney} name = 'startMoney' type="number"/>
                      </Form.Group>
                      <Button variant="primary" type="submit" onClick={handleClose}>
                          Сохранить
                      </Button>
                  </Form>
              </Modal.Body>
          </Modal>
          <Button variant="btn btn-dark" onClick={handleShow}>Изменить</Button>
      </>
    );
}