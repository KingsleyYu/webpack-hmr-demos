import React from 'react';
import ReactDOM from 'react-dom';
import App from './Counter'

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