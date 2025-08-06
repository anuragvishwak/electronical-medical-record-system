import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
