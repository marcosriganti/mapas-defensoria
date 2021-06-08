import React, { useContext, createContext, useState } from "react";
export const authContext = createContext();

export const fakeAuth = {
  isAuthenticated: false,
  signin(payload, success, onError) {
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const signin = (payload, cb, error) => {
    return fakeAuth.signin(
      payload,
      (data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        cb();
      },
      error
    );
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      localStorage.removeItem("user");
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}
