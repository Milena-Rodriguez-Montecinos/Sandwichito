import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payload from "../../../src/resources/payloads/payloads.items.json";
import logger from "../../../src/utils/logger/logger.items"

const itemsURIID = endpointsList.endpoints.item.itemsById;
const itemsURI = endpointsList.endpoints.item.items;
let afterPostId = [];
let beforePostId = "";

describe("Negative tests of Items feature from Todo.ly website", () => {
    beforeAll(() => {
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
                logger.error(error)
                throw error;
            });
    }, 20000);

    afterAll(async () => {
        for (let id = 0; id < afterPostId.length; id++) {
            await HttpRequestManager.makeRequest(
                "DELETE",
                itemsURIID.replace("{id}", id)
            )
                .then(function (response) {
                    expect(response.status).toBe(200);
                    expect(response.statusText).toMatch("OK");
                    expect(response.data).not.toEqual(errors.Authentication);
                })
                .catch(function (error) {
                    logger.error(error)
                    throw error;
                });
        }
    }, 20000);

    test("Verify that get an error status code in the body response when a non authorized user cannot create an Item", () => {
        return HttpRequestManager.makeRequest(
            "POST",
            itemsURI,
            payload.ProjectById.POST,
            false
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).toEqual(errors.Authentication);
                afterPostId.push(response.data.Id);
            })
            .catch(function (error) {
                logger.error(error)
                throw error;
            });
    }, 20000);

    test("Verify that get an error status code in the body when an Item 'Content' is created with an empty value", () => {
        return HttpRequestManager.makeRequest(
            "POST",
            itemsURI,
            payload.Invalid.Content.Empty
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).toEqual(errors.TooShortItemName);
                afterPostId.push(response.data.Id);
            })
            .catch(function (error) {
                logger.error(error)
                throw error;
            });
    }, 20000);

    test("Verify that get an error status code in the body when an Item 'Content' is changed with an empty value", () => {
        return HttpRequestManager.makeRequest(
            "PUT",
            itemsURIID.replace("{id}", beforePostId),
            payload.Invalid.Content.Empty
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).toEqual(errors.TooShortItemName);
                afterPostId.push(response.data.Id);
            })
            .catch(function (error) {
                logger.error(error)
                throw error;
            });
    }, 20000);
});
