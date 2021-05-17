import "./App.css";
import React from "react";
import {Container, Menu} from "semantic-ui-react";
import MainFormContainer from "./components/main-form/MainFormContainer";
import {Route, Link, BrowserRouter as Router, Switch} from "react-router-dom";
import FeedbackList from "./components/feedback-components/FeedbackList";

function App() {
  return (
    <Router>
      <Container>
        <Menu>
          <Menu.Item>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/form'>Form</Link>
          </Menu.Item>
        </Menu>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/form'>
            <MainFormContainer />
          </Route>
          <Route path='/'>
            <FeedbackList />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
