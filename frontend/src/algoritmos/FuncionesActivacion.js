
export const sigmoidal = (y) =>{
    const ye = y * -1; 
    return  1/(1+(Math.pow(Math.E, ye)));
}

export const tangente  = (y) =>{
    const ye = y * -1; 
    //return (2/(1+Math.pow(Math.E, (-2*y)))) * (-1)
    return (1-(Math.pow(Math.E, ye))) / (1+(Math.pow(Math.E, ye)))


}


export const relu  = (y) =>{    
    return  y >= 0 ? y : 0
}
