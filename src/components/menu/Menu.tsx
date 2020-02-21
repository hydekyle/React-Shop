import React from 'react'

const myStyle = {
    color: 'red',
    background: 'blue',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'baseline',
    'font-size': '60px'
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
                <h1>TazaLoca.com</h1>
            </div>
        ); 
    }

}

export default Menu


{/* <button onClick={this.incrementCount}>{this.state.counter}</button> */}