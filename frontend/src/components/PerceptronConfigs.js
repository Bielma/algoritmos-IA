import React,{useContext, useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from 'react-bootstrap';

import { Button, TextField } from '@material-ui/core';
import Perceptron from '../hooks/Perceptron.js';
import { PerceptronContext } from "./PerceptronContext.js";


const PerceptronConfigs = (props) =>  {
    
    const { handleSubmit, register, errors, control } = useForm();
    const {perceptronState, setPerceptronState} = useContext(PerceptronContext);
    const [perceptronErrors, setPerceptronErrors] = useState({});
    
    const x = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ];

    const and =  () =>{
          
        const y =  [0,0,0,1]; //And            
        const w  = [
            3.0318401299999787,
            1.1375179200000014,
            1.9004751600000014
          ];
        
        let x2 = [];
        x2[0] = calcularX2(-5, w);
        x2[1] = calcularX2(5, w);
        console.log("x2: ", x2);
        perceptronState.cpDrawer.clearCanvas();
        perceptronState.cpDrawer.drawAxis();
        x.forEach ((point, index) => {
            perceptronState.cpDrawer.drawPoint(perceptronState.cpDrawer.XC(point[0]), perceptronState.cpDrawer.YC(point[1]), y[index])    
        })       
        perceptronState.cpDrawer.drawLine(-5, x2[0], 5, x2[1], "#0101DF");

      }
      const xor =  () =>{     
       
       const y =  [0,1,1,1]; //Or       
       //const w  = [-0.42110113 , 3 , 0.28623454];  
       const w  = [0.07613212, 0.58551439, 0.97756137]
       let x2 = [];
       x2[0] = calcularX2(-5, w);
       x2[1] = calcularX2(5, w);    
       
       perceptronState.cpDrawer.clearCanvas();
       perceptronState.cpDrawer.drawAxis();
       x.forEach ((point, index) => {
        perceptronState.cpDrawer.drawPoint(perceptronState.cpDrawer.XC(point[0]), perceptronState.cpDrawer.YC(point[1]), y[index])    
        })        
       perceptronState.cpDrawer.drawLine(-5, x2[0],5, x2[1], "#0101DF" );

    }

    const calcularX2 = (x1, w) =>{
           
        return  ((-w[1] *  x1) + w[0] )/ w[2];
    }

  
      
  

    return <>
        
        <Form onSubmit={handleSubmit(and)} className="">                        
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>And</Button>
        </Form>
        
        <Form onSubmit={handleSubmit(xor)} className="">                        
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>Or</Button>
        </Form>

    </>
}

export default PerceptronConfigs;