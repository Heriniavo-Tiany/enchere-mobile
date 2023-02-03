import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import "./assets/css/nucleo-icons.css";
import "./assets/scss/blk-design-system-react.scss";
import "./assets/demo/demo.css";


/* Theme variables */
import './theme/variables.css';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Recharger from "./pages/Recharger";
import Upload from "./pages/Upload";
import ListEnchere from './pages/ListEnchere';
import NewEnchere from './pages/NewEnchere';
import NewProduit from './components/NewProduit';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            {/*<Route path="/" exact={true}>
              <Redirect to="/page/Inbox" />
            </Route>*/}
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>

            <Route exact path="/home">
              <Home />
            </Route>

            <Route exact path="/signup">
              <Signup />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/liste">
              <ListEnchere />
            </Route>

            <Route exact path="/produit/:idcategorie">
              <NewProduit />
            </Route>

            <Route exact path="/new/1">
              <NewEnchere />
            </Route>

            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

            <Route
                path="/recharger"
                render={(props) => <Recharger/>}
            />

            <Route
                path="/upload"
                render={(props) => <Upload/>}
            />


          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
