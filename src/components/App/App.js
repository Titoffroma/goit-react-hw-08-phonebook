import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

const Phonebook = lazy(() => import('../Phonebook'));

const AsyncPhonebook = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <Phonebook {...props} />
  </Suspense>
);

function App() {
  const [isIn, setIn] = useState(false);
  const Auth = useSelector(({ user }) => user.Auth);

  useEffect(() => {
    setIn(true);
  }, []);

  return (
    <>
      <Header isIn={isIn} />
      <Switch>
        <Route exact path="/register" component={RegisterForm}>
          {Auth && <Redirect to="/contacts" />}
        </Route>
        <Route exact path="/login" component={LoginForm}>
          {Auth && <Redirect to="/contacts" />}
        </Route>
        <Route path="/contacts" component={AsyncPhonebook}>
          {!Auth && <Redirect to="/login" />}
        </Route>
        <Redirect to={Auth ? '/contacts' : '/login'} />
      </Switch>
    </>
  );
}

export default App;
