import React, {useContext, useState, Component} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import CartesianPlane from '../components/CartesianPlane';
import PerceptronConfigs from '../components/PerceptronConfigs';

import { PerceptronContext } from "../components/PerceptronContext";

const Perceptron = (props) => {
    const {perceptronState} = useContext(PerceptronContext); 
    return <>
        <Container fluid>
            
            <Row>
                <Col
                    md={{span: 7}}
                    sm={{span: 12}}
                >
                    <div className="card card--box">
                        <div className="card__header">
                            Plano cartesiano
                        </div>
                        <CartesianPlane />
                    </div>
                </Col>
                <Col 
                    md={{span: 5}}
                    sm={{span: 12}}
                >
                    <div className="card card--box">
                        <div className="card__header">
                            Compuertas
                        </div>
                        <PerceptronConfigs />                       
                    </div>
                   
                </Col>
            </Row>
                      
        </Container>
    </>
}

export default Perceptron;