import axios from 'axios'
import StoreUser from "../utils/StoreUser";
import {message} from "antd";

/*
* ajax
* */

export default function ajax(url,data={},type='GET'){
    const h = "http://52.190.2.8:8080";
    url = h+url;
    const axiosInstance =  axios.create({
        timeout: 8000,
        headers: {
            'Authorization': "Bearer " + StoreUser.getMyToken(),
            'Content-Type': 'application/json'
        }
    });
    return new Promise(function (resolve,reject){
        let promise
        if(type === 'GET'){
            promise = axiosInstance.get(url, {params:data})//query parameter
            console.log("GET:" + promise);
        }
        else if(type == 'POST')
        {
            console.log("POST back-end : "+ url);
            promise = axiosInstance.post(url,data)
        }
        else if(type == 'DELETE')
        {
            console.log("DELETE back-end : "+ url);
            promise = axiosInstance.delete(url,data)
        }else if(type == 'PATCH'){
            console.log("PATCH : "+ url);
            promise = axiosInstance.patch(url,data)
        }
        else
        {
            console.log("PUT back-end : "+ url);
            promise = axiosInstance.put(url,data)
        }
        promise.then(response =>{
            // if success
            resolve(response)
        }).catch(error => {
            message.error('axios error:'+error.message)
        })
    })
}

