import "./App.css";
import "./global.css";

import NavBar from "./components/NavBar";
import LoginRegisterForm from "./components/LoginRegisterForm";
import RegisterForm from "./components/RegisterForm";
import FeedPage from "./components/FeedPage";

import NavBarFeed from "./components/NavBarFeed";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext.tsx'

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar></NavBar>
                <LoginRegisterForm />
              </>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <>
                <NavBar></NavBar>
                <RegisterForm />
              </>
            }
          ></Route>
          <Route
            path="/feedpage"
            element={
              <>
                <NavBarFeed />
                <FeedPage />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
