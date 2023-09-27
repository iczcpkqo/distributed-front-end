import React, {Component} from 'react';
import './athletes.css'
import {Space, Table} from "antd";
import DrawerForm from "../athletes/updateado";

export default class Athlist extends Component{
    constructor(props) {
        super(props);
        let adoId = window.sessionStorage.getItem("adoId") || false;
        let athId = window.sessionStorage.getItem("athId") || false;
        let ajaxData = [];

        /**
         * 等待接口完成
         */

        // let isADO = 获取是否是ADO
        // if(isADO){
        //     // let adoId = getAdoID()
        //     window.sessionStorage.setItem("adoId", adoId);
        //     // ajaxData = ajax(url,{id: adoId} , GET)
        // } else if(!isADO) {
        //     // let athId = getAthID()
        //     window.sessionStorage.setItem("athId", athId);
        //     // ajaxData = ajax(url,{id: athId} , GET)
        // } else {
        //     alert("Error! You are neither ADO nor ATH!")
        // }

        // if (adoId && athId)
        //     ajaxData = ajax(url,{adoId: athId, athId: athId} , GET) // 调用机构查询其下某个运动员邀请记录的接口
        // else if(adoId != false && athId == false)
        //     ajaxData = ajax(url,{id: adoId} , GET) // 调用机构查询其下全部运动员邀请记录的接口
        // else if(adoId == false && athId != false)
        //     ajaxData = ajax(url,{id: athId} , GET) // 调用运动员查询自己的所有邀请记录的接口
        // else
        //     ajaxData = ajax(url,{} , GET) // 调用查询所有机构所有运动员的记录接口

        ajaxData = [{
            key: '1',
            id: '1111111',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            date: '22:22 02-03-2022',
            adoName: 'Apple Ado',
        },
            {
                key: '2',
                id: '2222222222',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                date: '22:22 04-04-2022',
                adoName: 'Big Ado',
            },
            {
                key: '3',
                id: '333333333333',
                name: 'Joe Black3',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                date: '22:22 08-04-2022',
                adoName: 'Cup Ado',
            }];
        this.state = {
            visible: false,
            data: ajaxData,
            columns: [{
                title: 'Ado Name',
                dataIndex: 'adoName',
                key: 'adoName',
                }, {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                }, {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            {/*<a val={record.id} onClick={this.onUpdate.bind(this, record)}>Update ID: {record.id}</a>*/}
                            {/*<DrawerForm id={record.id} name={record.name} age={record.age} address={} date={} />*/}
                            <DrawerForm record={record}/>
                            {/*<a val={record.id} onClick={this.onDelete.bind(this)}>Delete</a>*/}
                        </Space>
                    ),
                }]
        };
    }

    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.state.data} />
        )
    }
}