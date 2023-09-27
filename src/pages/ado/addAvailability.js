import React, {Component} from 'react';
import './ado.css'
import {Space, Table, DatePicker, Button, Drawer} from "antd";
import moment from 'moment';
import ajax from "../../api/ajax";
import StoreUser from "../../utils/StoreUser";
const dateFormat = 'HH:mm DD-MM-YYYY';
const GET = 'GET'
const POST = 'POST'
const UPDATE = 'PUT'
const DELETE = 'POST'

export default class AddAvailability extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            locations: [],
            date: new Date(),
            timeStamp: (new Date()).getTime()/1000
        }
    }

    async componentDidMount() {
        this.setState({locations:(await ajax("/location/", {}, 'GET')).data.locations});
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
        this.setState({date: timeString});
        this.setState({timeStamp: (new Date(time.toString())).getTime()});
    }

    onUpdate(e){

        let ajaxData = [{
            key: this.props.record.key,
            id: this.props.record.id,
            name: this.props.record.name,
            age: this.props.record.age,
            address: this.props.record.address,
            date: this.props.record.date,
        }];
        this.setState({data: ajaxData});
    }

    onDelete(e){
        let ajaxData = [{
            id: this.props.record.id,
        }];
        this.setState({data: ajaxData});
    }

    onAdd(e){
        console.log("Country :", this.state.selCountry)
        console.log("Region: ", this.state.selRegion)
        if(this.state.date && this.state.selCountry && this.state.selRegion){
            let u = `/availability/${StoreUser.getMyId()}`;
            let a = ajax(u, {
                "startTimeStamp": this.state.timeStamp,
                "location": {
                    "country": this.state.selCountry,
                    "region": this.state.selRegion
                }
            }, "POST");
            this.props.onAdd();
            window.location.reload(true);
        } else{
            alert("Error! Please fill this form, Thanks.");
        }
    }

    onSelChanged(e){
        let val = e.target.value.split('-');
        console.log("Region:",val[0])
        this.setState({selRegion: val[0]});
        this.setState({selCountry: val[1]});
    }


    render() {
        return (
            <>
                <div style={{textAlign: "right", marginTop: "-50px"}}>
                    <Button type="primary" onClick={this.showDrawer.bind(this)} danger>
                        + Add New Availability
                    </Button>
                </div>
                <br/>
                <Drawer width={"360px"} title="Add New Availability" placement="right" onClose={this.onClose.bind(this)} visible={this.state.visible}>
                    <form>
                        <label>
                            Date:
                            <br />
                            {/*<DatePicker defaultValue={moment(this.state.date, dateFormat)} format={dateFormat} onChange={this.onChange.bind(this)}/>*/}
                            <DatePicker name="date" defaultValue={moment()} format={dateFormat} onChange={(time, timeString, e)=>this.onTimePick(time, timeString)}/>
                        </label>
                        <br />
                        <br />

                        <label>
                            Locations:
                            <br />
                            <select onChange={(e)=>this.onSelChanged(e)}>
                                <option></option>
                                {this.state.locations.map((o)=> <option value={`${o.region}-${o.country}`}>{o.region}-{o.country}</option>) }
                            </select>
                        </label>
                        <br />
                        <br />

                        <Button type="primary" onClick={(e)=>this.onAdd(e)} block danger>
                            ADD
                        </Button>
                        <br />
                        <br />

                    </form>

                </Drawer>
            </>
        )
    }
}


