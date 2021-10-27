import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payload from "../../../src/resources/payloads/payloads.filters.json";
import logger from "../../../src/utils/logger"

const filtersURIID = endpointsList.endpoints.filter.filtersByID;
const filtersURI = endpointsList.endpoints.filter.filters;
let afterPostId = "";
let beforePostId = "";
describe("smoke test from Filters", () => {
    beforeAll(() => {
        logger.info("SetUp done")
        return HttpRequestManager.makeRequest(
            "POST",
            filtersURI,
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
    }, 5000);

    afterAll(() => {
        logger.info("TearDown done")
        return HttpRequestManager.makeRequest(
            "DELETE",
            filtersURIID.replace("{id}", afterPostId)
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
    });

    test("Verify returns the list of Done Items within the given filter when a GET request to the 'filter/filters.json' is sent", () => {
        return HttpRequestManager.makeRequest(
            "GET",
            filtersURI,
            payload.ProjectById.GET
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
