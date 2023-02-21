import CookieElement from "./cookieElement";

export default class ResponseContext {
    public redirect: boolean = false;
    public redirectUrl: string = "/";
    public status: number = 200;
    public contentType: string = "text/plain";
    public cache: number = 0;
    public response: any = "";
    public cookie: CookieElement[] = [];
}
