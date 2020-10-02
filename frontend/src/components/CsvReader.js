import React, { useContext } from 'react';
import { PerceptronContext } from "./PerceptronContext.js";
import CSVReader from 'react-csv-reader'

const CsvReader = (props) =>{
  const {perceptronState, setPerceptronState} = useContext(PerceptronContext);
  const agregarPuntos = (data) => {
    console.log(data);
    let inputs = [];
    let outputs = [];
    data.forEach ((point, index) => {
      if(index !== 0){
        /*let target = 0;
        if(point[4] === 'Setosa'){
          target = 1;          
        }*/
        perceptronState.cpDrawer.drawPoint(perceptronState.cpDrawer.XC(parseFloat(point[0])), 
          perceptronState.cpDrawer.YC(parseFloat(point[1])), parseFloat(point[2]) )    
        inputs.push([parseFloat(point[0]), parseFloat(point[1])])
        outputs.push(parseFloat(point[2]))
        //outputs.push(target)
      }
      
   })          

   setPerceptronState({
     ...perceptronState,
     x: inputs, 
     y:outputs,
     csvLeido :true
   })

  }

    return <>
      <CSVReader onFileLoaded={(data, fileInfo) =>         
        agregarPuntos(data)
      } />
    </>
    
  
}
export default CsvReader;