import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ChartLine from "./ChartLine";
import Form from "react-bootstrap/Form";
import {FormCheck} from "react-bootstrap";
import {addStock, delStock, storeStocks} from "../stores/stockesStore";

export default function StockChart(props){
    const stock = props.stock;
    const [stockChart, setChart] = useState([]);
    const getChart = async () => {
        const response =  await fetch('http://localhost:4000/getstock' + stock);
        if (response.ok)
            return await response.json();
        else{
            console.log("void response");
            return null;
        }
    };
    useEffect(() => {
        getChart().then(data => {
            if (data)
                setChart(data);
        });
        console.log(stockChart[0])
    },[]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateStore = (event) => {
        console.log(event.target.checked);
        //const call = event.target.checked ? addStock : delStock;
        //call(stock);
        if (event.target.checked)
            storeStocks.dispatch(addStock(stock))
        else
            storeStocks.dispatch(delStock(stock))
    }
    const setValue = () => {
        if (storeStocks.getState().includes(stock))
            return true;
        return false;
    }

    if (stockChart[0])
        return (
            <>
                <p>Цена: {stockChart[0].open} </p>
                <div className={'d-flex'}>
                    <Button style={{display: "inline-block"}} onClick={handleShow} variant="btn btn-dark"> Показать график </Button>
                    <Form>
                        <FormCheck
                            defaultChecked={setValue()}
                            value={'on'}
                            style={{margin: '10px'}}
                            type='checkbox'
                            id={stock + 'CB'}
                            label='Участвие в торгах'
                            onChange={updateStore}
                        >
                        </FormCheck>
                    </Form>
                </div>
                <Modal dialogClassName="chartDialog" show={show} onHide={handleClose} key={stock}>
                    <Modal.Header closeButton>
                        <Modal.Title>График акций {stock}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ChartLine label={stock} data={stockChart}/>
                    </Modal.Body>
                </Modal>
            </>
        );

    return(
      <>
          <p>LOADING...</p>
      </>
    );
}