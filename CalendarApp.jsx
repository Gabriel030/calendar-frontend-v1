import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./src/router/AppRouter";
import { store } from "./src/store/store";

export const CalendarApp = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </>
  );
};
