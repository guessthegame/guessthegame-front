import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { loadReCaptcha } from 'react-recaptcha-google';
import store from './store';
import history from './history';

import './App.css';

import Layout from './components/Layout/Layout';

// Basic components
import Homepage from './pages/Hompage/Hompage';
import EditScreenshotPage from './pages/EditScreenshot/EditScreenshot';
import ScreenshotPage from './pages/Screenshot/Screenshot';
import RankingPage from './pages/Ranking/Ranking';
import TheEnd from './pages/TheEnd/TheEnd';
import NotFound from './pages/NotFound/NotFound';

// login components
import LoginPage from './pages/login/Login/Login';
import RegisterPage from './pages/login/Register/Register';
import ForgotPasswordPage from './pages/login/ForgotPassword/ForgotPassword';
import NewPasswordPage from './pages/login/NewPassword/NewPassword';

// User components
import UserPages from './pages/User/User';

export default class App extends React.Component {
  componentDidMount() {
    loadReCaptcha();
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>
            <Helmet
              defaultTitle="Guess The Game - Trouvez des jeux-vidéos à partir de screenshots"
              titleTemplate="%s - Guess The Game!"
            >
              <link rel="canonical" href="https://guess-the-game.com/" />
              <meta charSet="utf-8" />
            </Helmet>
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Redirect from="/screen/:id" to="/screenshot/:id" />
              <Route path="/screenshot/:id" exact component={ScreenshotPage} />
              <Route path="/classement" exact component={RankingPage} />
              <Route path="/connexion" exact component={LoginPage} />
              <Route path="/inscription" exact component={RegisterPage} />
              <Route
                path="/mot-de-passe-oublie"
                exact
                component={ForgotPasswordPage}
              />
              <Route
                path="/nouveau-mot-de-passe/:token"
                exact
                component={NewPasswordPage}
              />
              <Route
                path="/ajouter-un-screenshot"
                exact
                component={EditScreenshotPage}
              />
              <Route
                path="/modifier/:id"
                exact
                component={EditScreenshotPage}
              />
              <Route path="/la-fin" exact component={TheEnd} />
              <Route path="/moi" component={UserPages} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}
