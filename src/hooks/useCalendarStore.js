import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventToDateEvents } from "../helpers";

import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";


//-------------------------------------------------------------------------//
export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  
//-------------------------------------------------------------------------//
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

//-------------------------------------------------------------------------//
  //una alternativa para los thunks

  const startSavingEvent = async (calendarEvent) => {
    //todo llegar al backend

        try {
          
            if (calendarEvent.id) {
                //estoy actualizando nota
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent , user}));
                return ; 
            } 
            //estoy creando nota
            const {data} = await calendarApi.post("/events", calendarEvent)    
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user}));


        } catch (error) {
          
            console.log(error)
            Swal.fire("Error al guardar", error.response.data.msg, "error")
        }

  
  };

//-------------------------------------------------------------------------//
  const startDeletingEvent = async () => {
    console.log(activeEvent)
      try {
            //estoy eliminando nota
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent());
      
      } catch (error) {
        
          console.log(error)
          Swal.fire("Error al eliminar", error.response.data.msg, "error")
      }
  };

  
//-------------------------------------------------------------------------//
  const startLoadingEvent = async  () => {
      try {
        
        const {data} = await calendarApi.get("/events")
        const events = convertEventToDateEvents(data.eventos)
        dispatch(onLoadEvents(events))
        console.log(events);
      } catch (error) {
        console.log(error)
        console.log("error cargando datos")
      }
  }



  
//-------------------------------------------------------------------------//
  return {
      //* Propiedades
      activeEvent,
      events,
      hasEventSelected: !!activeEvent, // si esto es null, retorna falso,
      //*Metodos
      setActiveEvent,
      startSavingEvent,
      startDeletingEvent,
      startLoadingEvent,
  };
};
