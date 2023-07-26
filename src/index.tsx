import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { store } from "./core/redux/app/store";
import { ReturnScrollContext } from "./contextProvider/ReturnScrollContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./styles/index.scss";
import "./styles/reset.scss";
import { ThemeContext } from "./contextProvider/ThemeContext";
import { MuiThemeContext } from "./contextProvider/MuiThemeContext";
import { PwaInstallContext } from "./contextProvider/PwaInstallContext";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
 <Provider store={store}>
  <BrowserRouter>
   <PwaInstallContext>
    <ThemeContext>
     <MuiThemeContext>
      <ReturnScrollContext>
       <App />
      </ReturnScrollContext>
     </MuiThemeContext>
    </ThemeContext>
   </PwaInstallContext>
  </BrowserRouter>
 </Provider>
);

serviceWorkerRegistration.register();
