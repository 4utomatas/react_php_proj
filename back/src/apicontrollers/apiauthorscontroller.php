<?php

namespace ApiControllers;

use Controllers\Controller;
use Gateways\AuthorGateway;

/**
 * Processes Authors related queries. Returns results based on received parameters.
 * @param Request $request
 * @param JSONResponse $response
 * @author Matas Pugzlys w19006600
 */
class ApiAuthorsController extends Controller
{
    protected function setGateway()
    {
        $this->gateway = new AuthorGateway();
    }

    /**
     * Processes sent details and selects which method to use to get results.
     * @param int $id
     * @author Matas Pugzlys w19006600
     */
    protected function processRequest()
    {
        $id = $this->getRequest()->getParameter("id");
        if ($this->getRequest()->getRequestMethod() === "GET") {
            if (!is_null($id)) {
                $this->getGateway()->findOne($id);
            } else {
                $this->getGateway()->findAll();
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
        return $this->getGateway()->getResult();
    }
}
