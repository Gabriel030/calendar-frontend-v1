// el Calendar, tiene una propiedad llamada "components" a esta se le asigna una funcion, q por defecto va a recibir ciertas props
//la prop event, es la que contiene datos como el titulo y el nombre del usuario, nostros en esta funcion pondemos customizar esos componentes

export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title} - </strong>

      <span>{user.name}</span>
    </>
  );
};
