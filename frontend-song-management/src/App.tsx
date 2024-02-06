import { useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'

import '@/App.css'

function App() {
    return (
        <Provider store={store}>
            <div></div>
        </Provider>
    )
}

export default App
