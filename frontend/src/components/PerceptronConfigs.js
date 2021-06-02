import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl } from 'react-bootstrap';

import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';

import { PerceptronContext } from "./PerceptronContext.js";
import Adaline from '../algoritmos/Adaline.js';
import {sigmoidal, tangente, relu} from "../algoritmos/FuncionesActivacion"



const PerceptronConfigs = (props) => {
    
    const { handleSubmit, register, errors, control, watch } = useForm();
    const { perceptronState, setPerceptronState } = useContext(PerceptronContext);
    const [perceptronErrors, setPerceptronErrors] = useState({});

    const type = watch("type");

    const iniciarPesos = async (values) => {
        console.log(values);
        let perceptron;
        setPerceptronErrors({});
        if (!perceptronState?.x?.length) {
            setPerceptronErrors({
                trainingSet: {
                    message: "Agregue datos de entrenamiento"
                }
            });
            return;
        }
        perceptron = new Adaline(
            perceptronState.x[0].length,
            100,
            0.01,
            0.1,
            perceptronState.cpDrawer,
            (type==='sigmoidal') ? sigmoidal : (type==='tangente') ? sigmoidal : sigmoidal
        );
        

        setPerceptronState({
            ...perceptronState,
            perceptron,

        });
        const x2 = [];
        x2[0] = perceptron.calcularX2(-5);
        x2[1] = perceptron.calcularX2(5);
        console.log("x2: ", x2);
        perceptronState.cpDrawer.clearCanvas();
        perceptronState.cpDrawer.drawAxis();
        perceptronState.x.forEach((point, index) => {
            perceptronState.cpDrawer.drawPoint(perceptronState.cpDrawer.XC(point[0]), perceptronState.cpDrawer.YC(point[1]), perceptronState.y[index])
        });
        
            perceptronState.cpDrawer.drawLine(-5, x2[0], 5, x2[1], "#FF0040");
        
        //    perceptronState.cpDrawer.drawLine(-5, x2[0], 5, x2[1], "#0101DF");
        



    }
    const entrenar = async () => {
        setPerceptronErrors({});
        if (!perceptronState.perceptron) {
            setPerceptronErrors({
                "trainedPerceptron": {
                    message: "Primero inicialice el perceptron"
                }
            });
            return;
        }
        await perceptronState.perceptron.fit(perceptronState.x, perceptronState.y);
        const xd = perceptronState.perceptron.errorAcumulado.length >= perceptronState.perceptron.iterations;
        setPerceptronState({
            ...perceptronState,
            entrenado: true,
            limiteAlcanzado: xd
        });
        console.log(perceptronState.perceptron.w);
    }

    const reiniciar = () => {
        perceptronState.cpDrawer.clearCanvas();
        perceptronState.cpDrawer.drawAxis();
        setPerceptronState({
            ...perceptronState,
            perceptron: null,
            entrenado: false,
            x: [],
            y: [],
        });
    }



    return <>
        <Form onSubmit={handleSubmit(iniciarPesos)} className="">
          
            {
                perceptronErrors.trainingSet &&
                <span className="error">{perceptronErrors.trainingSet.message}</span>
            }

            {
                perceptronErrors.trainedPerceptron &&
                <span className="error">{perceptronErrors.trainedPerceptron.message}</span>
            }

            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{ color: "#03A9F4" }}>  Inicializar </Button>

        </Form>
        <Form onSubmit={handleSubmit(entrenar)} className="">
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{ color: "#03A9F4" }}>Entrenar</Button>
        </Form>

        <Form onSubmit={handleSubmit(reiniciar)} className="">
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{ color: "#03A9F4" }}>Reiniciar</Button>
        </Form>

    </>
}

export default PerceptronConfigs;