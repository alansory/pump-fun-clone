import React from "react";
import Header from "./components/common/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from "./routes"; 

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <Header />
      <main className="flex-grow">
        <AppRoutes />
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