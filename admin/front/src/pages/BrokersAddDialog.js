import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import {sendPing} from "../soket";

export default function BrokersAddDialog(props){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onFormSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        await fetch('http://localhost:4000/addbroker', {
            method: 'POST',
            headers: { "Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(formDataObj)
        });
        sendPing('addBroker', 'broker was added');
    };
    return (
      <>
          <Card className={'broker-card'} key = '-1'>
              <Card.Body>
                  <Button onClick={handleShow} variant="btn btn-dark">Добавить брокера</Button>
              </Card.Body>
          </Card>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Добавление брокера</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={onFormSubmit}>
                      <Form.Group className="mb-3" controlId="name">
                          <Form.Label>Название</Form.Label>
                          <Form.Control name = 'name' type="text"/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="commission">
                          <Form.Label>Комиссия (%)</Form.Label>
                          <Form.Control name = 'commission' type="number"/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="startMoney">
                          <Form.Label>Начальная сумма ($)</Form.Label>
                          <Form.Control name = 'startMoney' type="number"/>
                      </Form.Group>
                      <Button variant="primary" type="submit" onClick={handleClose}>
                          Сохранить
                      </Button>
                  </Form>
              </Modal.Body>
          </Modal>
      </>
    );
}