import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";

const Authentication = props => {
    return (
            <BrowserRouter>
                    <Switch>
                        <Route exact path={'/auth/sign-in'} component={SignIn}/>
                        <Route path={'/auth/sign-up'} component={SignUp}/>
                        <Route path={'/auth/password-reset'} component={PasswordReset}/>
                    </Switch>
            </BrowserRouter>
    )
}

export default Authentication