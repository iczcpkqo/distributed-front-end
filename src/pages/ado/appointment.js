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

export default class Appointment extends Component{
    constructor(props) {
        super(props);
        // this.state = {checkId : window.sessionStorage.getItem("checkId") || false};
        let checkId = window.sessionStorage.getItem("checkId") || false ;
        this.state = {checkId: checkId};

        if ("false" !== this.state.checkId) {
            /**
             * get some Athlete's Appointments, No API
             */
            // this.getAppointmentForAdo(this.state.checkId);
        } else if (User.ADO === StoreUser.getMyRole()) {
            // this.getAllAvailability();
            this.getAppointmentForAdo(StoreUser.getMyId());
        } else if (User.ATHLETE === StoreUser.getMyRole()) {
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
                    title: 'Availability Country',
                    dataIndex: 'country',
                    key: 'country',
                }, {
                    title: 'Availability Region',
                    dataIndex: 'region',
                    key: 'region',
                }, {
                    title: 'time',
                    dataIndex: 'time',
                    key: 'time',
                    render: text => {
                        let date = new Date(text);
                        return moment(date, dateFormat).toString();
                    }
                }]
            };

    }

    async getAppointmentForAdo(adoId){

        this.setState({
            data: (await ajax("/ado/getAllAppointments", {adoId}, "POST")).data.map((o)=>{
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
                data.isAppointment = o.isAppointment;
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

    render() {
        return (
            <>
                <Table columns={this.state.columns} dataSource={this.state.data}/>
            </>
        )
    }
}


