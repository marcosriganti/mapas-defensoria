import React, { useContext, createContext, useState } from "react";
import { firebase_app } from "../firebase";
export const authContext = createContext();

export const fakeAuth = {
  isAuthenticated: false,
  signin(payload, success, onError) {
    firebase_app
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        success(user);
      })
      .catch((error) => {
        console.log("encontramos error", error);
        onError(error);
        // ..
      });
    fakeAuth.isAuthenticated = true;
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const signin = (payload, cb, error) => {
    return fakeAuth.signin(
      payload,
      (data) => {
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
        cb();
      },
      error
    );
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      sessionStorage.removeItem("user");
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}
