import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import WebSocket, {sendPing} from "../soket";
import {storeStocks} from "../stores/stockesStore";
import React, {useState} from "react";
import Trade from "./Trade";

export default function Settings(){
    const [tradeStatus, setTradeStatus] = useState(false);
    const [day, setDay] = useState('');
    const onFormSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        formDataObj['stocks'] = storeStocks.getState();
        await fetch('http://localhost:4000/starttrade', {
            method: 'POST',
            headers: { "Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(formDataObj)
        });
        setTradeStatus(true);
        //sendPing('startTrade', 'trade has been launched');
    };
    //            <WebSocket event={'tradeStarted'} updateCall={setTradeStatus}/>
    return(
        <>
            <Container>
                <h2> Настройки брижи </h2>
                <Form onSubmit={onFormSubmit}>
                    <Form.Group controlId="startDate">
                        <Form.Label style={{margin: '1em 0 1em 0'}}>Дата начала торгов: </Form.Label>
                        <Form.Control
                            type="date"
                            name="startDate"
                            disabled={tradeStatus}
                        />
                    </Form.Group>
                    <Form.Group controlId="startDate">
                        <Form.Label style={{margin: '1em 0 1em 0'}}>Скорость смены дат (с/день): </Form.Label>
                        <Form.Control
                            type="number"
                            name="tradeSpeed"
                            defaultValue={2}
                            disabled={tradeStatus}
                        />
                    </Form.Group>
                    <Button style={{margin: '1em 0 1em 0'}}
                            variant="btn btn-danger"
                            type="submit"
                            disabled={tradeStatus}>
                        Начать торги
                    </Button>
                </Form>
                <h2 style = {{visibility: tradeStatus ? 'visible' : 'hidden'}}>День: {day}</h2>
                <Trade setDay={setDay} setStatus={setTradeStatus}/>
            </Container>
        </>
    );

}