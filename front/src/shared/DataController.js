import { RemoveToken } from "./AuthenticationHandler";

/**
 * @description Scaffolds and executes a fetch request based on provided parameters
 * @author Matas Pugzlys w19006600
 * @param controller api endpoint name
 * @param method 'GET' 'POST' 'PUT' 'DELETE'
 * @param data data passed in request body, will be JSONified
 * @param urlParams key=value pairs for URL parameters
 */
export default class DataController {
    baseUrl = "http://unn-w19006600.newnumyspace.co.uk/year3/test/api/";

    constructor(controller, method = "GET", data = null, urlParams = null) {
        this.controller = controller;
        this.method = method;
        this.data = data;
        this.urlParams = urlParams;
    }

    async fetchData() {
        // if some params are not set the query cannot be executed
        if (!(this.controller && this.method)) return [];
        const url =
            this.urlParams != null
                ? this.baseUrl + this.controller + "?" + this.urlParams
                : this.baseUrl + this.controller;
        const fetchParams =
            this.method !== "GET"
                ? { body: this.data, method: this.method, headers: new Headers() }
                : { method: this.method };
        return await fetch(url, fetchParams)
            .then((response) => {
                // 401 means user is not authenticated/token expired, therefore, needs to be removed
                if (response.status === 401) RemoveToken();
                if (response.status === 200 || response.status === 401) return response.json();
                else throw Error(response.statusText);
            })
            .then((data) => {
                return data.results;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
