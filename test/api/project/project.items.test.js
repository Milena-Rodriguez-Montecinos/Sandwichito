import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json"
import errors from "../../../src/resources/errors.json"
import payloadList from "../../../src/resources/payloads/payloads.project.json"
import logger from "../../../src/utils/logger/logger.projects";

const projectsURI = endpointsList.endpoints.project.projects
const projectByIdItemsURI = endpointsList.endpoints.project.projectByIdItems
const projectByIdDoneItemsURI = endpointsList.endpoints.project.projectByIdDoneItems
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
            postID = id
        })
        .catch(function (error) {
            logger.error(error);
            throw error
        })
    })

    afterAll(()=> {
        return HttpRequestManager.makeRequest('DELETE',projectByIdURI.replace('{id}',postID))
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
        })
        .catch(function (error) {
            logger.error(error);
            throw error
        })

    },5000)

    test('Verify that I a 200 ok status code result when a GET request to the "/items.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('GET',projectByIdItemsURI.replace('{id}',id))
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

    test('Verify that I a 200 ok status code result when a GET request to the "/doneitems.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('GET',projectByIdDoneItemsURI.replace('{id}',id))
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
})
