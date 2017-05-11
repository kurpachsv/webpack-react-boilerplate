import { AppContainer } from 'react-hot-loader';

import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'

/**
 * Opt-in to Webpack hot module replacement
 * @see https://webpack.github.io/docs/hot-module-replacement.html
 */
if (module.hot) { module.hot.accept(); }

/**
 * @see https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30#issuecomment-261401677
 */
if (module.hot) {
    document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
        const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
        link.href = nextStyleHref;
    });
}

render(
    <AppContainer>
        <div>
            <App />
        </div>
    </AppContainer>,
    document.getElementById('root')
);