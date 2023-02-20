import CONTENT_TYPE from "../static/const/CONTENT_TYPE";
import RequestContext from "../types/requestContext"
import ResponseContext from "../types/responseContext"

export async function error404(data: RequestContext, response:ResponseContext) {
    response.contentType = CONTENT_TYPE.HTML;
    response.status = 404;
    response.response = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        div {
            margin: 9% auto;
            width: 500px;
            height: 400px;
            font: 15px/22px arial, sans-serif;
        }

        code {
            font: 15px/22px arial, sans-serif;
            background-color: lightgoldenrodyellow;
        }

        #index {
            font: 18px/25px arial, sans-serif;
            color: #777;
            width: 420px;
            text-align: right;
        }

        a {
            color: #777;
            text-underline: #777;
        }

        a:hover {
            color: deepskyblue;
            text-underline: deepskyblue;
        }
    </style>
    <title>Error 404: Not Found</title>
</head>
<body>
<div>
    <h1>Error</h1>
    <b>404</b>. That&apos;s an error.
    <br>
    <br>
    The requested URL <code>${data.url}</code> was not found on this server.
    <br>
    <br>
    <p id="index"><span>>> Return to <a href="/">index</a></span></p>
</div>
</body>
</html>`
}
