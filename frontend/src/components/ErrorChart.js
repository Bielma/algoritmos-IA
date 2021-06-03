import React,{useContext, useEffect, useState } from "react";
import { Button, TextField } from '@material-ui/core';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { PerceptronContext } from "./PerceptronContext";


const ErrorChart = (props) =>  {
    const {perceptronState} = useContext(PerceptronContext);
    
    let [dataToShow, setDataToShow] = useState([]);
    const [dataSeno, setDataSeno] = useState([]);
    const [dataSenoRuido, setDataSenoRuido] = useState([]);

    

    useEffect(() => {
    setDataSeno(perceptronState.data);        
    // setDataToShow(getHarcodedInfo());
    }, [])

   

    const seno= () => {
      let data = []
      for (let x = 0; x < 100; x++) {
        const y = Math.sin(x)        
        const yRuido = Math.sin(x + Math.floor(Math.random() * (3- 1)))
        data[x] = {          
          x: x, 
          original: y,
          ruido: yRuido,
          corregido: 0
        }  
      }
      return data
    }
   
    
    return <>
       
          
        <ResponsiveContainer>               
          <LineChart 
            //data={perceptronState.perceptron.errorAcumulado} 
            data={dataSeno}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >          
             <Line type="monotone" dataKey="original" stroke="#1976d2" dot={false} />
             <Line type="monotone" dataKey="ruido" stroke="#82ca9d" dot={false} />
             {
               perceptronState.entrenado &&
                <Line type="monotone" dataKey="corregido" stroke="#000000" dot={false} />
             }
             
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="x" interval={3} />
              <YAxis interval="preserveStartEnd" />
              <Tooltip />
              <Legend />
          </LineChart>
        </ResponsiveContainer>
    </>
}

export default ErrorChart;