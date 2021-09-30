import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../components/Auth";
import Logo from "../assets/logo.svg";

const LoginPage = () => {
  let history = useHistory();
  let auth = useAuth();

  // Login handle
  const [values, setValues] = useState({});
  const handleChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleSignIn = ev => {
    ev.preventDefault();
    const { email, password } = values;
    const payload = {
      email,
      password,
    };
    auth.signin(
      payload,
      () => {
        setValues({
          ...values,
          error: false,
        });
        history.replace("/");
      },
      error => {
        setValues({
          ...values,
          error: true,
          errorLog: error.message,
        });
      }
    );
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2 pt-5 md:p-20">
            <img
              aria-hidden="true"
              className="w-full h-full dark:hidden"
              src={Logo}
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={handleSignIn}>
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <input
                    type="email"
                    onChange={ev => handleChange("email", ev.target.value)}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="usuario@santafe.gob.ar"
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Contraseña
                  </span>
                  <input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="***************"
                    onChange={ev => handleChange("password", ev.target.value)}
                    type="password"
                  />
                </label>

                {values.error && (
                  <div className="text-red-500 font-bold text-xs text-center pt-5">
                    {values.errorLog}
                  </div>
                )}

                <button
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  onClick={handleSignIn}
                  type="submit"
                >
                  Ingresar
                </button>

                <hr className="my-8" />

                <p className="mt-4">
                  <a
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    href="./forgot-password.html"
                  >
                    Olvido su contraseña?
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
