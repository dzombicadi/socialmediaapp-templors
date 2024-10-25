import "./App.css";
import "./global.css";
import logo from "./images/logo.png";

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="Logo" className="header-logo" />
      </header>

      <div className="register-form"></div>
    </div>
  );
}

export default App;
