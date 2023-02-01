import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Accordion from "react-bootstrap/Accordion";
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";

export default function ChartLine(props){
    const [dec, setDec] = useState(10);
    const ref = useRef();
    let stockData = props.data.map(val => ({x: val.date, y: parseFloat(val.open.split('$')[1])})).reverse();
    let dataForChart = [];
    for (let i = 0; i < stockData.length; i++)
        if (!(i % dec))
            dataForChart.push(stockData[i]);

    const onFormChange = (e) => {
        setDec(e.target.value);
    }

    const data = {
        datasets: [
            {
                label: props.label,
                data: dataForChart,
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)'
            },
        ],
    };

    return <>
        <Form.Label>Частота дней</Form.Label>
        <Form.Control
            style={{display: "inline"}}
            type="number"
            value={dec}
            onChange={onFormChange}
        />
        <Line ref={ref} data={data} />
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
                <Accordion.Header>Таблица акций {props.label}</Accordion.Header>
                <Accordion.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Open Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.data.map(val => (
                            <tr>
                                <td>{val.date}</td>
                                <td>{val.open}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </>
};