import "./App.css";
import ClientRouter from "./router/router";
import { useContext, useEffect } from "react";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import Contacts from "./components/contacts/Contacts";

function App() {
  const { storeMOBX } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      storeMOBX.checkAuth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (storeMOBX.isLoading) {
    return (
      <div>
        Загрузка...
      </div>
    )
  }

  return (
    <div className="App">
      {storeMOBX.isAuth?(
        <div>
           <h1>{storeMOBX.user.isActivated ? null : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
          <Contacts />
        </div>
      ) : (
        <ClientRouter />
      )}
    </div>
  );
}

export default observer (App);