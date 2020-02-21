import React from 'react'

const myStyleBody = {
    display: 'flex',
    border: '2px solid black',
    width: '200px',
    'flex-direction': 'column',
    'background-color': 'white',
    'border-radius': '12px',
    'margin-top': '10px',
    'margin-bottom': '10px',
    'margin-left': '10px',
    'margin-right': '10px',
}

const myStyleName = {
    color: 'black',
    margin: 'auto',
    'margin-bottom': '20px'
}

const myStyleImg = {
}

const myStyleDesc = {
    color: 'grey',
    margin: 'auto',
    'margin-bottom': '10px'
}

interface ItemProps {
    name: string
    description: string
    img: string
}

export class ItemCard extends React.Component<ItemProps, any> {
    
    constructor(props: ItemProps) {
        super(props)
        this.state = {
            name: props.name,
            description: props.description,
            img: props.img
        }
        
    }

    render() {
        return (
            <div style={myStyleBody}>
                <h1 style={myStyleName}>{this.state.name}</h1>
                <img src={this.state.img} alt="gato loco" width="180px" height="180px" style={myStyleImg}/>
                <h2 style={myStyleDesc}>{this.state.description}</h2>
            </div>
        )
    }
}

export default ItemCard