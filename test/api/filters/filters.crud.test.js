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
            expect(response.data).not.toEqual(errors.Authentication);
            afterPostId = response.data.Id
        })
        .catch(function (error) {
            logger.error(error);
            throw error;
        });
    });
});
