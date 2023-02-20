import { readFileSync } from "fs";
import CONTENT_TYPE from "../static/const/CONTENT_TYPE";

export async function error404(data, response) {
    response.contentType = CONTENT_TYPE.HTML;
    response.response = require("ejs").render(readFileSync(process.cwd() + "/public/404.ejs").toString(), {
        url: data.url
    });
    response.status = 404;
}
