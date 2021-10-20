import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: any) => {
      if (err.message) {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      const errCode = err?.response?.status || err?.response?.data?.statusCode;
      switch (errCode) {
        case 401:
          localStorage.clear();
          alert("로그인 후 이용해주세요");
          window.location.href = routes.root;
          break;
        case 403:
          alert("권한이 없습니다");
          break;
        case 500:
          toast.error("서버 에러가 발생했습니다. 잠시후 이용해주세요.", {
            position: toast.POSITION.TOP_CENTER,
          });
          break;
        default:
          toast.error("네트워크 상태가 원할하지 않습니다.", {
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
