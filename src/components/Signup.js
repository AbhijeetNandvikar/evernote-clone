import React from "react";
import { Link } from "react-router-dom";
import { googlesigninwrapper, signUpWrapper } from "../firebase";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  return (
    <div className="min-w-screen min-h-screen flex items-center flex-col justify-center">
      {/* <UnAuthNavbar /> */}
      <div className=" lg:max-w-4xl mx-auto flex flex-col items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden md:flex">
          <div className="hidden w-1/2 bg-gray-900 py-10 px-10 md:flex flex-col justify-center">
            <div className="text-4xl font-bold mb-12 text-white text-center flex justify-center items-center">
              <div>This is a simple note taking app</div>
            </div>
            <Link to="/login" className="text-white mt-6 text-center">
              Click here to Login.
            </Link>
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
              <p>Enter your information to Register</p>
            </div>
            <div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1">
                    Full Name
                  </label>
                  <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input
                      type="text"
                      class="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-900"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1">
                    Email
                  </label>
                  <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input
                      type="email"
                      class="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-900"
                      placeholder="johnsmith@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1">
                    Choose Password
                  </label>
                  <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input
                      type="password"
                      class="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-900"
                      placeholder="************"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-12">
                  <label for="" class="text-xs font-semibold px-1">
                    Confirm Password
                  </label>
                  <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <input
                      type="password"
                      class="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-900"
                      placeholder="************"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-xs text-red-600 mx-auto text-center mb-2">
                {error.length ? error : ""}
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <button
                    class="block w-full max-w-xs mx-auto bg-gray-900 hover:bg-gray-900 focus:bg-gray-900 text-white rounded-lg px-3 py-3 font-semibold"
                    onClick={(e) => {
                      if (password === confirmPassword)
                        signUpWrapper(email, password, undefined, (err) => {
                          setError(err.message);
                        });
                    }}
                  >
                    REGISTER NOW
                  </button>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <button
                    class="block w-full max-w-xs mx-auto text-gray-900 border-gray-900 border-2 rounded-lg px-3 py-3 font-semibold"
                    onClick={() => {
                      googlesigninwrapper();
                    }}
                  >
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link
        to="/login"
        className="text-gray-900 mt-6 text-center md:hidden block "
      >
        Click here to Login.
      </Link>
    </div>
  );
};

export default Signup;
