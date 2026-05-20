import { AppRouter } from "@routes/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer 
        theme="colored"
        limit={3}
        pauseOnFocusLoss={false}
        closeButton={false}
      />
    </>
  );
}

export default App;
