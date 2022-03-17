<?php

namespace ApiControllers;

use Controllers\Controller;

/**
 * Processes Api Requests that do not have a dedicated controller, so an error response is sent.
 * @param Request $request
 * @param JSONResponse $response
 * @author Matas Pugzlys w19006600
 */
class ApiErrorController extends Controller
{
    protected function processRequest()
    {
        $this->getResponse()->setStatusCode(404);
        $this->getResponse()->setMessage("Error 404: Nothing was found at this address");
        // an array is expected
        return [];
    }
}
