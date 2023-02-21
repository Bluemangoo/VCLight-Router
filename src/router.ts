import ResponseContext from "./types/responseContext";
import RequestContext from "./types/requestContext";
import * as url from "url";
import { serialize } from "cookie";
import { Response, Plugin } from "vclight";
import buildInRouters from "./buildInRouters";

interface Pattern {
    pattern: RegExp;
    fn: (data: RequestContext, response: ResponseContext) => void;
}

export default class VCLightRouter implements Plugin {
    constructor(config: {} = {}) {
        this.config = this.mergeConfig(config);
        if (this.config.buildInRouters._404) {
            this.on("/404/", buildInRouters.error404);
        }
    }

    readonly config: {
        buildInRouters: {
            _404: boolean;
        };
    };

    mergeConfig(config: any) {
        const defaultConfig = {
            buildInRouters: {
                _404: true
            }
        };

        let mergedConfig = { ...defaultConfig, ...config };
        mergedConfig.buildInRouters = { ...defaultConfig.buildInRouters, ...mergedConfig.buildInRouters };

        return mergedConfig;
    }

    public on(event: string, fn: (data: RequestContext, response: ResponseContext) => void) {
        if (this.events[event]) {
            console.warn(`Warning: event ${event} have been redefined`);
        }
        this.events[event] = fn;
    }

    public pattern(pattern: RegExp, fn: (data: RequestContext, response: ResponseContext) => void) {
        this.eventPatterns[this.eventPatterns.length] = { pattern, fn };
    }

    public get(event: string): (data: RequestContext, response: ResponseContext) => void {
        if (this.events?.[event]) {
            return this.events?.[event];
        }

        if (event[event.length - 1] !== "/" && this.events?.[(event + "/")]) {
            return this.events?.[(event + "/")];
        }

        for (const pattern in this.eventPatterns) {
            if (this.eventPatterns[pattern].pattern.test(event)) {
                return this.eventPatterns[pattern].fn;
            }
        }
        return this.events["/404/"];
    }

    private events: {
        [key: string]: any;
    } = {};
    private eventPatterns: Pattern[] = [];

    async init(): Promise<void> {
        return Promise.resolve(undefined);
    }

    async process(request: any, response: any, responseContent: Response): Promise<void> {

        //finding process function
        const parsedUrl = url.parse(request.url);
        const fn: (data: RequestContext, response: ResponseContext) => void = this.get(<string>parsedUrl.pathname);

        //prepare request data
        const requestContext: RequestContext = {
            url: parsedUrl.pathname,
            query: request.query,
            cookies: request.cookies,
            method: request.method
        };
        const responseContext = new ResponseContext();

        //processing
        await fn(requestContext, responseContext);

        //process response
        responseContent.load(responseContext);
        if (responseContent.redirect) {
            return;
        }

        let cookie = [];
        for (const cookieElement of responseContext.cookie) {
            cookie[cookie.length] = serialize(cookieElement.name, cookieElement.val, {
                httpOnly: true,
                expires: cookieElement.expires,
                path: "/"
            });
        }
        if (cookie.length > 0) {
            response.setHeader("Set-Cookie", cookie);
        }

        response.setHeader("content-type", responseContext.contentType);
        if (responseContext.cache > 0) {
            response.setHeader("cache-control", "stale-while-revalidate=" + responseContext.cache.toString());
        }
    }

    async after(request: any, response: any, responseContent: Response): Promise<void> {
    }
}
