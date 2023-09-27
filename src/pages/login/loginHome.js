import {Form, Input, Drawer, Button, Checkbox, message, Modal, Divider, Radio} from 'antd';
import React,{Component} from "react";
import {green} from "@ant-design/colors";
import DrawerForm from './registrationDrawer'
import {StaticRouter, withRouter} from 'react-router-dom';
import ajax from "../../api/ajax";
import User from"../../model/User"
import StoreUser from"../../utils/StoreUser"

class  LoginHome extends Component{
    state = { visible: false };
     layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    constructor(props) {
        super(props);
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    /**
     * @function：onFinish
     * @parameter： User account email and password
     * @description： Authenticate
     */
     onFinish = async (e) => {
         withRouter(LoginHome)
         let response =  await ajax("/user/login", {
             "email": e.username,
             "password": e.password
         },'POST')
         console.log("login successful");
         console.log(response);

         StoreUser.save(User.create({
                 role: response.data.isAthlete,
                 id: response.data.id,
                 token: response.data.token,
             }));

         if(User.ADO === StoreUser.getMyRole()){
             this.props.history.replace('/personal/ado/athleteslist');
         } else if (User.ATHLETE === StoreUser.getMyRole()) {
             this.props.history.replace('/personal/ado/avalibility');
         }
     };

    render(){
        const genderChange = (value)=> {

        }
        return(
            <Form
                {...this.layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >

                <Form.Item
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>
                <br/>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <br/>
                <br/>

                <Form.Item {...this.tailLayout}>
                    <Button type="primary" htmlType="submit">Login</Button>
                    <DrawerForm/>
                </Form.Item>

            </Form>
        )
    }
}

export default withRouter(LoginHome);

