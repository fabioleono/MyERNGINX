import React from 'react' 
import { Route, Switch } from 'react-router-dom'
import Home from '../Pages/home'
import Login from '../Pages/login'
import LoginPublic from '../Pages/loginPublic'
import Users from '../Pages/users'
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



const Routes = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/proyecto" exact component={Project} />
        <Route path="/contacto" exact component={Contact} />
        <Route path="/users" exact component={Users} />
        <PublicInfo path="/loginpublic" exact component={LoginPublic} />
        <Public path="/login" exact component={Login} />
        
        <ProtectedInfo path="/infopublica/:consumer" component={Info} />

          {/* Rutas Familia Certificador */}

        <Protected path="/certificador/talleres/tecnicos" component={Technicals} />
        <Protected path="/certificador/talleres" component={Workshops} />
        <Protected path="/certificador" component={Certificador} />
        
        {/* <Protected path="/certificador"> */}
          {/* Para casos donde el usuario recargue al browser en la ruta base */}
          {/* <Redirect to="/login" /> */}
        {/* </Protected> */}

        {/* Rutas Familia Administrador*/}

        <Protected path="/administrador/talleres/tecnicos" component={Technicals} />
        <Protected path="/administrador/talleres" component={Workshops} />
        <Protected path="/administrador" component={Administrador} />
        
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
