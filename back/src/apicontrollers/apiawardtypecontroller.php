<?php

namespace ApiControllers;

use Controllers\Controller;
use Gateways\AwardTypeGateway;

/**
 * Processes Award Types related queries.
 * @param Request $request
 * @param JSONResponse $response
 * @author Matas Pugzlys w19006600
 */
class ApiAwardTypeController extends Controller
{
    protected function setGateway()
    {
        $this->gateway = new AwardTypeGateway();
    }
 
    /**
     * Returns Award Types if the request method is GET
     * @author Matas Pugzlys w19006600
     */
    protected function processRequest()
    {
        if ($this->getRequest()->getRequestMethod() === "GET") {
            $this->getGateway()->findAll();
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
        return $this->getGateway()->getResult();
    }
}
