import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payload from "../../../src/resources/payloads/payloads.items.json";
import logger from "../../../src/utils/logger";

const itemsURIID = endpointsList.endpoints.item.itemsById;
const itemsURI = endpointsList.endpoints.item.items;
const doneRootItem = endpointsList.endpoints.item.DoneRootItem;
const rootItem = endpointsList.endpoints.item.RootItem;
let afterPostId = "";
let beforePostId = "";
describe("smoke test from Items", () => {
    beforeAll(() => {
        logger.info("SetUp done");
        return HttpRequestManager.makeRequest(
            "POST",
            itemsURI,
            payload.ProjectById.POST
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                beforePostId = response.data.Id;
            })
            .catch(function (error) {
                logger.error(error);
                throw error;
            });
    }, 20000);

    afterAll(() => {
        logger.info("TearDown done");
        return HttpRequestManager.makeRequest(
            "DELETE",
            itemsURIID.replace("{id}", afterPostId)
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                logger.error(error);
                throw error;
            });
    }, 20000);

    test("Verify that a 200 OK status code result is given back when a GET request to the 'items/items.json' is sent", () => {
        return HttpRequestManager.makeRequest("GET", itemsURI)
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                logger.error(error);
                throw error;
            });
    }, 20000);

    test("Verify if an item is created when a POST request to the 'items/items.json' is sent", () => {
        return HttpRequestManager.makeRequest(
            "POST",
            itemsURI,
            payload.ProjectById.POST
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                afterPostId = response.data.Id;
            })
            .catch(function (error) {
                logger.error(error);
                throw error;
            });
    }, 20000);

    test("APT-004 Verify that an item is changed when a PUT request to the 'items/[id].json' is sent", () => {
        return HttpRequestManager.makeRequest(
            "PUT",
            itemsURIID.replace("{id}", beforePostId),
            payload.ProjectById.PUT
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                logger.error(error);
                throw error;
            });
    }, 20000);

    test("Verify that an item is deleted when a DELETE request to the 'items/[id].son' is sent", () => {
        return HttpRequestManager.makeRequest(
            "DELETE",
            itemsURIID.replace("{id}", beforePostId)
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                logger.error(error);
                throw error;
            });
    }, 20000);

    test("Verify that a 200 OK status code result is given back when a GET Root Item By child Id request to the 'items/items.json' is sent", () => {
        return HttpRequestManager.makeRequest("GET", rootItem)
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                logger.error(error);
                throw error;
            });
    }, 20000);

    test("Verify that a 200 OK status code result is given back when a GET Done Root Item By child Id request to the 'items/items.json' is sent", () => {
        return HttpRequestManager.makeRequest("GET", doneRootItem)
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                logger.error(error);
                throw error;
            });
    }, 20000);
});
