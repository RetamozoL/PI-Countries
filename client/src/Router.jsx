import React from "react";
import { Route, Switch} from "react-router-dom";
import { Home, LandingPage } from "./views"
import Detail from "./views/Detail"
import Formulario from "./views/Formulario"



function Routes(){
    return(
        <Switch>
            <Route 
                path="/"
                exact
                render={()=> <LandingPage/>}
            />
            <Route 
                path="/home"
                render={() => <Home />}
            />
            <Route 
                path="/detail/:id"
                render={() => <Detail />}
            />
            <Route 
                path="/crear"
                render={() => <Formulario /> }
            /> 
        </Switch>
    ) 
}
export default Routes;