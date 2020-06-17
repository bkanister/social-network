import React from 'react'
import {Route, Switch} from "react-router-dom";
import SignInContainer from "./SignIn/SignInContainer";
import SignUpContainer from "./SignUp/SignUpContainer";

const Authentication = props => {
    return (
        <div>
            <Switch>
                <Route path={`/auth/sign-in`} render={() => <SignInContainer dispatch={props.dispatch}
                                                                              userEmail={props.userEmail}
                                                                              userPassword={props.userPassword}
                                                                              userID={props.userID}/>}
                />
                <Route path={`/auth/sign-up`} render={() => <SignUpContainer dispatch={props.dispatch}
                                                                              userName={props.userName}
                                                                              userEmail={props.userEmail}
                                                                              userPassword={props.userPassword}
                                                                              userID={props.userID}/>}
                />
            </Switch>
        </div>
    )
}

export default Authentication