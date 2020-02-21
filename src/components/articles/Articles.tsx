import React from "react";

interface ArticlesProps {
    label: string;
}

export class Articles extends React.Component<ArticlesProps, any> {
    constructor(props: Readonly<ArticlesProps>){
        super(props);
        this.state = {
            label: "Username"
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="text-title"><p>Article Name</p></div>
                <div className="description"><p>Aquí va la descripción de los productos... probablemente será un texto bien largo y chingón.</p></div>
                <i className="fab fa-font-awesome"></i>
            </React.Fragment>
        );
    }
}

export default Articles