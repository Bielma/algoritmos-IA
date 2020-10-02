import React,{useContext, useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from 'react-bootstrap';
import { Button, TextField } from '@material-ui/core';
import Perceptron from '../algoritmos/Perceptron.js';
import { PerceptronContext } from "./PerceptronContext.js";
import CsvReader from './CsvReader.js';




const PerceptronConfigs = (props) =>  {
        
    //const [csvLeido, setCsvLeido] = useState(false);    
    const { handleSubmit, register, errors, control } = useForm();
    const {perceptronState, setPerceptronState} = useContext(PerceptronContext);
    const [perceptronErrors, setPerceptronErrors] = useState({});
    const sizeEjes = 10;
    const iniciarPesos = async (values) =>{
        console.log(values);
        setPerceptronErrors({});
        if (!perceptronState?.x?.length) {
            setPerceptronErrors({
                trainingSet: {
                    message: "Agregue datos de entrenamiento"
                }
            });
            return;
        }
        const perceptron = new Perceptron(
            perceptronState.x[0].length, 
            values.learning_rate, 
            values.max_epic_number, 
            perceptronState.cpDrawer, 
            sizeEjes);
        setPerceptronState( {
            ...perceptronState,
            perceptron,
        
        });       
        const x2 = []; 
        x2[0] = perceptron.calcularX2(-sizeEjes);
        x2[1] = perceptron.calcularX2(sizeEjes);
        console.log("x2: ", x2);
        perceptronState.cpDrawer.drawLine(-sizeEjes, x2[0], sizeEjes, x2[1], "#0101DF" );

      }
      const entrenar = async () =>{     
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
        console.log("limite; ",xd);
        setPerceptronState( {
            ...perceptronState,
            entrenado: true,
            limiteAlcanzado: xd
        });           
        console.log(perceptronState.perceptron.w);
    }

    const reiniciar = () =>{
        perceptronState.cpDrawer.clearCanvas();
        perceptronState.cpDrawer.drawAxis();
        setPerceptronState( {
            ...perceptronState,
            perceptron : null,
            entrenado: false,
            x : [],
            y : [],   
            csvLeido: false                                 
        });           
    }
      
    return <>
        {  
            !perceptronState.csvLeido &&
                <>                   
                    <CsvReader/>
                </>
        }


        {

        perceptronState.csvLeido &&
            <div>
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
                    validate: value => (parseFloat(value, 10) > 0 && parseFloat(value, 10) <= 1)  || "El valor debe ser entre 0 y 1",
                }}
                helperText={errors?.learning_rate?.message}
                error={!!errors?.learning_rate}
                defaultValue = {0.01}
                margin="normal"
                fullWidth
            />
            <Controller
                defaultValue ={1000}
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
                fullWidth
            />

            {
                perceptronErrors.trainingSet &&
                <span className="error">{perceptronErrors.trainingSet.message}</span>
            }

            {
                perceptronErrors.trainedPerceptron &&
                <span className="error">{perceptronErrors.trainedPerceptron.message}</span>
            }
            
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>  Inicializar </Button>
            
        </Form>
        <Form onSubmit={handleSubmit(entrenar)} className="">                        
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>Entrenar</Button>
        </Form>
        
        <Form onSubmit={handleSubmit(reiniciar)} className="">                        
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>Reiniciar</Button>
        </Form>
        </div>
    }
    </>
}

export default PerceptronConfigs;