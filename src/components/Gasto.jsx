import { formatearFecha } from "../helpers";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import IconoAhorro from "../img/icono_ahorro.svg";
import Iconocasa from "../img/icono_casa.svg";
import Iconocomida from "../img/icono_comida.svg";
import Iconogastos from "../img/icono_gastos.svg";
import Iconoocio from "../img/icono_ocio.svg";
import Iconosalud from "../img/icono_salud.svg";
import Iconosubscripciones from "../img/icono_suscripciones.svg";

const diccionarioIconos = {
  Ahorro: IconoAhorro,
  Comida: Iconocomida,
  Casa: Iconocasa,
  GastosVarios: Iconogastos,
  Ocio: Iconoocio,
  Salud: Iconosalud,
  Suscripciones: Iconosubscripciones
};

function Gasto({ gasto , setgastoEditar , eliminarGasto }) {
  const { categoria, nombre, cantidad, id, fecha } = gasto;

  // Verificar si fecha está definida antes de intentar formatearla
  const fechaFormateada = fecha ? formatearFecha(fecha) : "";

  const LeadingActionsComponent = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setgastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const TrailingActionsComponent = () => (
    <TrailingActions>
      <SwipeAction onClick={() => eliminarGasto(id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableListItem
      key={id}
      leadingActions={<LeadingActionsComponent />}
      trailingActions={<TrailingActionsComponent />}
    >
      <div className="gasto sombra ">
        <div className="contenido-gasto">
          <img src={diccionarioIconos[categoria]} alt="icono gasto" />
          <div className="descripcion-gasto">
            <p className="caterogia">{categoria}</p>
            <p className="nombre-gasto">{nombre}</p>
            <p className="fecha-gasto">
              Agregado el : <span>{fechaFormateada}</span>
            </p>
          </div>
        </div>
        <div className="cantidad-gasto">${cantidad}</div>
      </div>
    </SwipeableListItem>
  );
}

export default Gasto;
