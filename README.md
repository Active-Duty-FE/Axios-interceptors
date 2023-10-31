## Axios with Interceptors Based on Levels

### This is a repository that allows you to add interceptors for request, instance, and global levels in Axios.

## How to use

### What you need are files inside the service folder.

1. You should import AppRequest Class from 'servcie folder', and create axios instance.

```javascript
const appRequest1 = new AppRequest({
  baseURL: "http://localhost:4000",
  // Instance-level interceptor codes goes here.
  interceptors: {
    onRequestFulfilled: (config: InternalAxiosRequestConfig) => {
      // modify instance-level config here
      return config;
    },
  },
});
```

2. Do your requests using the instance created via AppRequest Class.

```javascript
const res = await appRequest1.get("/list", {
  // Request-level interceptor codes goes here.
  interceptors: {
    onRequestFulfilled: (config: AxiosRequestConfig) => {
      // modify request-level config here
      return config;
    },
  },
});
```

3. If you want to modify global-level configuration, then go to index.ts file in service folder.

### You can test requests in App.tsx. It offers testing at multiple levels.

## caveats

### The Axios Version is 1.5.0, if you are using a different version of Axios, you may need to adjust the interceptor types accordingly.
