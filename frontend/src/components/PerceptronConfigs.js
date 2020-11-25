import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from 'react-bootstrap';
import { Button, FormControlLabel, Radio, RadioGroup, TextField, FormLabel,FormControl} from '@material-ui/core';
import { PerceptronContext } from "./PerceptronContext.js";
import BackPropagation from '../algoritmos/BackPropagationV2.js';
import CsvReader from './CsvReader';


const numCapas = [
    {
        label: "1",
        value: "unacapa"
    },
    {
        label: "2",
        value: "doscapas"
    }
]
let clases = [];



const PerceptronConfigs = (props) => {
   
    const { handleSubmit, register, errors, control, watch, getValues } = useForm(
        {
            defaultValues: {
                learning_rate: 0.1,
                max_error: 0.01,
                max_epic_number: 1000
            }
        }
    );
    const { perceptronState, setPerceptronState } = useContext(PerceptronContext);
    const [perceptronErrors, setPerceptronErrors] = useState({});
    const [iniciado, setIniciado] = useState(false);
    const [initConf, setInitConf] = useState({});
    const [claseSelect, setClaseSelect] = useState("1");

  




    const iniciarPesos = async (values) => {
                    
        
        setPerceptronErrors({});
        if (!perceptronState?.x?.length) {
            setPerceptronErrors({
                trainingSet: {
                    message: "Agregue datos de entrenamiento"
                }
            });
            return;
        }
 
        const neuronsPerLayer = [2, initConf.num_n_capa1];
        if (initConf.num_capas === 4) {
            neuronsPerLayer.push(initConf.num_n_capa2);
        }
        neuronsPerLayer.push(initConf.num_class);
        const backP = new BackPropagation(
            3,
            [2,5,2],
            values.learning_rate,
            values.max_error,
            values.max_epic_number,
            perceptronState.cpDrawer,
            setPerceptronState
        );

        setPerceptronState({
            ...perceptronState,
            perceptron: backP,
        });
        perceptronState.cpDrawer.drawBarrido(backP);    
        console.log(backP.layers);

    }


    const entrenar = async () => {
       
        setPerceptronErrors({});
        if (!perceptronState.perceptron) {
            setPerceptronErrors({
                "trainedPerceptron": {
                    message: "Debes inicializar la red"
                }
            });
            return;
        }
        await perceptronState.perceptron.fit(perceptronState.x, perceptronState.y);
        const xd = perceptronState.perceptron.meanError.length >= perceptronState.perceptron.iterations;
        setPerceptronState(prevState => {
            return {
                ...prevState,
                entrenado: true,
                limiteAlcanzado: xd
            }
        });
        //perceptronState.cpDrawer.drawBarrido(perceptronState.perceptron);    
         
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
            meanError: []
        });
    }


    if (perceptronState.csvLeido) {
        return (
            <>
                
                <Form onSubmit={handleSubmit(iniciarPesos)} className="">
                    
                    <Controller
                        as={TextField}
                        name="learning_rate"
                        control={control}
                        id="learning_rate"
                        name="learning_rate"
                        label="Nivel de aprendizaje"
                        rules={{
                            required: "Este campo es requerido",
                            validate: value => (parseFloat(value, 10) > 0 && parseFloat(value, 10) <= 1) || "El valor debe ser entre 0 y 1",
                        }}
                        helperText={errors?.learning_rate?.message}
                        error={!!errors?.learning_rate}
                        margin="normal"
                        className="mt-2"
                    />
                    <br />
                    <Controller
                        as={TextField}
                        name="max_epic_number"
                        control={control}
                        id="max_epic_number"
                        name="max_epic_number"
                        label="Número máximo de épocas"
                        rules={{ required: "Este campo es requerido" }}
                        helperText={errors?.max_epic_number?.message}
                        error={!!errors?.max_epic_number}
                        margin="normal"
                    />
                    <br />

                    <Controller
                        as={TextField}
                        name="max_error"
                        control={control}
                        id="max_error"
                        name="max_error"
                        label="Error"
                        rules={{ required: "Este campo es requerido" }}
                        helperText={errors?.max_error?.message}
                        error={!!errors?.max_error}
                        margin="normal"
                    />
                  
                   
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
        );
    } else {
        return (
           <CsvReader/>
        );
    }


}

export default PerceptronConfigs;