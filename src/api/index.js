/*
* Contains N request interface function modules
* */
import ajax from './ajax'
const BASE = ''
const POST = 'POST'
const GET = 'GET'
const registerUrl = '/register'



export function reqRegister(registerData)
{
    return ajax(BASE+registerUrl,registerData,POST)
}


