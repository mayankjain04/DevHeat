import { useState } from "react";
import "./App.css";
import { Footer, Navbar } from "./components/index";
import { Outlet } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default App;
