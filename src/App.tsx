import React from "react";
import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import "./index.css";
import { AppRequest } from "./service";

// Request Instance1
const appRequest1 = new AppRequest({
  baseURL: "http://localhost:4000",
});

// Request Instance2
const appRequest2 = new AppRequest({
  baseURL: "http://localhost:4000",
  interceptors: {
    onRequestFulfilled: (config: InternalAxiosRequestConfig) => {
      console.log("appRequest2 Instance Interceptor");
      return config;
    },
  },
});

function App() {
  // Request1 within Request instance 1
  async function perRequest1() {
    const res = await appRequest1.get("/list", {
      interceptors: {
        onRequestFulfilled: (config: AxiosRequestConfig) => {
          console.log("Per Request 1 Interceptor");
          return config;
        },
      },
    });
  }
  // Request2 within Request instance 1
  async function perRequest2() {
    const res = await appRequest1.get("/list", {
      interceptors: {
        onRequestFulfilled: (config: AxiosRequestConfig) => {
          console.log("Per Request 2 Interceptor");
          return config;
        },
      },
    });
  }
  // Request within Request instance 1
  async function perAxiosInstance1() {
    const res = await appRequest1.get("/list", {
      interceptors: {
        onRequestFulfilled: (config: AxiosRequestConfig) => {
          console.log("Per Axios Instance 1 Interceptor");
          return config;
        },
      },
    });
  }
  // Request within Request instance 2
  async function perAxiosInstance2() {
    const res = await appRequest2.get("/list", {
      interceptors: {
        onRequestFulfilled: (config: AxiosRequestConfig) => {
          console.log("Per Axios Instance 2 Interceptor");
          return config;
        },
      },
    });
  }
  return (
    <div className="App">
      <div className="section" style={{ backgroundColor: "#abcabc" }}>
        <button onClick={perRequest1}>Per Request 1</button>
        <button onClick={perRequest2}>Per Request 2</button>
      </div>
      <div className="section" style={{ backgroundColor: "#cbacba" }}>
        <button onClick={perAxiosInstance1}>Per Axios Instance 1</button>
        <button onClick={perAxiosInstance2}>Per Axios Instance 2</button>
      </div>
    </div>
  );
}

export default App;
