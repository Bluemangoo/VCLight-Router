export default interface RequestContext {
    readonly url: any;
    readonly query: any;
    readonly body: any;
    readonly cookies: any;
    readonly method: string;
}