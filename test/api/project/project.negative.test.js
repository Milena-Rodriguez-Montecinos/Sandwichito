import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json"
import errors from "../../../src/resources/errors.json"
import payloadList from "../../../src/resources/payloads/payloads.project.json"
import logger from "../../../src/utils/logger";

const projectsURI = endpointsList.endpoints.project.projects
const projectByIdItemsURI = endpointsList.endpoints.project.projectByIdItems
const projectByIdDoneItemsURI = endpointsList.endpoints.project.projectByIdDoneItems

let projectByIdURI  = endpointsList.endpoints.project.projectById
let id = '1234567890'
let postID = ''
let validId = ''

describe("Project tests",() => {
    beforeAll(()=> {
        return HttpRequestManager.makeRequest('POST', projectsURI , payloadList.ProjectById.POST)
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
            validId = response.data.Id
        })
        .catch(function (error) {
            logger.error(error);
            throw error
        })
    })

    afterAll(()=> {
        return HttpRequestManager.makeRequest('DELETE',projectByIdURI.replace('{id}',validId))
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
        })
        .catch(function (error) {
            logger.error(error);
            throw error
        })
    })


    test('Verify that a 304 Invalid Project Id status code result when a GET request to the "projects/{id}.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('GET',projectByIdURI.replace('{id}',id))
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch("OK")
            expect(response.data).toEqual(errors.ErrorCode.NoAccessToProject)
        })
        .catch(function (error) {
            logger.error(error);
            throw error
        })

    })

    test('Verify that 200 OK status code result when GET items of an invalid project ID when request "/items.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('GET',projectByIdItemsURI.replace('{id}',id))
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).toEqual(errors.ErrorCode.NoAccessToProject)
        })
        .catch(function (error) {
            logger.error(error);
            throw error
        })

    })

    test('Verify that 200 OK status code result when a GET done items of an invalid project ID when request "/doneitems.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('GET',projectByIdDoneItemsURI.replace('{id}',id))
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).toEqual(errors.ErrorCode.NoAccessToProject)
        })
        .catch(function (error) {
            logger.error(error);
            throw error
        })

    })
    
    test('Verify that shows the required error with a non valid ID when DELETE request "/projects.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('DELETE',projectByIdURI.replace('{id}',id))
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).toEqual(errors.ErrorCode.InvalidId)
        })
        .catch(function (error) {
            logger.error(error);
            throw error
        })

    })
    
    test('Verify that shows the required error with an invalid authentication when DELETE request "/projects.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('DELETE',projectByIdURI.replace('{id}',validId), false)
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).toEqual(errors.Authentication)
        })
        .catch(function (error) {
            logger.error(error);
            throw error
        })

    })    

})
