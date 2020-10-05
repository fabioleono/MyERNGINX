import React from 'react' 
import { Route, Switch } from 'react-router-dom'
import Home from '../Pages/home'
import Login from '../Pages/login'
import LoginPublic from '../Pages/loginPublic'
import Users from '../Pages/users'
import Header from '../Templates/header'
import Contact from '../Pages/contact'
import Project from '../Pages/project'
import Protected from './protected'
import Workshops from '../Pages/workshops'
import CertiGNV from '../Pages/certiGNV'
import Declared from './declared'
import DeclaredPublic from './declaredPublic'
import ProtectedPublic from './protectedPublic'
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
        <DeclaredPublic path="/LoginPublic" component={LoginPublic} />
        <Declared path="/Login" component={Login} />
        <ProtectedPublic path="/Info" component={Info} />
        <Protected path="/CertiGNV" component={CertiGNV} />
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
