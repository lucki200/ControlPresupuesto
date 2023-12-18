import React from "react";
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";


function Header({ presupuesto, setpresupuesto, isValidad, setisValidad , gastos }) {
  return (
    <header>
      <h1 className="bg-blue-700 text-white text-center text-bold text-6xl rounded-none mt-3 mb-3 p-4 py-10">
        Planificador de gastos
      </h1>
        {isValidad ? (
            <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} />
        ) : (
            <NuevoPresupuesto
        presupuesto={presupuesto}
        setpresupuesto={setpresupuesto}
        setisValidad={setisValidad}
      />
        )}
      
    </header>
  );
}

export default Header;
