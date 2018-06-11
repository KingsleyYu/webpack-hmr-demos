import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter'
import { hot, AppContainer } from 'react-hot-loader'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>4</h1>
                <Counter></Counter>
            </div>
        )
    }
}

// export default hot(module)(App)

ReactDOM.render(<App />,
    document.getElementById('root')
);

/**
 * 如果不加这句话，页面说自动刷新，更新展示
 */
// if(module.hot){
//     module.hot.accept()
// }

if (module.hot) {
    module.hot.accept(() => {
        ReactDom.render(
            <AppContainer>
                <App />
            </AppContainer>,
            document.getElementById('root')
        )
    })
}

