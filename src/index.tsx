import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { store } from "./core/redux/app/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./styles/index.scss";
import "./styles/reset.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
 <Provider store={store}>
  <BrowserRouter>
   <App />
  </BrowserRouter>
 </Provider>
);

serviceWorkerRegistration.register();
