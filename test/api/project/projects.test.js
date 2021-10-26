import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json"
import errors from "../../../src/resources/errors.json"
import payloadList from "../../../src/resources/payloads/payloads.project.json"

const projectsURI = endpointsList.endpoints.project.projects
let projectByIdURI  = endpointsList.endpoints.project.projectById
let id = ''
let postID = ''

describe("Project tests",() => {
    beforeAll(()=> {
        return HttpRequestManager.makeRequest('POST', projectsURI , payloadList.ProjectById.POST)
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
            id = response.data.Id
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
    },5000)

    afterAll(()=> {
        return HttpRequestManager.makeRequest('DELETE',projectByIdURI.replace('{id}',postID))
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })

    },5000)

    test('Verify that I a 200 ok status code result when a GET request to the "/projects.json" endpoint is executed', async()=>{
        await HttpRequestManager.makeRequest('GET',projectsURI)
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })

    },10000)

    test('Verify that I a 200 ok status code result when a POST request to the "/projects.json" endpoint is executed', async()=>{
        await HttpRequestManager.makeRequest('POST', projectsURI , payloadList.ProjectById.POST)
        .then(function(response) {
            //console.log(response.data)
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
            postID = response.data.Id
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })

    },5000)

    test('Verify that I a 200 ok status code result when a PUT request to the "/projects.json" endpoint is executed', async()=>{
        await HttpRequestManager.makeRequest('PUT', projectByIdURI.replace('{id}',id) , payloadList.ProjectById.PUT)
        .then(function(response) {
            //console.log(response.data)
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })

    },5000)

    test('Verify that I a 200 ok status code result when a DELETE request to the "/projects.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('DELETE',projectByIdURI.replace('{id}',postID))
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })

    },5000)

    test('Verify that an error result when a GET request to the "/projects.json" endpoint is executed with invalid credentials', async()=>{
        await HttpRequestManager.makeRequest('GET',projectsURI,'',false)
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).toEqual(errors.Authentication)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
    },10000)
    
})
