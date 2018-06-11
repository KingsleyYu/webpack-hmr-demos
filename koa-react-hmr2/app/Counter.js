import React from 'react'


export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    add() {
        this.setState((preState) => {
            return {
                count: preState.count + 1
            }
        })
    }

    sub() {
        this.setState((preState) => {
            return {
                count: preState.count - 1
            }
        })
    }

    render() {
        return (
            <div className="container">
                <h1>{this.state.count}</h1>
                <button onClick={() => this.add()}>count+3</button>
                <br />
                <button onClick={() => this.sub()}>count-1</button>
                <div>adada</div>
            </div>
        )
    }
}