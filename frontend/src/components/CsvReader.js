import React, { useContext } from 'react';
import { PerceptronContext } from "./PerceptronContext.js";
import CSVReader from 'react-csv-reader'

const CsvReader = (props) =>{
  const {perceptronState, setPerceptronState} = useContext(PerceptronContext);
  let inputs = [];
  let outputs = [];
  let uwu = [];
  const addInputs = (data) =>{
    
    
    for(let i = 1; i<data.length;i++){      
        
        for(var j = 0; j<data[0].length;j++){
          uwu.push(parseFloat(data[i][j]));      
        }                
        inputs.push(uwu);   
        uwu = [];
          
        
    }
    console.log(inputs);
  }

  const agregarPuntos = (data) => {
    console.log(data);
    for(let i = 1; i<data.length;i++){                            
      outputs.push(parseFloat(data[i]));       
    }
    console.log(outputs);
    inputs.forEach ((point, index) => {           
        perceptronState.cpDrawer.drawPoint(perceptronState.cpDrawer.XC(point[0]), 
          perceptronState.cpDrawer.YC(point[1]), outputs[index] )                               
   })       

   setPerceptronState({
     ...perceptronState,
     x: inputs, 
     y: outputs,
     csvLeido :true
   })

  }

    return <>    
       <span className="error">{"Inputs File"}</span>
      <CSVReader onFileLoaded={(data, fileInfo) =>         
        addInputs(data)
      } />
      <span className="error">{"Outputs File"}</span>
      <CSVReader onFileLoaded={(data, fileInfo) =>         
        agregarPuntos(data)
      } />
    </>
    
  
}
export default CsvReader;