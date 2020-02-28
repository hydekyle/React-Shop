import React from 'react'
import { get_user } from '../../controller/Api'

const myStyleBody = {
    display: 'flex',
    border: '2px solid black',
    width: '200px',
    flexDirection: "column",
    backgroundColor: 'white',
    borderRadius: '12px',
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '10px',
    marginRight: '10px'
} as React.CSSProperties

const myStyleName = {
    color: 'black',
    margin: 'auto',
    marginBottom: '20px'
} as React.CSSProperties

const myStyleImg = {
    margin: 'auto'
} as React.CSSProperties

const myStyleDesc = {
    color: 'grey',
    margin: 'auto',
    marginBottom: '10px'
} as React.CSSProperties

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

    componentDidMount() {
        get_user("HydeTest")
            .then(val => {
                this.setState({
                    description: val.slip.advice
                })
            })
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