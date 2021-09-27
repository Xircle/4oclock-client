import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: any) => {
      switch (err?.response?.data?.statusCode) {
        case 401:
          alert("로그인 후 이용해주세요");
          window.location.href = routes.root;
          break;
        case 403:
          alert("권한이 없습니다");
          break;
        default:
          toast.error("에러가 발생했습니다. 잠시후 이용해주세요.", {
            position: toast.POSITION.TOP_CENTER,
          });
          break;
      }
    },
  }),
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
      <ToastContainer />
    </Router>
  </QueryClientProvider>,
  document.getElementById("root")
);
