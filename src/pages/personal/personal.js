/*
routing component of personal page
 */
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import React,{Component} from "react";
import {Redirect,Link,Route,Switch} from 'react-router-dom'
import {message,Image,Button,Modal} from "antd";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
   ExclamationCircleOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './personal.css'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import StoreUser from "../../utils/StoreUser";
import User from "../../model/User"
import { withRouter } from 'react-router-dom';
import {formateDate} from "../../utils/dateUtils";
import Athleteslist from "../ado/athleteslist"
import Availability from "../ado/availability"
import Appointment from "../ado/appointment"
const { confirm } = Modal;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

 class Personal extends Component{
    state = {
        collapsed: false,
        currentTime:formateDate(Date.now()),
        current: 'mail',
    };
      this = this
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
     /**
      * @function：showDeleteConfirm
      * @parameter：null
      * @description： User logout operation
      */
      showDeleteConfirm =()=> {
         confirm({
             title: 'Warning notices',
             icon: <ExclamationCircleOutlined />,
             content: 'Are you really ready to log out?',
             okText: 'Yes',
             okType: 'danger',
             cancelText: 'No',
             onOk:()=> {
                 console.log('OK');
                 //Deletes user information stored locally
                 storageUtils.removeUser();
                 StoreUser.removeMe();
                 memoryUtils.user={};
                 memoryUtils.userID = {};

                 message.success("log out success!");
                 //Page jump
                 this.props.history.replace('/');
                 this.forceUpdate();

             },
             onCancel() {
                 console.log('Cancel');
             },
         });
     }

     /**
      * @function：getTime
      * @parameter：null
      * @description： Gets the current time and date
      */
     getTime=()=>{
          setInterval(()=>{
              //Format time and date
              const currentTime = formateDate(Date.now())
              this.setState({currentTime})
          },1000)
     }
     componentDidMount() {
        this.getTime();
     }

     render() {
        const{currentTime} = this.state
        // const user = memoryUtils.user.username;
        // console.log("per:"+user)
        // //Check whether to log in
        // if(!user){
        //     return <Redirect to = '/login'/>
        // }

        const { collapsed } = this.state;
        var role = StoreUser.getMyRole();
        var tit = role === User.ADO ? "ADO" : "Athlete";
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        {(()=>{
                            if(User.ADO === role){
                                return (
                                    <>
                                    <Menu.Item key="4"> <Link to ='/personal/ado/athleteslist'>Athletes List</Link> </Menu.Item>
                                    <Menu.Item key="5"> <Link to ='/personal/ado/appointment'>Appointments List</Link> </Menu.Item>
                                    </> )
                            }else{
                                return (
                                    <>
                                    <Menu.Item key="6"> <Link to ='/personal/ado/avalibility'>Availability</Link> </Menu.Item>
                                    </> )
                            }
                        })()}
                    </Menu>
                </Header>
                <div style={{position: "fixed", right: "50px", zIndex:"10000", top: "20px", fontSize: "18px", color: "white", fontWeight: "bolder"}}>
                    <span>
                        I'm {tit}
                    </span>
                </div>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <div>
                            <Button onClick={this.showDeleteConfirm} type="dashed">Log out</Button>
                            <span> &ensp;   &ensp;   </span>
                            <span style={{ right: '80px' }}>{currentTime}</span>
                        </div>
                    </Breadcrumb>
                    <div>
                        {/*Routing management for personal pages*/}
                        <Switch>
                            <Route path='/personal/ado/athleteslist' component={Athleteslist}/>
                            <Route path='/personal/ado/appointment' component={Appointment}/>
                            <Route path='/personal/ado/avalibility' component={Availability}/>
                            <Redirect to='/personal/about'/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Distributed Systems Group 5 Exercise 2 © 2022</Footer>
            </Layout>
        )
    }
}
export default withRouter(Personal);