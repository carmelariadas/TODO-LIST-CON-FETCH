import React, { useEffect, useState } from "react";



const Board = () => {


    const[tareas, setTareas] = useState([]);
    const[inputValue, setInputValue]=useState("")

    useEffect(
        () =>
        fetch('https://assets.breatheco.de/apis/fake/todos/user/carmen2', {
                method: 'GET'
            })
                .then(response => response.json())
                .then (result => setTareas(result))
    , [])
    



    const controlarCambio = (e) =>{
        setInputValue(e.target.value)
    }





    const controlarEnvio = (e) =>{
        e.preventDefault();

        const tareaNueva = {
            label: inputValue,
            done: false
        }

        setTareas([tareaNueva, ...tareas])

        
        fetch('https://assets.breatheco.de/apis/fake/todos/user/carmen2', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify([tareaNueva, ...tareas]),
            })
                .then(response => response.json())
                .then (result => console.log("Se ha añadido una tarea"))
                .catch((error) => {
                    console.error('Error:', error);
                });


        

    }


    const eliminarTarea = (index) => {
        const tareasActualizadas = tareas.filter((tarea, i) => index!=i)
        setTareas(tareasActualizadas)


        fetch('https://assets.breatheco.de/apis/fake/todos/user/carmen2', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(tareasActualizadas),
            })
                .then(response => response.json())
                .then (result => console.log("Se ha eliminado una tarea"))
                .catch((error) => {
                    console.error('Error:', error);
                });
    }


    return (
        <div className="containerBoard">
            <h1>todos</h1>
            <form onSubmit={controlarEnvio}>
                <input onChange={controlarCambio} type="text" placeholder="Escribe una tarea..." />
            </form>
                <p className={tareas=="" ? "" : "d-none"}>No hay tareas, añadir tareas</p>
                <div>
                    {
                        tareas.map((tarea, i)=>
                            
                        <div className="containerTarea">
                    
                            <p className="parrafoTarea">{tarea.label}</p>
                            
                            <div className="iconTarea"   onClick={()=>eliminarTarea(i)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                        </div>
                            
                        )

                    }
                </div>
        </div>
    );
}



export default Board;