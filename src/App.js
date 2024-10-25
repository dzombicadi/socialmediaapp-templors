import "./App.css";
import "./global.css";

import NavBar from "./components/NavBar";
import LoginRegisterForm from "./components/LoginRegisterForm";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <LoginRegisterForm></LoginRegisterForm>
    </div>
  );
}

export default App;
