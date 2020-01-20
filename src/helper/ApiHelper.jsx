import Axios from "axios";
import { AppConfig } from "../config/Appconfig";
import { ErrorHandlerHelper } from "./ErrorHandlerHelper";
import { logger } from "./Logger";
import { SuccessHandlerHelper } from "./SuccessHandlerHelper";
/**
 * ApiHelper Class - For making Api Requests
 */
let CancelToken = Axios.CancelToken;
let cancel;

export class ApiHelper {
  _portalGateway;
  _apiVersion;

  constructor() {
    this._portalGateway = AppConfig.API_ENDPOINT;
    this._apiVersion = AppConfig.API_VERSION;
    this.source = Axios.CancelToken.source();
    this.cancelToken = this.source.token;
  }
  setHost = host => {
    this._portalGateway = host;
  };
  setApiVersion = version => {
    this._apiVersion = version;
  };
  /**
   * Fetches from the Gateway defined by the instantiated object. Accepts <T> as output object.
   * @example <caption>"/Auth/UserAccount", "/GetCurrentUser", "GET", "JWT Content"</caption>
   * @param {service} service - wanting to be access ex. "UserAuth/Auth"
   * @param {endpoint} endpoint - you wish to call ex. "/Login"
   * @param {method} mehotd - method (GET, UPDATE, DELETE, POST)
   * @param {jwt} JWT - JSON Web Token (Optional)
   * @param {queryOptions} Query - query options for "GET" methods (Optional)
   * @param {body} body - JSON body for "UPDATE, DELETE and POST" methods (Optional)
   */
  async FetchFromServer(
    service,
    endpoint,
    method,
    authenticated = false,
    queryOptions = undefined,
    body = undefined,
    cancelToken
  ) {
    let url = this._portalGateway + this._apiVersion + service + endpoint;
    let headers = { "Content-Type": "application/json" };
    if (authenticated) {
      const storageSession = localStorage.getItem("token");
      headers.Authorization = storageSession;
    }

    try {
      method = method.toLowerCase();
      let response = await Axios.request({
        method,
        url,
        data: body,
        headers: headers,
        params: queryOptions,
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      });

      if (response.ok === false || response.status !== 200) {
        let errorObject = {
          code: response.status,
          data: response.data
        };

        throw errorObject;
      }
      const data = new SuccessHandlerHelper(response.data);
      return data.data;
    } catch (err) {
      if (Axios.isCancel(err) || !err.response) {
        return {
          isError: true,
          error: "Request cancelled",
          messages: err.message === "cancel" ? [] : ["Request cancelled"]
        };
      } else {
        const errorHelper = new ErrorHandlerHelper(err.response);
        logger(err.response);
        return errorHelper.error;
      }
    }
  }
  /**
   * Upload data in multipart.
   */
  async UploadVideo(service, endpoint, body, progressCallback) {
    let fd = new FormData();
    for (const k in body) {
      if (body.hasOwnProperty(k)) {
        const element = body[k];
        if (k === "characteristic") {
          fd.append(k, JSON.stringify(element));
        } else {
          fd.append(k, element);
        }
      }
    }

    let url = this._apiVersion + service + endpoint;
    let options = { method: "POST" };
    options.headers = {};
    const storageSession = localStorage.getItem("token");
    options.headers.Authorization = storageSession;

    try {
      let response = await Axios.post(`${this._portalGateway}${url}`, fd, {
        headers: options.headers,
        onUploadProgress: progressCallback,
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      });

      if (response.status < 200 || response.status >= 300) {
        let errorObject = {
          code: response.status,
          response: response.data
        };
        throw errorObject;
      }
      const data = new SuccessHandlerHelper(response.data);
      return data.data;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log("%s Req Cancelled", err);
      }
      const errorHelper = new ErrorHandlerHelper(err.response);
      return errorHelper.error;
    }
  }
  /**
   * Cancels the last request.
   */
  cancelRequest = err => {
    cancel && cancel(err);
  };
}
