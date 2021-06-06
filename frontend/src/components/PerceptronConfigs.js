import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl } from 'react-bootstrap';

import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';

import { PerceptronContext } from "./PerceptronContext.js";
import Adaline from '../algoritmos/Adaline.js';
import { sigmoidal, tangente, relu } from "../algoritmos/FuncionesActivacion"



const PerceptronConfigs = (props) => {

    const { handleSubmit, register, errors, control, watch } = useForm();
    const { perceptronState, setPerceptronState } = useContext(PerceptronContext);
    const [perceptronErrors, setPerceptronErrors] = useState({});

    const type = watch("type");
    const n = 22
    const iniciarPesos = async (values) => {

        let perceptron;
        const data = seno()

        let x = []
        let y = []
       

        for (let i = 0; i < data.length - n; i++) {
            let adalineInput = []
            const _data = data.slice(i, n+i)
            for (let j = 0; j < _data.length; j++) {
                adalineInput.push(_data[j].ruido)                                                
            }                    
            y.push(data[n+i]?.ruido)
            x[i] = adalineInput
            
            
        }


        perceptron = new Adaline(
            n,
            200,
            0.01,
            0.01,
            perceptronState.cpDrawer,
        );


        setPerceptronState({
            ...perceptronState,
            perceptron,
            data,
            x,
            y

        });

    }
    
    const seno = () => {
        let data = []


        for (let x = 0; x < 100; x++) {
            const y = Math.sin(x)
            const yRuido = Math.sin(x + Math.floor(Math.random() * (3 - 1)))
            data[x] = {
                x: x,
                original: y,
                ruido: yRuido,
                corregido: 0
            }
        }
        return data;

    }

    const entrenar = async () => {
        
        setPerceptronErrors({});
        if (!perceptronState.perceptron) {
            setPerceptronErrors({
                "trainedPerceptron": {
                    message: "Primero escoja una señal"
                }
            });
            return;
        }
        perceptronState.x.forEach((item, index) => {
            
            perceptronState.perceptron.fit(item, perceptronState.y[index]);
            index < n 
                ? perceptronState.data[index].corregido = (perceptronState.data[index].ruido)
                : perceptronState.data[index].corregido = (perceptronState.perceptron.predict(item))
            
            
        });
        
        
        
        setPerceptronState({
            ...perceptronState,
            entrenado: true,            
               
        });
        
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

            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{ color: "#03A9F4" }}>  Señal senoidal </Button>

        </Form>
        <Form onSubmit={handleSubmit(entrenar)} className="">
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{ color: "#03A9F4" }}>Corregir</Button>
        </Form>

        <Form onSubmit={handleSubmit(reiniciar)} className="">
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{ color: "#03A9F4" }}>Reiniciar</Button>
        </Form>

    </>
}

export default PerceptronConfigs;