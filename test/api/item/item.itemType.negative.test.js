import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payload from "../../../src/resources/payloads/payloads.items.json";
import logger from "../../../src/utils/logger"

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

        await HttpRequestManager.makeRequest(
            "DELETE",
            itemsURIID.replace("{id}", beforePostId)
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
    }, 20000);

    test.each`
    statusCode | statusText | key                 | statusTitle
    ${200}     | ${"OK"}    | ${"NegativeNumber"} | ${"negative number"}
    ${200}     | ${"OK"}    | ${"Words"}          | ${"a string"}
    ${200}     | ${"OK"}    | ${"NonExistent"}    | ${"a non-existent"}
    ${200}     | ${"OK"}    | ${"Empty"}          | ${"an empty"}
    ${200}     | ${"OK"}    | ${"Space"}          | ${"just a space"}
    ${200}     | ${"OK"}    | ${"DecimalNumber"}  | ${"a decimal"}
`(
    "Verify that I get a error status code when a PUT request to the 'items/[id].json' is sent with $statusTitle value in 'ItemType' variable",
    ({ statusCode, statusText, key }) => {
        return HttpRequestManager.makeRequest(
            "PUT",
            itemsURIID.replace("{id}", beforePostId),
            payload.Invalid.ItemType[key]
        )
            .then(function (response) {
                expect(response.status).toBe(statusCode);
                expect(response.statusText).toMatch(statusText);
                expect(response.data).toEqual(errors.InvalidInputData);
            })
            .catch(function (error) {
                logger.error(error)
                throw error;
            });
    },
    20000
);
});
