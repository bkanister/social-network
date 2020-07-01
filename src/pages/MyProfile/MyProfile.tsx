import Profile from "../../components/MyProfile/Profile";
import React from "react";
import withAuth from "../../components/AuthenticationPage/withAuth";

const MyProfile = () => {
    return (
           <Profile/>
    )
}

export default withAuth(MyProfile)