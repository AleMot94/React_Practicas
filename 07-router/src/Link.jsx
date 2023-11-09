import { EVENT } from "./const";

// funcion para navegar entre las paginas
// href es la url a la que queremos navegar
function navigate(href) {
  // window.history cambiamos la url de la pag, y con pushState no recarga la pag
  window.history.pushState({}, "", href); // 1° parametro se le pueden pasar dato, 2° no se usa, 3° va la url
  // creamos un evento personalizado, le asignamos un nombre al evento
  const navigationEvent = new Event(EVENT.PUSHSTATE);
  // enviamos el evento personalisado al navegador
  window.dispatchEvent(navigationEvent);
}

// Este seria el Link de react router dom
// la navegacion se hacle con el elemento ancord
// hacerlo con los botones esta re mal, por que no tiene las opciones de las pestañas y ventanas en el navegador
export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    // de esta forma configuramos los comandos de telado para los <a/>
    // como lo hace el Link de react router dom
    const isMainEvent = event.button == 0; // primary click (izq)
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey; // guardamos si se oprimieron una de estas letras
    const isManageableEvent = target == undefined || target == "_self";

    if (isMainEvent && isModifiedEvent && !isManageableEvent) {
      event.preventDefault();
      navigate(to);
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
