import { useState, useEffect } from "preact/hooks";
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";



function Modal({
  setmodal,
  animarModal,
  setanimarModal,
  guardarGasto,
  gastoEditar,
  setgastoEditar
}) {
  const ocultarmodal = () => {
    setmodal(false);
    setanimarModal(false);
    setgastoEditar({})

    setTimeout(() => {
      setmodal(false);
    }, 500);
  };
  const [nombre, setnombre] = useState("");
  const [cantidad, setcantidad] = useState("");
  const [categoria, setcategoria] = useState("");
  const [mensaje, setmensaje] = useState("");
  const [id, setid] = useState("");
  const [fecha, setfecha] = useState('');

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setnombre(gastoEditar.nombre)
      setcantidad(gastoEditar.cantidad)
      setcategoria(gastoEditar.categoria)
      setid(gastoEditar.id)
      setfecha(gastoEditar.fecha)
    }
  
    
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      setmensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setmensaje("");
      }, 500);
      return;
    }

    const nuevoGasto = {
      nombre: nombre,
      cantidad: cantidad,
      categoria: categoria,
      // Puedes agregar más propiedades según lo que necesites
    };

    guardarGasto(nuevoGasto , id);

    // Cerrar el modal después de guardar el gasto
    ocultarmodal();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img onClick={ocultarmodal} src={CerrarBtn} alt="cerrar" />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.nombre ? 'editar gasto' : 'Nuevo gasto'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre gasto</label>
          <input
            type="text"
            placeholder="Añade el nombre del gasto"
            id="nombre"
            value={nombre}
            onChange={(e) => setnombre(e.target.value)} // modificamos el setnombre y le ponemos e.target.value para que tome lo q el usuario escriba!
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            placeholder="Añade la cantidad desea para el gasto"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setcantidad(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Seleccione</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setcategoria(e.target.value)}
          >
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
        <input type="submit" value={gastoEditar.nombre ? 'guardar gasto' : 'Añadir gasto'} />
      </form>
    </div>
  );
}

export default Modal;
