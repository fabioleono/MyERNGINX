import React from 'react' 
import { Route, Switch } from 'react-router-dom'
import Home from '../Pages/home'
import Login from '../Pages/login'
import LoginPublic from '../Pages/loginPublic'

import Header from '../Templates/header'
import Contact from '../Pages/contact'
import Project from '../Pages/project'
import Workshops from '../Pages/workshops'
import Certificador from '../Pages/certificador'
import Public from './public'
import PublicInfo from './publicInfo'
import Protected from "./protected";
import ProtectedInfo from './protectedInfo'
import Info from '../Pages/info'
import Technicals from '../Pages/technicals'
import Error from '../Pages/error' 
import Administrador from '../Pages/administrador'
import NewPass from '../Pages/newPass' 
import ChangePass from '../Pages/changePass';
import TestPage from '../Pages/testPage'
import Accesos from '../Pages/accesos'
import Script from '../Pages/scripts' 

const Routes = () => {
  
  
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
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador|gobierno)/accesos"
          exact
          component={Accesos}
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
        <Protected path="/administrador/familias" component={TestPage} />
        <Protected path="/administrador/modulos" component={TestPage} />
        <Protected path="/administrador/roles" component={TestPage} />
        <Protected path="/administrador/certificadores" component={TestPage} />
        <Protected path="/administrador/ciudades" component={TestPage} />
        <Protected path="/administrador/gubernamentales" component={TestPage} />
        <Protected path="/administrador/importadores" component={TestPage} />
        <Protected path="/administrador/cilindros" component={TestPage} />
        <Protected path="/administrador/reguladores" component={TestPage} />
        <Protected path="/administrador/alarmas" component={TestPage} />

        {/* Rutas Familia Administrador - Certificador */}
        <Protected
          path="/(administrador|certificador)/talleres/tecnicos"
          component={Technicals}
        />
        <Protected
          path="/(administrador|certificador)/talleres"
          component={Workshops}
        />
        <Protected
          path="/(administrador|certificador)/regionales"
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/auditores"
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/certignv"
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/alertas"
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/descargas"
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/reportes"
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/cambios"
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/vin"
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/talleresgnv"
          component={TestPage}
        />
        <Protected
          path="/(administrador|certificador)/auditoriaycontrol"
          component={TestPage}
        />

        {/* Rutas Familia Administrador - Gobierno */}

        {/* Rutas Familia Certificador */}

        {/* Rutas Familia Gobierno */}

        <Protected path="/administrador" component={Administrador} />
        <Protected path="/certificador" component={Certificador} />
        <Protected path="/gobierno" component={TestPage} />

        {/* <Protected path="/certificador/talleres" component={Workshops} /> */}

        {/* <Protected
          path="/administrador/talleres/tecnicos"
          component={Technicals}
        /> */}
        {/* <Protected path="/administrador/talleres" component={Workshops} /> */}

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
