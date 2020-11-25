import React, { useState } from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Perceptron from '../pages/Perceptron';
import {PerceptronContext} from '../components/PerceptronContext';


function App() { 
  const [perceptronState, setPerceptronState] = useState({
    perceptron : null,
    entrenado: false,
    x : [],
    y : [],    
    cpDrawer: null,
    limiteAlcanzado: false, 
    claseSelect: "1",
    iniciado: false,
    meanError: [],
    clases: [{
      label: "clase1",
      color: "#0101DF",
      value: 1
    },
    {
      label: "clase2", 
      color: "#DF0101",
      value: 2
  }
  
  ]

  });
 
  return (
    <div className="App">
      <PerceptronContext.Provider value = {{
          perceptronState, 
          setPerceptronState
      }}>
        <Header />

        <Perceptron />

        <Footer />
      </PerceptronContext.Provider>
    </div>
  );
}

export default App;
