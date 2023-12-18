import { useEffect, useState } from "preact/hooks";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ presupuesto, gastos }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;
  
    // Verifica si el presupuesto es mayor que cero antes de calcular el porcentaje
    if (presupuesto > 0) {
      const nuevoPorcentaje = ((totalGastado / presupuesto) * 100).toFixed(2);
      setPorcentaje(parseFloat(nuevoPorcentaje));
    } else {
      setPorcentaje(0); // Establece el porcentaje en 0 si el presupuesto es 0 o negativo
    }
  
    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos, presupuesto]);
  

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-GB", {
      style: "currency",
      currency: "EUR",
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <div>
          <CircularProgressbar
            value={porcentaje}
            text={`${porcentaje}%`}
            styles={buildStyles({
              textSize: "1.5rem",
              pathTransitionDuration: 1.5,
              textColor: "#4B4B4B",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
        <div className="contenido-presupuesto">
          <p>
            <span>Presupuesto: {formatearCantidad(presupuesto)}</span>
          </p>
          <p>
            <span>Disponible: {formatearCantidad(disponible)}</span>
          </p>
          <p>
            <span>Gastado: {formatearCantidad(gastado)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
