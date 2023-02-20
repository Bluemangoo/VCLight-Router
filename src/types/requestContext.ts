export default interface RequestContext {
    readonly url;
    readonly query;
    readonly cookies;
    readonly method;
}