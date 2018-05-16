import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from 'js/reducers'
import Routes from 'js/routes'

let store = createStore(reducer)

import 'css/main.less'

render(
    <Provider store={store}>
        {Routes}
    </Provider>,
    document.querySelectorAll('.main')[0]
);