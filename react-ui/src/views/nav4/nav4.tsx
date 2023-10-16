import React, { useState } from 'react';
import { fetcher } from '../../utils/utils';

// TODO verify that we are typing things correctly in this file
interface Fetcher {
  url: string;
  options: FetcherOptions;
}

interface FetcherOptions {
  body: string;
  headers: FetcherOptionHeaders;
  method: string; // TODO consider implementing an enum here
}

interface FetcherOptionHeaders {
  Accept: string; // TODO consider implementing an enum here
  "Content-Type": string; // TODO consider implementing an enum here
}

export const Nav4 = () => {
  const defaultFieldValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  const [fields, setFields] = useState(defaultFieldValues);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const options = {
        body: JSON.stringify(fields),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST"
      };
      const data = await fetcher<Fetcher>("/signup", options);
      console.log(data); // TODO use `data` to render a notice in the UI
    } catch (error) {
      if (error instanceof Response) {
        // TODO determine why we need `error as Response` within this block to keep TS from complaining; see also https://stackoverflow.com/questions/60151181/object-is-of-type-unknown-typescript-generics
        switch ((error as Response).status) {
          case 401:
            throw new Error("Invalid login credentials");
          // TODO account for other network codes
          default:
            throw new Error(`Unknown server error occured: ${(error as Response).statusText}`);
        }
      }
      throw new Error(`Something went wrong. ${(error as Error).message || error}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id;
    const value = e.target.value;
    const _fields = {...fields, [key]: value};
    setFields(_fields);
  };
  
  return (
    <div className="y-wrap">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input id="firstname" onChange={handleChange} value={fields.firstname} />
        </div>
        <div>
          <label>Last Name</label>
          <input id="lastname" onChange={handleChange} value={fields.lastname} />
        </div>
        <div>
          <label>email</label>
          <input id="email" onChange={handleChange} value={fields.email} />
        </div>
        <div>
          <label>Password</label>
          <input id="password" onChange={handleChange} value={fields.password} />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
