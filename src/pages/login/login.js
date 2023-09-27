
/*
routing component of Login page
 */
import React,{Component,Option} from "react";
import {Link, Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import { message} from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import '../login/loginstyle.css'
import LoginHome from "./loginHome";


/**
 * @class：Login
 * @parameter：
 * @description： Drawer components
 */
export default class Login extends Component{

    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        //Check whether to log in
        if(memoryUtils.user.username){
            message.success("Automatic login successful ! " + memoryUtils.username)
            return <Redirect to = '/personal'/>
        }
        return (
            <div className="login">
                <section className="login-section">
                    <div className="login-container">
                        <div className="login-img">
                            <div className="imgBx"><img   alt=""/></div>
                        </div>
                        <div className="login-user">
                            <h2>Login</h2>
                            <LoginHome/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}