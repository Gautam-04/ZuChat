import React, { useState } from 'react'
import { Client, Account, ID } from "appwrite";
import './Login.scss'

export default function Login() {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("64c4a3b087c9dd59d3ef"); // Your project ID

    const account = new Account(client);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const promise = account.create(ID.unique(), email, password);
   promise.then(
     function (response) {
       console.log(response);
     },
     function (error) {
       console.log(error);
     }
   );

  return (
    <section className="login">
      <div className="div">
        <h1>Sign In</h1>
        <form >
          <div className="Form">
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
      ;
    </section>
  );
}
