export default interface RequestContext {
    readonly url: any;
    readonly query:any;
    readonly cookies: any;
    readonly method:string;
}