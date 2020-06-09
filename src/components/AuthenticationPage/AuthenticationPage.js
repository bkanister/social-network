import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";

const Authentication = props => {
    return (
            <BrowserRouter>
                    <Switch>
                        <Route exact path={'/auth/sign-in'} render={() => <SignIn dispatch={props.dispatch}
                                                                                  userName={props.userName}
                                                                                  userEmail={props.userEmail}
                                                                                  userPassword={props.userPassword}/>}/>
                        <Route path={'/auth/sign-up'} render={() => <SignUp dispatch={props.dispatch}/>}/>
                        <Route path={'/auth/password-reset'} component={PasswordReset}/>
                    </Switch>
            </BrowserRouter>
    )
}

export default Authentication