<?php

include('config/config.php');
$request = new Request();

if (substr($request->getPath(), 0, 3) === "api") {
    $response = new JSONResponse();
} else {
    set_exception_handler("HTMLexceptionHandler");
    $response = new HTMLResponse();
}

/**
 * Based on the prepared request path, a controller is selected to prepare a response.
 */
switch ($request->getPath()) {
    case '':
    case 'home':
        $controller = new \Controllers\HomeController($request, $response);
        break;
    case 'documentation':
        $controller = new \Controllers\DocumentationController($request, $response);
        break;
    case 'api':
        $controller = new \ApiControllers\ApiBaseController($request, $response);
        break;
    case 'api/authors':
        $controller = new \ApiControllers\ApiAuthorsController($request, $response);
        break;
    case 'api/papers':
        $controller = new \ApiControllers\ApiPapersController($request, $response);
        break;
    case 'api/authenticate':
        $controller = new \ApiControllers\ApiAuthenticateController($request, $response);
        break;
    case 'api/readinglist':
        $controller = new \ApiControllers\ApiReadingListController($request, $response);
        break;
    case 'api/awardtype':
        $controller = new \ApiControllers\ApiAwardTypeController($request, $response);
        break;
    default:
        if ($request->getRequestType() == 'api') {
            $controller = new \ApiControllers\ApiErrorController($request, $response);
        } else {
            $controller = new \Controllers\HTMLErrorController($request, $response);
        }
        break;
}

echo $response->getData();
