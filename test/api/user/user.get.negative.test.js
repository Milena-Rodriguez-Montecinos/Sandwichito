import HttpRequestManager from '../../../src/common/api/http.request.manager'
import endpointsList from '../../../src/resources/endpoints.json'
import payloadList from '../../../src/resources/payloads/payloads.user.json'
import errors from '../../../src/resources/errors.json'
import logger from '../../../src/utils/logger/logger.user'

const userURI = endpointsList.endpoints.users.user;
let userByIdURI = endpointsList.endpoints.users.userById;
let id = ''

describe('User GET request negative test', () => {

    beforeAll(() => {
        return HttpRequestManager.makeRequest('POST', userURI, payloadList.Valid.POST.Five, 'user-five')
        .then(function (response) {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe("OK");
            expect(response.data).not.toEqual(errors.Authentication);
            id = response.data.Id;
        })
        .catch(function (error) {
            logger.error(error)
            throw error
        })
    }, 20000)

    afterAll(() => {
        return HttpRequestManager.makeRequest('DELETE', userByIdURI.replace("{id}", id), '', 'user-five')
        .then(function (response) {
            expect(response.status).toBe(200);
            expect(response.statusText).toBe("OK")
            expect(response.data).not.toEqual(errors.Authentication);
        })  
        .catch(function (error) {
            logger.error(error)
            throw error
        })
    }, 20000)

    test.each([
        [200, "OK", "invalid-email", "NonExistentAccount"],
        [200, "OK", "invalid-pass", "Authentication"]        
    ])("Verify that %i %s status code with error message result when a GET request to the 'user.json' endpoint is executed using an %s", (statusCode, statusTest, credentials, errorKey) => {
        return HttpRequestManager.makeRequest('GET', userURI, '', credentials)
        .then(function (response) {
            expect(response.status).toBe(statusCode);
            expect(response.statusText).toBe(statusTest);
            expect(response.data).toEqual(errors[errorKey]);
        })
        .catch(function (error) {
            logger.error(error)
            throw error
        })
    }, 20000)
})