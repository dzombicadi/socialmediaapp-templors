import "./App.css";
import "./global.css";

import NavBar from "./components/NavBar";
import LoginRegisterForm from "./components/LoginRegisterForm";
import RegisterForm from "./components/RegisterForm";
import FeedPage from "./components/FeedPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegisterForm />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/feedpage" element={<FeedPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
