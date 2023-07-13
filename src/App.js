import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Events from "./Pages/Events/Events";
import MyEvents from "./Pages/Events/MyEvents";
import Home from "./Pages/Home";
import Bands from "./Pages/Bands";
import { store, persistor } from './Redux/store';
import Tickets from "./Pages/Tickets";


function App() {
  return (

    //Provider que permite a utilização das variáveis globais nos componentes filhos
    <Provider store={store}>   
     {/* PersistGate permite que as variáveis globais sejam armazenadas em cache */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Routes é utilizador para definir as diferentes "rotas" da nossa app na navigation bar e seus respectivos destinos */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Events/events" element={<Events />} />
          <Route path="Events/myevents" element={<MyEvents />} />
          <Route path="/bands" element={<Bands />} />
          <Route path="/tickets" element={<Tickets />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
