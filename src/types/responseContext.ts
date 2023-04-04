import CookieElement from "./cookieElement";
import { Response, ResponseBuilder } from "vclight";

export default class ResponseContext {
    constructor(responseContent?: Response) {
        if (responseContent) {
            this.status = responseContent.status;
            this.response = responseContent.response;
            this.builder = responseContent.builder;
            this.redirect = responseContent.redirect;
            this.redirectUrl = responseContent.redirectUrl;
        }
    }

    public redirect: boolean | undefined;
    public redirectUrl: string | undefined;
    public status: number = 200;
    public contentType: string | undefined;
    public builder: ResponseBuilder | undefined;
    public cache: number | undefined;
    public response: any;
    public cookie: CookieElement[] = [];
}
