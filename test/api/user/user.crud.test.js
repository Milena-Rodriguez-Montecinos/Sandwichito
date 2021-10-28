import HttpRequestManager from '../../../src/common/api/http.request.manager'
import endpointsList from '../../../src/resources/endpoints.json'
import payloadList from '../../../src/resources/payloads/payloads.user.json'
import errors from '../../../src/resources/errors.json'

const userURI = endpointsList.endpoints.users.user;
let userByIdURI  = endpointsList.endpoints.users.userById;
let id = ''
let postId = ''

describe('User CRUD tests', () => {
    beforeAll(() => {
        return HttpRequestManager.makeRequest('POST', userURI, payloadList.Valid.POST.Two, 'user-two')
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
    })

    afterAll(() => {
        return HttpRequestManager.makeRequest('DELETE', userByIdURI.replace('{id}',postId), '', 'user-three')
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect().not.toEqual(errors.Authentication)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
    })

    test('Verify that a 200 OK status code result when a POST request to the "/user.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('POST', userURI, payloadList.Valid.POST.Two, 'user-three')
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
            postId = response.data.Id
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
    })

    test('Verify that a 200 OK status code result when a GET request to the "/user.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('GET', userURI, '', 'user-two')
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
    })

    test('Verify that a 200 OK status code result when a PUT request to the "/user/{id}.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('PUT', userByIdURI.replace('{id}',id), payloadList.Valid.PUT, 'user-two')
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
    })

    test('Verify that a 200 ok status code reuslt when a DELETE request to the "/user/{id}.json" endpoint is executed', async()=>{
        return HttpRequestManager.makeRequest('DELETE', userByIdURI.replace('{id}',id), '', 'user-two')
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch('OK')
            expect(response.data).not.toEqual(errors.Authentication)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
    })
})