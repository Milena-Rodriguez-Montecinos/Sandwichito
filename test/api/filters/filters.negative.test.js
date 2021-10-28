import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payload from "../../../src/resources/payloads/payloads.filters.json";
import logger from "../../../src/utils/logger"

const filtersURIID = endpointsList.endpoints.filter.filtersByID;
const filtersById = endpointsList.endpoints.filter.filtersByID;
let beforePostId = "";

describe("Negative tests of filters feature from Todo.ly website", () => {

    test.skip.each`
        statusCode | statusText                    | key                 | statusTitle
        ${200}     | ${"OK"}                       | ${"PositiveNumber"} | ${"positive number"}
        ${500}     | ${"Internal Server Error"}    | ${"Words"}          | ${"a string"}
        ${200}     | ${"OK"}                       | ${"NonExistent"}    | ${"a non-existent "}
        ${404}     | ${"Not Found"}                | ${"Empty"}          | ${"an empty"}
        ${500}     | ${"Internal Server Error"}    | ${"Space"}          | ${"just a space"}
        ${500}     | ${"Internal Server Error"}    | ${"DecimalNumber"}  | ${"a decimal"}
    `(
        "Verify that it returns the filter with the given ID",
        ({ statusCode, statusText, key }) => {
            return HttpRequestManager.makeRequest(
                "GET",
                filtersURIID.replace("{id}", beforePostId),
                payload.Invalid.ProjectID[key]
            )
                .then(function (response) {
                    expect(response.data).not.toEqual(errors.Authentication);
                    expect(response.status).toBe(statusCode);
                    expect(response.statusText).toMatch(statusText);
                })
                .catch(function (error) {
                    logger.error(error)
                    throw error;
                });
        },
        20000
    );
});
