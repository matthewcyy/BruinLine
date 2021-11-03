import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Home() {
  return <h2> HOME </h2>;
}

function DiningHalls() {
  return <h2> DINING HALLS </h2>;
}

function Rankings() {
  return <h2> RANKINGS </h2>;
}

function Profile() {
  return <h2> PROFILE </h2>;
}

function App() {
  return (
    <Router>
      <div className="App-menu">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/DiningHalls">Dining Halls</Link>
            </li>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <Link to="/Rankings">Rankings</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/DiningHalls">
            <DiningHalls />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route path="/Rankings">
            <Rankings />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <div className="App-menu">
    //       <h1> BOO </h1>
    //     </div>
    //     <p> HELLO </p>
    //   </header>
    // </div>
  );
}

export default App;
