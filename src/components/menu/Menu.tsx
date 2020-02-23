import React from 'react'

const myStyle = {
    color: 'red',
    background: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    fontSize: '60px'
}

interface MenuProps {
    status: boolean
    counter: number
}

export class Menu extends React.Component<MenuProps, any> {

    constructor(props: Readonly<MenuProps>) {
        super(props)
        this.state = {
            status: true,
            counter: 0
        }
    }

    incrementCount() {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        this.incrementCount = this.incrementCount.bind(this);
        return (
            <div className='Menu' style={myStyle}>
                <i className="fas fa-home" />
                <h1>{this.state.counter}</h1>
                <button onClick={() => this.incrementCount()}>No tengo nada</button>
            </div>
        ); 
    }

}

export default Menu