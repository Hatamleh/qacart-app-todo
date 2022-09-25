import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";
import NewTodoPage from "../pages/NewTodo";
import { AuthContext } from "../context/AuthContext";

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/login">{!user ? <LoginPage /> : <Redirect to="/todo" />}</Route>
      <Route path="/signup">{!user ? <SignupPage /> : <Redirect to="/todo" />}</Route>
      <Route path="/todo/new">{user ? <NewTodoPage /> : <Redirect to="/login" />}</Route>
      <Route path="/todo" exact>
        {user ? <TodoPage /> : <Redirect to="/login" />}
      </Route>
      <Route path="/" exact>
        {!user ? <LoginPage /> : <Redirect to="/todo" />}
      </Route>
    </Switch>
  );
};

export default AppRouter;
