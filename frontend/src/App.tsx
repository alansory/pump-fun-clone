import React from "react";
import Header from "./components/common/Header";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <Header />
      <main className="flex-grow">
        <Home />
      </main>
    </div>
  );
};

export default App;