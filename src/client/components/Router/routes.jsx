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
import CertiGNV from '../Pages/certiGNV'
import Public from './public'
import PublicInfo from './publicInfo'
import Protected from "./protected";
import ProtectedInfo from './protectedInfo'
import Info from '../Pages/info'



const Routes = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Proyecto" component={Project} />
        <Route path="/Contacto" component={Contact} />
        <Route path="/Users" component={Users} /> 
        <PublicInfo path="/LoginPublic" component={LoginPublic} />
        <Public path="/Login" component={Login} />
        <ProtectedInfo path="/Info/:consumer" component={Info} />
        <Protected path="/CertiGNV/:user" component={CertiGNV} />
        <Protected path="/TallerGNV" component={Workshops} />
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
