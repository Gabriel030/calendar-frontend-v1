import { parseISO } from "date-fns";

//esta funciona lo que hace es transformar la fecha que viene en formato string

//"1970-01-01T00:01:40.000Z"

// a un numero que podamos serializar 

export const convertEventToDateEvents = (events = []) => {

    return events.map(event => {
        event.start = parseISO(event.start)
        event.end = parseISO(event.end)

        return event; 
    })

}