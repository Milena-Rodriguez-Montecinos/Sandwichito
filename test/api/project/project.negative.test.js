import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpointsList from "../../../src/resources/endpoints.json"
import errors from "../../../src/resources/errors.json"
import payloadList from "../../../src/resources/payloads/payloads.project.json"

const projectsURI = endpointsList.endpoints.project.projects
let projectByIdURI  = endpointsList.endpoints.project.projectById
let id = '1234567890'
let postID = ''

describe("Project tests",() => {
    beforeAll(()=> {
        ;
    })

    afterAll(()=> {
        ;
    })

    test('Verify that I a 304 Invalid Project Id status code result when a GET request to the "projects/{id}.json" endpoint is executed', async()=>{
        await HttpRequestManager.makeRequest('GET',projectByIdURI.replace('{id}',id))
        .then(function(response) {
            expect(response.status).toBe(200)
            expect(response.statusText).toMatch("OK")
            expect(response.data).toEqual(errors.ErrorCode.NoAccessToProject)
        })
        .catch(function (error) {
            console.log(error)
            throw error
        })

    },10000)

})
