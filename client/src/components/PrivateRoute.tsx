// import React from 'react'

// interface Props {

// }

// const PrivateRoute = (props: Props) => {
//     return (
//         <div>

//         </div>
//     )
// }

// export default PrivateRoute

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const token = window.localStorage.getItem("token");
  const condition = token ? true : false;

  return condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/signup" />
  );
};
export default PrivateRoute;
