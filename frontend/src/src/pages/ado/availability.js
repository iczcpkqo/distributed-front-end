import React, {Component} from 'react';
import './ado.css'
import User from '../../model/User'
import StoreUser from '../../utils/StoreUser'
import {Space, Table, DatePicker, Button, Drawer} from "antd";
import moment from 'moment';
import ajax from "../../api/ajax";
import UpdateAvailability from "./updateAvailability";
import AddAvailability from "./addAvailability";
const dateFormat = 'HH:mm DD-MM-YYYY';
const GET = 'GET'
const POST = 'POST'
const UPDATE = 'PUT'
const DELETE = 'POST'

export default class Availability extends Component{
    constructor(props) {
        super(props);
        // this.state = {checkId : window.sessionStorage.getItem("checkId") || false};
        let checkId = window.sessionStorage.getItem("checkId") || false;
        this.state = {checkId: checkId};

        if ("false" !== this.state.checkId) {
            this.getAvaForAthlete(this.state.checkId);
            window.sessionStorage.setItem("checkId", false);
        } else if (User.ADO === StoreUser.getMyRole()) {
            // this.getAllAvailability();
            window.location.href= "../ado/athleteslist";
        } else if (User.ATHLETE === StoreUser.getMyRole()) {
            checkId = StoreUser.getMyId();
            this.getAvaForAthlete(checkId);
        }

        this.state = {
            checkId,
            visible: false,
            data: [],
            columns: [{
                title: 'Name',
                dataIndex: 'athleteName',
                key: 'name',
                render: text => <a>{text}</a>,
            },
                {
                    title: 'Email',
                    dataIndex: 'athleteEmail',
                    key: 'email',
                }, {
                    title: 'Athlete Country',
                    dataIndex: 'athleteCountry',
                    key: 'athleteCountry',
                }, {
                    title: 'Athlete Region',
                    dataIndex: 'athleteRegion',
                    key: 'athleteRegion',
                }, {
                    title: 'Ado Country',
                    dataIndex: 'country',
                    key: 'country',
                }, {
                    title: 'Ado Region',
                    dataIndex: 'region',
                    key: 'region',
                }, {
                    title: 'time',
                    dataIndex: 'time',
                    key: 'time',
                    render: text => {
                        let date = new Date(text*1000);
                        return `${date.getHours()}:${date.getMinutes()} ${date.getDay()}-${date.getUTCDate()}-${date.getFullYear()}`
                    }
                }, {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <UpdateAvailability onUpdate={(i, j, k, id) => this.updateNewState(i, j, k, id)} onDelete={(id)=>this.delOneState(id)} record={record}/>
                        </Space>
                    ),
                }]
            };

    }

    async getAllAvailability() {
        this.setState({
            data: (await ajax("http://52.190.2.8:8005/availability", {}, "GET")).data.map((o)=>{
                let data = {};
                data.availabilityId = o.availabilityId;
                data.athleteId =  o.athlete.athleteId;
                data.athleteName = o.athlete.athleteName;
                data.athleteCountry = o.athlete.location.country;
                data.athleteRegion = o.athlete.location.region;
                data.athleteEmail = o.athlete.athleteEmail;
                data.time = o.startTimeStamp;
                data.country = o.location.country;
                data.region = o.location.region;
                return data;
            })
        })
    }

    async getAvaForAthlete(checkId){
        this.setState({
            data: (await ajax(`http://52.190.2.8:8005/availability/athlete/${checkId}`, {}, "GET")).data.map((o)=>{
                let data = {};
                data.availabilityId = o.availabilityId;
                data.athleteId =  o.athlete.athleteId;
                data.athleteName = o.athlete.athleteName;
                data.athleteCountry = o.athlete.location.country;
                data.athleteRegion = o.athlete.location.region;
                data.athleteEmail = o.athlete.athleteEmail;
                data.country = o.location.country;
                data.region = o.location.region;
                data.time = o.startTimeStamp;
                return data;
            })
        })
    }

    updateNewState(country, region, time, id){
        this.setState({data:this.state.data.map((o,i)=>{
            if(id === o.availabilityId){
                o.country = country;
                o.region = region;
                o.time = time;
            }
            return o;
        })});
    }

    delOneState(){
        this.getAvaForAthlete(this.state.checkId);
    }

    onAdd(){
        this.getAvaForAthlete(this.state.checkId);
        window.location.reload();
    }

    render() {
        return (
            <>
                {(() => {
                    if (User.ADO === StoreUser.getMyRole()) {
                        var name = window.sessionStorage.getItem("checkName");
                        return (
                            <div style={{
                                textAlign: "right",
                                fontWeight: "bolder",
                                fontSize: "18px",
                                paddingRight: "30px",
                                margin: "10px",
                                marginTop: "-50px"
                            }}>
                                <span> Availability of {name}</span>
                            </div>
                        );
                    } else {
                        return (<AddAvailability onAdd={()=>this.onAdd()}/>);
                    }
                })()}
                <Table columns={this.state.columns} dataSource={this.state.data}/>
            </>
        )
    }
}


