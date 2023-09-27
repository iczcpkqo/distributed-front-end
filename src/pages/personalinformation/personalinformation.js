import React, {Component} from 'react';
import {Descriptions, Divider ,Modal} from "antd";
import memoryUtils from "../../utils/memoryUtils";

const { confirm } = Modal;
export default class PersonalInformation extends Component{
    state = {
        list: {},
    };
    componentDidMount() {
    }
    render() {
        const user = memoryUtils.user;
        return (

            <div style={{ background: '#ffffff',top: '-16px'  }}>
                <Divider />
                <Descriptions title=" &nbsp;  &nbsp; &nbsp;User Info" bordered>
                    <Descriptions.Item label="UserName">{"user_value"}</Descriptions.Item>
                    <Descriptions.Item label="Age">{"age_value"}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{"gender_value"}</Descriptions.Item>
                </Descriptions>
            </div>

        )
    }
}