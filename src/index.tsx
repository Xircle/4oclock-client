import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: () => {
      toast.error("에러가 발생했습니다. 잠시후 이용해주세요.", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  }),
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router basename={"https://614a4b30dd175f21d418855b--xircle.netlify.app/"}>
      <App />
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  </QueryClientProvider>,
  document.getElementById("root")
);
