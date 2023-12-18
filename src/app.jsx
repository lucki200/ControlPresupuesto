import { useState, useEffect } from "preact/hooks";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";


export function App() {
  const [presupuesto, setpresupuesto] = useState( Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidad, setisValidad] = useState(false);
  const [modal, setmodal] = useState(false);
  const [animarModal, setanimarModal] = useState(false);
  const [gastos, setgastos] = useState(
    JSON.parse(localStorage.getItem('gastos')) || []
  );

  const [filtros, setfiltros] = useState('')
  const [gastosFiltrados, setgastosFiltrados] = useState([])
  


  const [gastoEditar, setgastoEditar] = useState({});

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setmodal(true);
      setTimeout(() => {
        setanimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  const handleNuevoGasto = () => {
    setmodal(true);
    setgastoEditar({});
    setTimeout(() => {
      setanimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {

    if(gasto.id) {
      const guardarGastosActualiados = gastos.map(gastoState => gastoState.id  ===
        gasto.id ? gasto : gastoState)
        setgastos(guardarGastosActualiados)
        setgastoEditar({})
   
    } else{
      gasto.id = generarId();
      gasto.fecha  = Date.now();
      setgastos([...gastos , gasto])
    }
    gasto.fecha = Date.now();
    const nuevoGasto = {
      ...gasto,
      id: generarId(),
    };

    setgastos([...gastos, nuevoGasto]);

    setanimarModal(false);

    setTimeout(() => {
      setmodal(false);
    }, 500);
  };

  const eliminarGasto =  (id) => {
    const gastosActualizados  = gastos.filter( gasto => gasto.id !== id);
    setgastos(gastosActualizados)
  }

  useEffect(() => {
    localStorage.setItem('presupuesto' , presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    const gastosFromLs = JSON.parse(localStorage.getItem('gastos')) || [];
    setGastos(gastosFromLs);
  }, []);
  useEffect(() => {
   
     if(filtros) {
      //filtrar gastos por categoria
      const gastosFILTRADOS = gastos.filter( gasto => gasto.categoria === filtros)
      setgastosFiltrados(gastosFILTRADOS)
     }
    
  }, [filtros])
  

  useEffect(() => {
    const presupuestoToLs = Number(localStorage.getItem('presupuesto')) ?? 0;


    if (presupuestoToLs > 0) {
      setisValidad(true)
    }
  }, [])
  
  

  return (
    <>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setpresupuesto={setpresupuesto}
        isValidad={isValidad}
        setisValidad={setisValidad}
      />
      {isValidad && (
        <>
          <main>
            <Filtros filtros={filtros } setfiltros={setfiltros} />
            <ListadoGastos gastos={gastos} setgastoEditar={setgastoEditar} eliminarGasto={eliminarGasto} filtros={filtros} gastosFiltrados={gastosFiltrados} />
          </main>
          <div className="nuevo-gasto">
            <img
              onClick={handleNuevoGasto}
              src={IconoNuevoGasto}
              alt="icono Nuevo gasto"
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          gastoEditar={gastoEditar}
          setmodal={setmodal}
          animarModal={animarModal}
          setanimarModal={setanimarModal}
          guardarGasto={guardarGasto}
          setgastoEditar={setgastoEditar}
        />
      )}
    </>
  );
}
