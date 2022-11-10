import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../";
import { getMessagesES, localizer } from "../../helpers";

import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  //creo una varible de tipo string, q va a almacenar la vista en la que dejo el user,
  //para eso voy a almacenar en localStorage la variable de estado lastView, si no tiene nada entonces le pongo week
  // getItem -> para tomar del local
  // setItem -> para setear el local

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();
  const {user} = useAuthStore()

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  console.log(user) // >al refrescar la pantalla pierdo el user
  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)
    
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660 ",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };
  const onSelect = (event) => {
    console.log(event)
    setActiveEvent(event);
  };
  const onViewChanged = (view) => {
    // el segundo valor del localstorage es el event, por que ese valor va a ser "dia", "mes" .. etc
    // por que es lo que me devuelve la propiedad onview
    localStorage.setItem("lastView", view);
    setLastView(view);
  };



  useEffect(() => {
    startLoadingEvent(); 
  }, [])
  
  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onSelectEvent={onSelect}
        onView={(view) => onViewChanged(view)}
        onDoubleClickEvent={onDoubleClick}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
