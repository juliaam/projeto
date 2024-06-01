import "./App.css";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./Routes.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <div className="container">
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
