import {useState, useEffect} from 'react'

function Filtros({filtros , setfiltros}) {
    
  return (
    <div className='filtros sombra contenedor'>

    <form action="">
        <div className='campo'>
            <label htmlFor="">Filtrar gastos</label>
            <select value={filtros} onChange={e => setfiltros(e.target.value)} name="" id="">
            <option value="">--Seleccione--</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="GastosVarios">Gastos varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
            </select>
        </div>
    </form>
    </div>
  )
}

export default Filtros