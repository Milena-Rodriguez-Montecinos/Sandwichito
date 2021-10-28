import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payload from "../../../src/resources/payloads/payloads.filters.json";
import logger from "../../../src/utils/logger"

const filtersURI = endpointsList.endpoints.filter.filters;
let afterPostId = "";

describe("smoke test from Filters", () => {

    test("Verify returns the list of Items within the given filter when a GET request to the 'filter/filters.json' is sent", () => {
        return HttpRequestManager.makeRequest(
            "GET",
            filtersURI
        )
        .then(function (response) {
            expect(response.status).toBe(200);
            expect(response.statusText).toMatch("OK");
            afterPostId = response.data.Id
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        });
    });

    test('Verify that a 200 OK status code is obtained when executing a GET request to the endpoint "/filters.json to return the filter with the given Id', async()=>{
        return HttpRequestManager.makeRequest('GET', filtersURI.replace('{id}', afterPostId), '', 'user-two')

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

    test('Verify that a 200 OK status code is obtained when executing a GET request to the endpoint "/filters.json to return the filter with the given Id 0', async()=>{
        return HttpRequestManager.makeRequest('GET', filtersURI, payload.ProjectById.GET.ID0 , 'user-two')
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

    test('Verify that a 200 OK status code is obtained when executing a GET request to the endpoint "filters/[id].json to return the filter with the given Id 1', async()=>{
        return HttpRequestManager.makeRequest('GET', filtersURI, payload.ProjectById.GET.ID1 , 'user-two')
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

    test('Verify that a 200 OK status code is obtained when executing a GET request to the endpoint "filters/[id].json to return the filter with the given Id 2', async()=>{
        return HttpRequestManager.makeRequest('GET', filtersURI, payload.ProjectById.GET.ID2 , 'user-two')
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
    
    test('Verify that a 200 OK status code is obtained when executing a GET request to the endpoint "filters/[id].json to return the filter with the given Id 3', async()=>{
        return HttpRequestManager.makeRequest('GET', filtersURI, payload.ProjectById.GET.ID3 , 'user-two')
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

    test('Verify that a 200 OK status code is obtained when executing a GET request to the endpoint "filters/[id]/items.json to return the items of a filter', async()=>{
        return HttpRequestManager.makeRequest('GET', filtersURI)
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
});
