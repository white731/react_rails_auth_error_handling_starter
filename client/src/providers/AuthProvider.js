import React from "react";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const handleRegister = async (user, history, setLoader) => {
    try {
      setLoading(true);
      setAuthError(null);
      // console.log("before axios");
      // let r = await Axios.get("https://reqres.in/api/users?delay=3");
      // console.log("after axios");
      let res = await Axios.post("/api/auth", user);
      // console.log("user: ", res.data.data);
      setLoading(false);
      // let r12 = await Axios.get("https://reqres.in/api/users?delay=3");
      // console.log("after axios 2ND");
      setUser(res.data.data);
      history.push("/user");
    } catch (err) {
      console.log(err);
      setAuthError(err.response.data.errors.full_messages);
      setLoading(false);
      // alert(
      //   "Error occurred while attempting to register user. Please Debug for more information"
      // );
    }
  };

  const handleLogin = async (user, history) => {
    try {
      setLoading(true);
      setAuthError(null);
      let res = await Axios.post("/api/auth/sign_in", user);
      setLoading(false);
      setUser(res.data.data);
      history.push("/user");
      console.log(res.data.data.email);
    } catch (err) {
      setLoading(false);
      setAuthError(err.response.data.errors);
    }
  };

  const handleLogout = async (history) => {
    // debugger
    try {
      await Axios.delete("/api/auth/sign_out");
      setUser(null);
      history.push("/login");
    } catch (err) {
      alert(
        "Error occurred while attempting to Logout user. Please Debug for more information"
      );
    }
  };

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const auth = {
    ...user,
    loading,
    authError,
    setAuthError,
    handleRegister,
    handleLogin,
    handleLogout,
    authenticated: user !== null,
    setUser,
  };

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
