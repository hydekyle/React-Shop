import React from "react";

interface LoginProps {
    label: string;
}
export class Login extends React.Component<LoginProps, any> {
    constructor(props: Readonly<LoginProps>){
        super(props);
        this.state = {
            label: "Username"
        }
    }

    render() {
        return (
            <div className='login'>
                <h1>Login</h1>
                <button>{this.state.label}</button>
            </div>
        );
    }
}

export default Login