import React from "react";
import Gasto from "./Gasto";

function ListadoGastos({ gastos, setgastoEditar, eliminarGasto, filtros, gastosFiltrados }) {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length ? "Gastos" : "No hay gastos aún"}</h2>
      {
        filtros ? (
          gastosFiltrados.map((gasto) => (
            <Gasto key={gasto.id} gasto={gasto} setgastoEditar={setgastoEditar} eliminarGasto={eliminarGasto} />
          ))
        ) : (
          gastos.map((gasto) => (
            <Gasto key={gasto.id} gasto={gasto} setgastoEditar={setgastoEditar} eliminarGasto={eliminarGasto} />
          ))
        )
      }
    </div>
  );
}

export default ListadoGastos;
