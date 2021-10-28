import HttpRequestManager from '../../../src/common/api/http.request.manager'
import endpointsList from '../../../src/resources/endpoints.json'
import payloadList from '../../../src/resources/payloads/payloads.user.json'
import errors from '../../../src/resources/errors.json'

const userURI = endpointsList.endpoints.users.user;
let userByIdURI = endpointsList.endpoints.users.userById;
let id = ''

describe('User POST request negative test', () => {

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
        [200, "OK", "NoEmail", "InvalidEmailAddress"],
        [200, "OK", "NoFullName", "InvalidFullName"],
        [200, "OK", "NoPassword", "PasswordTooShort"]
    ])("Verify that %i %s status code with error message result when a POST request to the 'user.json' endpoint is executed using an invalid request", (statusCode, statusTest, key, errorKey) => {
        return HttpRequestManager.makeRequest('POST', userURI, payloadList.Invalid.POST[key], 'user-two')
        .then(function (response) {
            expect(response.status).toBe(statusCode);
            expect(response.statusText).toBe(statusTest);
            expect(response.data).toEqual(errors[errorKey]);
            id = response.data.Id;
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })
    })
})