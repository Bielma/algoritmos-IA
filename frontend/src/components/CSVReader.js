import React, { useContext } from 'react';
import { PerceptronContext } from "./PerceptronContext.js";
import CSVReader from 'react-csv-reader'

const CsvReader = (props) =>{
  const {perceptronState, setPerceptronState} = useContext(PerceptronContext);
  let inputs = [];
  let outputs = [];

  const agregarPuntos = (data) => {
        
    data.forEach ((point, index) => {
      if(index !== 0){               
       /* perceptronState.cpDrawer.drawPoint(perceptronState.cpDrawer.XC(parseFloat(point[0])), 
          perceptronState.cpDrawer.YC(parseFloat(point[1])), parseFloat(point[2]) )    */
        inputs.push([parseFloat(point[0]), parseFloat(point[1])])
       // outputs.push(parseFloat(point[2]))
        //outputs.push(target)
      }
      
   })          

  

  }

  const agregarOutputs = (data) =>{


    data.forEach ((point, index) => {
      
      if(index !== 0){
          perceptronState.cpDrawer.drawPoint(
            perceptronState.cpDrawer.XC(parseFloat(inputs[index-1][0])), 
            perceptronState.cpDrawer.YC(parseFloat(inputs[index-1][1])),
            parseInt(point))
             


                  
            let value = [];
            for (let i = 0; i <2; i++) {
                value[i] = (i == parseInt(point)) ? 1 : 0;
            }
      
            //clase 1/2
          //value[i] = (i == clase - 1) ? 1 : 0;
      
        outputs.push(value)
        
      }
      
   })          



    setPerceptronState({
      ...perceptronState,
      x: inputs, 
      y: outputs,
      csvLeido :true
    })
  }
    return <>
      <a>Inputs</a>
      <CSVReader onFileLoaded={(data, fileInfo) =>         
        agregarPuntos(data)
      } />
      <a>Outputs</a>
      <CSVReader onFileLoaded={(data, fileInfo) =>         
        agregarOutputs(data)
      } />
    </>
    
  
}
export default CsvReader;