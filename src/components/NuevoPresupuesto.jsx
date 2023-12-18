import { useState } from "preact/hooks";
import React from "react";
import Mensaje from "./Mensaje";



function NuevoPresupuesto({ presupuesto, setpresupuesto ,setisValidad }) {

    const [mensaje, setmensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if(!(presupuesto) || (presupuesto) < 0) {
            setmensaje('No es un presupuesto valido')
            
            return
        } 
        setmensaje('')
        setisValidad(true)
    }
  return (
    <>
      <h2 className="contenedor-presupuesto  contenedor sombra">
        Definir Presupuesto 
      </h2>
      <form onSubmit={handlePresupuesto}  className="formulario">
        <div className="campo">
          <label className=" " htmlFor="">
            Definir Presupuesto :
          </label>
          <input
            className="nuevo-presupuesto "
            type="number"
            placeholder="Añade tu presupuesto"
            value={presupuesto}
            onChange={(e) => setpresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </>
  );
}

export default NuevoPresupuesto;
