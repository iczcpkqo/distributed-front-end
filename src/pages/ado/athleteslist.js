import React, {Component} from 'react';
import './ado.css'
import DrawerForm from './updateathlete'
import User from "../../model/User"
import StoreUser from "../../utils/StoreUser";
import {Table, Tag, Space, Button} from 'antd';
import AddAvailability from "./addAvailability";
import moment from 'moment';
import ajax from "../../api/ajax";
import Availability from "./availability";
const dateFormat = 'HH:mm DD-MM-YYYY';
const GET = 'GET'
const POST = 'POST'
const UPDATE = 'PUT'
const DELETE = 'POST'

export default class Athleteslist extends Component{

    constructor(props) {
        super(props);
        window.sessionStorage.setItem("myId", StoreUser.getMyId());
        if(StoreUser.getMyRole() === User.ADO)
            this.getMyAthletes();

        this.state = {
            data: [],
            columns:[{
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: text => <a>{text}</a>,
                }, {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                }, {
                    title: 'Country',
                    dataIndex: 'country',
                    key: 'country',
                }, {
                    title: 'Region',
                    dataIndex: 'region',
                    key: 'region',
                }, {
                    title: 'Action',
                    key: 'action',
                    render: (text, data) => (
                        <Space size="middle">
                            <Button type="primary" onClick={()=>this.records(data)}>
                                availability
                            </Button>
                        </Space>
                    ),
                }]};
    }

    async getMyAthletes(){
        this.setState({data: (await ajax("/ado/getAthletes", {adoId: StoreUser.getMyId()}, 'POST')).data.map((o)=>{
                let d = {};
                d.key = o.athleteId;
                d.id = o.athleteId;
                d.name = o.athleteName;
                d.email = o.athleteEmail;
                d.country = o.location.country;
                d.region = o.location.region;
                return d;
            })});
    }

    records(data){
        window.sessionStorage.setItem("checkId", data.id);
        window.sessionStorage.setItem("checkName", data.name);
        window.location.href= "../ado/avalibility";
    }

    render() {
        return (
            <>
                <Table columns={this.state.columns} dataSource={this.state.data}/>
            </>
        )
    }
}















