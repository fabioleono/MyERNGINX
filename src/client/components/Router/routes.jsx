import React from 'react' 
import { Route, Switch } from 'react-router-dom'
import Home from '../Pages/home'
import Header from "../Templates/header";
import Contact from "../Pages/contact";
import Project from "../Pages/project";
import Error from "../Pages/error"; 
import Login from '../Pages/login'
import Public from "./public";
import Protected from "./protected";
import NewPass from "../Pages/newPass"; 
import ChangePass from "../Pages/changePass";
import Certificador from "../Pages/certificador";
import Administrador from "../Pages/administrador";

import Rol from "../Pages/rolComponent";

import LoginPublic from '../Pages/loginPublic'
import PublicInfo from "./publicInfo";
import ProtectedInfo from "./protectedInfo";

import Info from '../Pages/info'
// import Technicals from '../Pages/technicals'
import TestPage from '../Pages/testPage'
//import Accesos from '../Pages/accesos'
import Script from '../Pages/scripts' 
// import Workshops from "../Pages/workshops";

const Routes = () => {
  // console.log('CARGO ENRUTADOR');
  
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/proyecto" exact component={Project} />
        <Route path="/contacto" exact component={Contact} />

        {/* Rutas Autenticacion */}
        <PublicInfo path="/loginpublic" exact component={LoginPublic} />
        <Public path="/login/password" exact component={NewPass} />
        <Public path="/login" exact component={Login} />

        {/* Rutas Familia General */}
        <Protected
          path="/(administrador|certificador|gobierno)/accesos/:userId"
          exact
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador|gobierno)/accesos"
          exact
          component={Rol}
        />

        <Protected
          path="/(administrador|certificador|gobierno)/password"
          exact
          component={ChangePass}
        />
        <Protected
          path="/(administrador|certificador|gobierno)/consultas"
          exact
          component={TestPage}
        />

        {/* Rutas Familia Administrador */}
        <Protected path="/administrador/scripts" component={Script} />

        <Protected path="/administrador/familias/:id" exact component={Rol} />
        <Protected path="/administrador/familias" exact component={Rol} />
        <Protected path="/administrador/modulos/:id" exact component={Rol} />
        <Protected path="/administrador/modulos" exact component={Rol} />
        <Protected path="/administrador/roles/:id" exact component={Rol} />
        <Protected path="/administrador/roles" exact component={Rol} />
        <Protected path="/administrador/certificadores/:id" exact component={Rol} />
        <Protected path="/administrador/certificadores" exact component={Rol} />
        <Protected path="/administrador/gubernamentales/:id" exact component={Rol} />
        <Protected path="/administrador/gubernamentales" exact component={Rol} />
        <Protected path="/administrador/importadores/:id" exact component={Rol} />
        <Protected path="/administrador/importadores" exact component={Rol} />
        <Protected path="/administrador/ciudades/:id" exact component={Rol} />
        <Protected path="/administrador/ciudades" exact component={Rol} />
        <Protected path="/administrador/cilindros/:id" exact component={Rol} />
        <Protected path="/administrador/cilindros" exact component={Rol} />
        <Protected path="/administrador/reguladores/:id" exact component={Rol} />
        <Protected path="/administrador/reguladores" exact component={Rol} />
        <Protected path="/administrador/alarmas/:id" exact component={Rol} />
        <Protected path="/administrador/alarmas" exact component={Rol} />

        {/* Rutas Familia Administrador - Certificador */}
        <Protected
          path="/(administrador|certificador)/talleres/tecnicos/:tecnicoId"
          exact
          component={Rol}
        />
        <Protected
          path="/(administrador|certificador)/talleres/tecnicos"
          exact
          component={Rol}
        />
        <Protected
          path="/(administrador|certificador)/talleres/:tallerId"
          exact
          component={Rol}
        />
        <Protected
          path="/(administrador|certificador)/talleres"
          exact
          component={Rol}
        />
        <Protected
          path="/(administrador|certificador)/regionales"
          exact
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/auditores"
          exact
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/certignv"
          exact
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/alertas"
          exact
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/descargas"
          exact
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/reportes"
          exact
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/cambios"
          exact
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/vin"
          exact
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/talleresgnv"
          exact
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/auditoriaycontrol"
          exact
          component={TestPage}
        />

        {/* Rutas Familia Administrador - Gobierno */}

        {/* Rutas Familia Certificador */}

        {/* Rutas Familia Gobierno */}

        <Protected path="/administrador" component={Administrador} />
        <Protected path="/certificador" component={Certificador} />
        <Protected path="/gobierno" component={TestPage} />

        {/* Rutas InfoPublica */}
        <ProtectedInfo path="/infopublica/:consumer" component={Info} />

        <Route path="/error" exact component={Error} />
        <Route
          component={() => (
            <div>
              <h3>Error 404 NOT FOUND</h3>
            </div>
          )}
        />
      </Switch>
    </div>
  );
}
export default Routes
