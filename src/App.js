import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import UserPage from "./Pages/UserPage";

export default function App() {
  return (
    <Router>
      <div>
        <div className="bg-indigo-800">
          <nav>
            <ul className="flex flex-row">
              <li className="mx-10 text-white">
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Switch>
          <Route component={UserPage} path="/UserPage/:id" exact={true}></Route>
          <Route component={Home} path="/" exact={true}></Route>
        </Switch>
      </div>
    </Router>
  );
}
