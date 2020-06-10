import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Authentication = props => {
    return (
            <BrowserRouter>
                    <Switch>
                        <Route exact path={'/auth/sign-in'} render={() => <SignIn dispatch={props.dispatch}
                                                                                  userName={props.userName}
                                                                                  userEmail={props.userEmail}
                                                                                  userPassword={props.userPassword}/>}/>
                        <Route path={'/auth/sign-up'} render={() => <SignUp dispatch={props.dispatch}/>}/>
                    </Switch>
            </BrowserRouter>
    )
}

export default Authentication