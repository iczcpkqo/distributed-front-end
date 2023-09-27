import React, {Component} from 'react';
import './ado.css'
import {Space, Table, DatePicker, Button, Drawer, Select} from "antd";
import moment from 'moment';
import ajax from "../../api/ajax";
import {Option} from "antd/es/mentions";
const dateFormat = 'HH:mm DD-MM-YYYY';
const GET = 'GET'
const POST = 'POST'
const UPDATE = 'PUT'
const DELETE = 'POST'

export default class UpdateAvailability extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            key: this.props.record.key,
            availabilityId: this.props.record.availabilityId,
            athleteId: this.props.record.athleteId,
            athleteName: this.props.record.athleteName,
            athleteCountry: this.props.record.athleteCountry,
            athleteRegion: this.props.record.athleteRegion,
            athleteEmail: this.props.record.athleteEmail,
            time: this.props.record.time/1000,
            country: this.props.record.country,
            region: this.props.record.region,
            locations:[]
        }
    }

    showDrawer(e){
        this.setState({visible: true})
    }

    onClose(e){
        this.setState({visible: false})
    }

    onInputChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onTimePick(time, timeString){
        this.setState({time: (new Date(time.toString())).getTime()/1000});
    }

    onSelChanged(e){
        let val = e.target.value.split('-');
        this.setState({country: val[0]});
        this.setState({region: val[1]});
    }

    onUpdate(e){
        this.props.onUpdate(this.state.country, this.state.region, this.state.time*1000, this.state.availabilityId);
        ajax(`/availability/${this.state.athleteId}`, {
            "availabilityId": this.state.availabilityId,
            "startTimeStamp": this.state.time*1000,
            "location": {
                "country": this.state.country,
                "region": this.state.region
            }
        }, "PATCH");
        this.onClose();
        window.location.reload(true);
    }

    onDelete(e){
        ajax(`/availability/${this.state.availabilityId}`, {}, 'DELETE');
        this.props.onDelete();
        this.onClose();
        window.location.reload(true);
    }

    async componentDidMount() {
        // this.setState({location_list:[{ "region": "Asia", "country":"India"},{ "region": "Asia", "country":"China"}]})
        this.setState({locations:(await ajax("/location/", {}, 'GET')).data.locations});
    }


    render() {
        return (
            <>
                <Button type="primary" onClick={this.showDrawer.bind(this)}>
                    Update Availability
                </Button>
                <Drawer title="Update Availability" placement="right" onClose={this.onClose.bind(this)} visible={this.state.visible}>

                    <form>
                        <label>
                            Name:
                            <br />
                            <input
                                name="name"
                                type="text"
                                value={this.state.athleteName}
                                onChange={this.onInputChange.bind(this)}
                                disabled/>
                        </label>
                        <br />
                        <br />

                        <label>
                            Email:
                            <br />
                            <input
                                name="email"
                                type="text"
                                value={this.state.athleteEmail}
                                onChange={this.onInputChange.bind(this)}
                                disabled/>
                        </label>
                        <br />
                        <br />

                        <label>
                            Athlete Country:
                            <br />
                            <input
                                name="athleteCountry"
                                type="text"
                                value={this.state.athleteCountry}
                                onChange={this.onInputChange.bind(this)}
                                disabled/>
                        </label>
                        <br />
                        <br />

                        <label>
                            Athlete Region:
                            <br />
                            <input
                                name="athleteRegion"
                                type="text"
                                value={this.state.athleteRegion}
                                onChange={this.onInputChange.bind(this)}
                                disabled/>
                        </label>
                        <br />
                        <br />

                        <select style={{width: "157px"}} onChange={(e)=>this.onSelChanged(e)}>
                            <option value={`${this.state.country}-${this.state.region}`}>{this.state.country}-{this.state.region}</option>) }
                            {this.state.locations.map((o)=> <option value={`${o.country}-${o.region}`}>{o.country}-{o.region}</option>) }
                        </select>
                        <br/>
                        <br/>

                        <label>
                            Date:
                            <br />
                            {/*<DatePicker defaultValue={moment(new Date(this.state.time), dateFormat)} format={dateFormat} onChange={(time, timeString)=>this.onTimePick(time, timeString)}/>*/}
                            <DatePicker defaultValue={moment(new Date(this.state.time*1000), dateFormat)} format={dateFormat} onChange={(time, timeString)=>this.onTimePick(time, timeString)}/>
                            {/*<DatePicker defaultValue={(()=>{*/}
                            {/*    let date = new Date(this.state.time*1000);*/}
                            {/*    return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`*/}
                            {/*})()} format={dateFormat} onChange={(time, timeString)=>this.onTimePick(time, timeString)}/>*/}
                        </label>
                        <br />
                        <br />

                        <Button type="primary" onClick={()=>this.onUpdate()} block>
                            UPDATE
                        </Button>
                        <br />
                        <br />
                        <Button type="primary" onClick={this.onDelete.bind(this)} block danger>
                            DELETE
                        </Button>
                        <br />
                        <br />

                    </form>

                </Drawer>
            </>
        )
    }
}


