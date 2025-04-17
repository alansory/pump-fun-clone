import React from "react";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <Header />
      <main className="flex-grow">
        <Home />
      </main>
      <ToastContainer 
        aria-label="Notifications" 
        position="bottom-center" 
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="dark"
        className="toast-progress-orange"
      />
    </div>
  );
};

export default App;