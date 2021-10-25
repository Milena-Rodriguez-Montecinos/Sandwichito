import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json";
import errors from "../../../src/resources/errors.json";
import payloadList from "../../../src/resources/payloads.json";

let projectsURI = endpointsList.endpoints.projects;
let projectByIdURI = endpointsList.endpoints.projectById;
let id = "";

describe("Project edit tests", () => {
    beforeAll(() => {
        return HttpRequestManager.makeRequest(
            "POST",
            projectsURI,
            payloadList.ProjectById.POST
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
                id = response.data.Id;
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    });

    afterAll(() => {
        return HttpRequestManager.makeRequest(
            "DELETE",
            projectByIdURI.replace("{id}", id)
        )
            .then(function (response) {
                expect(response.status).toBe(200);
                expect(response.statusText).toMatch("OK");
                expect(response.data).not.toEqual(errors.Authentication);
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    }, 5000);

    test.skip.each([
        [200, "OK", "NegativeNumber"],
        [200, "OK", "DecimalNumber"],
        [200, "OK", "Words"],
        [200, "OK", "AlphaNumeric"],
        [200, "OK", "Empty"],
    ])(
        "Verify that %i %s status code with error message result when a PUT request to the 'project/{id}.json' endpoint is executed using an invalid request",
        (statusCode, statusTest, key) => {
            return HttpRequestManager.makeRequest(
                "PUT",
                projectByIdURI.replace("{id}", id),
                payloadList.Invalid[key]
            )
                .then(function (response) {
                    expect(response.status).toBe(statusCode);
                    expect(response.statusText).toMatch(statusTest);
                    expect(response.data).toEqual(errors.InvalidInputData);
                })
                .catch(function (error) {
                    //console.log(error);
                    throw error;
                });
        }
    );

    test.each`
        statusCode | statusText | key
        ${200}     | ${'OK'}    | ${'NegativeNumber'}
        ${200}     | ${'OK'}    | ${'DecimalNumber'}
        ${200}     | ${'OK'}    | ${'Words'}
        ${200}     | ${'OK'}    | ${'AlphaNumeric'}
        ${200}     | ${'OK'}    | ${'Empty'}
    `(
        "Verify that $statusCode $statusText status code with error message result when a PUT request to the 'project/{id}.json' endpoint is executed using an invalid request",
        ({statusCode, statusText, key}) => {
            return HttpRequestManager.makeRequest(
                "PUT",
                projectByIdURI.replace("{id}", id),
                payloadList.Invalid[key]
            )
                .then(function (response) {
                    expect(response.status).toBe(statusCode);
                    expect(response.statusText).toMatch(statusText);
                    expect(response.data).toEqual(errors.InvalidInputData);
                })
                .catch(function (error) {
                    //console.log(error);
                    throw error;
                });
        }
    );
});
