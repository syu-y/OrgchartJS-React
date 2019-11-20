import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div></div>;
  }

  return <div>ようこそ {user.name} さん</div>;

};

export default Profile;
