import "./css/normalize.css";
import "./css/skeleton.css";
import { render } from "react-dom";
import App from "./components/App";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const start = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    document.getElementById("root")
  );
};
start();
