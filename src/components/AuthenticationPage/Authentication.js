import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignInContainer from "./SignIn/SignInContainer";
import SignUpContainer from "./SignUp/SignUpContainer";

const Authentication = props => {
    return (
            <BrowserRouter>
                    <Switch>
                        <Route exact path={'/auth/sign-in'} render={() => <SignInContainer dispatch={props.dispatch}
                                                                                  userEmail={props.userEmail}
                                                                                  userPassword={props.userPassword}/>}/>
                        <Route path={'/auth/sign-up'} render={() => <SignUpContainer dispatch={props.dispatch}
                                                                                     userName={props.userName}
                                                                                     userEmail={props.userEmail}
                                                                                     userPassword={props.userPassword}
                        />}/>
                    </Switch>
            </BrowserRouter>
    )
}

export default Authentication