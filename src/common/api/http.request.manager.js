import axios from "axios"
import instances from "../../resources/instances.json"
import CredentialsManager from "./credentials.manager"

class HttpRequestManager {
   
    static makeRequest(verb, uri, data = '', isAuthValid = true) {
        let instance = null

        switch(isAuthValid) {
            case false:
                instance = axios.create(instances.InvalidCredentials);
                break
            case true:
                instance = axios.create(instances.ValidCredentials);
                break
            default:
                instance = axios.create(CredentialsManager.credentials(isAuthValid));
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

