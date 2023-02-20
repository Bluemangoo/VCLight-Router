import CONTENT_TYPE from "../static/const/CONTENT_TYPE";
import CookieElement from "./cookieElement";

export default class ResponseContext {
    public redirect: boolean = false;
    public redirectUrl: string = "/";
    public status: number = 200;
    public contentType: string = CONTENT_TYPE.TEXT;
    public cache: number = 0;
    public response: any = "";
    public cookie: CookieElement[] = [];
}