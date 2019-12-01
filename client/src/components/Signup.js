import React from 'react';

class Signup extends React.Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            verifyPassword: "",
        }
        this.baseState = this.state
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    resetForm = () => {
        this.setState(this.baseState)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        this.resetForm();
        this.setState({
            email: "",
            password: "",
            verifyPassword: ""
        })
    }

    render(){
        return(
            <div>
                <h2>Signup</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>New Email</label>
                    <input type="email" name="email" onChange={this.handleChange}></input>
                    <label>New Password</label>
                    <input type="password" name="password" onChange={this.handleChange}></input>
                    <label>Verify Password</label>
                    <input type="password" name="verifyPassword" onChange={this.handleChange}></input>
                    <button type="submit" value="Submit">Login</button>
                </form>
            </div>
        )
    }
}

export default Signup;