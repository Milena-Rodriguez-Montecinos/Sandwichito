import HttpRequestManager from '../../../src/common/api/http.request.manager'
import endpointsList from '../../../src/resources/endpoints.json'
import payloadList from '../../../src/resources/payloads/payloads.user.json'
import errors from '../../../src/resources/errors.json'

const userURI = endpointsList.endpoints.users.user;
let userByIdURI = endpointsList.endpoints.users.userById;
let id = ''

describe('User GET request negative test', () => {

    beforeAll(() => {
        return HttpRequestManager.makeRequest('POST', userURI, payloadList.Valid.POST.Two, 'user-two')
        .then(function (response) {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe("OK");
            expect(response.data).not.toEqual(errors.Authentication);
            id = response.data.Id;
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
    })

    afterAll(() => {
        return HttpRequestManager.makeRequest('DELETE', userByIdURI.replace("{id}", id), '', 'user-two')
        .then(function (response) {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe("OK")
            expect(response.data).not.toEqual(errors.Authentication);
        })  
        .catch(function (error) {
            console.log(error)
            throw error
        })
    })

    test.each([
        [200, "OK", "InvalidEmail"],
        [200, "OK", "EmptyEmail"],
//        [200, "OK", "SpaceEmail"], 
        [200, "OK", "EmptyPass"], 
//        [200, "OK", "SpacePass"], 
        [200, "OK", "EmptyFullName"], 
        [200, "OK", "SpaceFullName"], 
        [200, "OK", "EmptyListSortType"], 
        [200, "OK", "SpaceListSortType"],
        [200, "OK", "HighListSortType"],
        [200, "OK", "AlphanumericListSortType"],
        [200, "OK", "EmptyFirstDayOfWeek"], 
        [200, "OK", "SpaceFirstDayOfWeek"],
        [200, "OK", "HighFirstDayOfWeek"],
        [200, "OK", "AlphanumericFirstDayOfWeek"]
    ])("Verify that %i %s status code with error message result when a GET request to the 'user.json' endpoint is executed using an %s", (statusCode, statusTest, key) => {
        return HttpRequestManager.makeRequest('PUT', userByIdURI.replace("{id}", id), payloadList.Invalid.PUT[key], 'user-two')
        .then(function (response) {
            expect(response.status).toBe(statusCode);
            expect(response.statusText).toBe(statusTest);
            expect(response.data).toEqual(errors.InvalidInputData);
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
    })
})