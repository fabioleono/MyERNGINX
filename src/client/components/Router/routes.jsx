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
        <Route path="/proyecto" exact component={Project} />
        <Route path="/contacto" exact component={Contact} />
        <Route path="/users" exact component={Users} /> 
        <PublicInfo path="/loginpublic" exact component={LoginPublic} />
        <Public path="/login" exact component={Login} />
        <ProtectedInfo path="/info/:consumer" component={Info} />
        <Protected path="/certignv/:user" component={CertiGNV} />
        <Protected path="/tallergnv" component={Workshops} />
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
