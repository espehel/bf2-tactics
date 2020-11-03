import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './less/main.less';
import App from './App';
import { SpaceProvider } from './state/Space';

const rootElement = document.querySelector('#root');

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '50px',
      },
      h2: {
        fontSize: '35px',
      },
      h3: {
        fontSize: '25px',
      },
    },
  },
});

render(
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path={['/:spaceId', '/']}>
          <SpaceProvider>
            <App />
          </SpaceProvider>
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>,
  rootElement
);
