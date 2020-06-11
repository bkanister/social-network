import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignUp from "./SignUp";
import SignInContainer from "./SignInContainer";

const Authentication = props => {
    return (
            <BrowserRouter>
                    <Switch>
                        <Route exact path={'/auth/sign-in'} render={() => <SignInContainer dispatch={props.dispatch}
                                                                                  userEmail={props.userEmail}
                                                                                  userPassword={props.userPassword}/>}/>
                        <Route path={'/auth/sign-up'} render={() => <SignUp dispatch={props.dispatch}/>}/>
                    </Switch>
            </BrowserRouter>
    )
}

export default Authentication