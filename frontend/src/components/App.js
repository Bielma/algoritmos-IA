import React, { useState } from 'react';
import '../App.css';
import Perceptron from '../hooks/Perceptron.js';
//import usePerceptron from '../hoocks/usePerceptron';
//import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
function App() { 

  const [salida, setSalida ]= useState("");
  const [perceptron, setPerceptron] = useState(null);
  const [entrenado, setEntrenado] = useState(false);
  const iniciarPesos = () =>{
    setEntrenado(false);
     setPerceptron( new Perceptron(4, 0.01, 1000));
  }
  const entrenar = () =>{
    setEntrenado(false);
    perceptron.fit();
    setEntrenado(true);
    console.log(perceptron.w);
  }
  const probar = () =>{

    const x = [1, 0, 1];
    const xd = perceptron.predict(x);
    console.log("Salida perceptron :", xd);
    setSalida(xd);
    
  }
  
 
  return (
    <div className="App">
      <header className="App-header">        
        <p>Perceptrón </p>

        <input type="submit" value="Iniciar" onClick  = {iniciarPesos}/>
        
        <input type="submit" value="Entenar" onClick  = {entrenar}/>

        <input type="submit" value="Probar" onClick  = {probar}/>
        <a >{salida}</a>

     
      </header>
    </div>
  );
}

export default App;
