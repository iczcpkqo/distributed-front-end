import React, {Component} from 'react';
import './athletes.css'
import {Space, Table, DatePicker, Button, Drawer} from "antd";
import moment from 'moment';
import ajax from "../../api/ajax";
const dateFormat = 'HH:mm DD-MM-YYYY';
const GET = 'GET'
const POST = 'POST'
const UPDATE = 'PUT'
const DELETE = 'POST'

export default class Updateado extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            key: this.props.record.key,
            id: this.props.record.id,
            name: this.props.record.name,
            adoName: this.props.record.adoName,
            age: this.props.record.age,
            address: this.props.record.address,
            date: this.props.record.date,
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

    onChange(time, timeString, e){
        this.setState({date: timeString});
    }

    onUpdate(e){

        let ajaxData = [{
            key: this.props.record.key,
            id: this.props.record.id,
            name: this.props.record.name,
            adoName: this.props.record.adoName,
            age: this.props.record.age,
            address: this.props.record.address,
            date: this.props.record.date,
        }];
        // let ajaxData = ajax(url, ajaxData, UPDATE)
        // this.setState({data: ajax(url, ajaxData, UPDATE)});
        this.setState({data: ajaxData});
    }

    onDelete(e){
        let ajaxData = [{
            id: this.props.record.id,
        }];
        // let ajaxData = ajax(url, ajaxData, DELETE)
        this.setState({data: ajaxData});
    }


    render() {
        return (
            <>
                <Button type="primary" onClick={this.showDrawer.bind(this)}>
                    Edit Record
                </Button>
                <Drawer title="Basic Drawer" placement="right" onClose={this.onClose.bind(this)} visible={this.state.visible}>

                    <form>
                        <label>
                            Name:
                            <br />
                            <input
                                name="name"
                                type="text"
                                value={this.state.adoName}
                                onChange={this.onInputChange.bind(this)}
                                 />
                        </label>
                        <br />
                        <br />
                        <label>
                            Address:
                            <br />
                            <textarea
                                name="address"
                                type="text"
                                value={this.state.address}
                                onChange={this.onInputChange.bind(this)}
                            />
                        </label>
                        <br />
                        <br />
                        <label>
                            Date:
                            <br />
                            <DatePicker defaultValue={moment(this.state.date, dateFormat)} format={dateFormat} onChange={this.onChange.bind(this)}/>
                        </label>
                        <br />
                        <br />
                        <Button type="primary" onClick={this.onUpdate.bind(this)} block>
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


