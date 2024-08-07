import React from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/logo/logo.png';

const Login = () => {
  return (
    <section className="p-4 max-w-screen-xl mx-auto min-h-screen flex items-center">
      <div className="lg:flex justify-between items-center grow">
        <div className="hidden lg:block w-[400px] px-10">
          <img src={logo} alt="logo" />
          <p className="text-[42px] text-center font-bold text-sky-500 mt-10">ShopiFlow</p>
        </div>
        <div className="py-10 w-full max-w-sm mx-auto">
          <div className="mx-auto text-center my-4 w-10">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="font-bold text-center text-[24px] mb-1">Log in to your account</h2>
          <p className="text-gray-500 text-xs mb-6 text-center">Welcome back! Please enter your details.</p>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 placeholder:text-sm focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
                required
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 placeholder:text-sm focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <button className="flex w-full font-light font justify-center rounded-sm bg-blue-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-blue-700 outline-none">
            Get started
          </button>

          <p className="mt-8 text-sm text-gray-500 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Login;
