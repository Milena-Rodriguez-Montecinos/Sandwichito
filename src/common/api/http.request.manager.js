import axios from "axios"
import instances from "../../resources/instances.json"
import payload from "../../resources/payloads.json"


class HttpRequestManager {

    /*constructor() {
        if(!creating) {
            throw new Error('Cant create a new instance')
        } 
    }

    static getInstance() {
        if(!instance) {
            creating = true;
            instance = new HttpRequestManager();
            creating = false;
        }
        return instance 
    }*/
    static makeRequest(verb,uri,data=``,isAuthValid=true) {
        let instance = null

        switch(isAuthValid) {
            case false:
                instance = axios.create(instances.InvalidCredentials);
                break
            default:
                instance = axios.create(instances.ValidCredentials);
                break
        }

        switch(verb) {
            case "GET":
                return instance.get(`${instance.defaults.baseURL}/api/${uri}`, instance.defaults.auth)
            case "POST":      
                return instance.post(`${instance.defaults.baseURL}/api/${uri}`, data ,instance.defaults.auth)          
            case "PUT":
                return instance.put(`${instance.defaults.baseURL}/api/${uri}`, data ,instance.defaults.auth)
            case "DELETE":
                return instance.delete(`${instance.defaults.baseURL}/api/${uri}`, instance.defaults.auth)
        }
    }

}

export default HttpRequestManager

