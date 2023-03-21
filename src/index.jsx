import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { AppRoute } from './routing/AppRoute';

// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <AppRoute />
    </Provider>,
    document.getElementById('app')
);