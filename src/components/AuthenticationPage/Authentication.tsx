import React from 'react'
import {Route, Switch} from "react-router-dom";
import SignInContainer from "./SignIn/SignInContainer";
import SignUpContainer from "./SignUp/SignUpContainer";

const Authentication = (props: any) => {
    return (
        <div>
            <Switch>
                <Route path={`/auth/sign-in`} component={SignInContainer}
                />
                <Route path={`/auth/sign-up`} component={SignUpContainer}
                />
            </Switch>
        </div>
    )
}

export default Authentication