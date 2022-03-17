<?php

namespace ApiControllers;

use Controllers\Controller;

/**
 * Processes /api queries and returns author's details with some basic information about the project.
 * @param Request $request
 * @param JSONResponse $response
 * @author Matas Pugzlys w19006600
 */
class ApiBaseController extends Controller
{
    protected function processRequest()
    {
        if ($this->getRequest()->getRequestMethod() === "GET") {
            $data['author']['name'] = "Matas Pugzlys";
            $data['author']['id'] = "w19006600";
            $data['message'] = "This is a basic Web API for Northumbria University coursework of KF6012 module. It allows the user to be authenticated and retrieve their reading list. It is also possible to retrieve information on Scientific papers and their authors.";
            $data['documentation'] = "http://unn-w19006600.newnumyspace.co.uk/kf6012/coursework/part1/documentation";
            return $data;
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }
}
