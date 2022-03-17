<?php

namespace Controllers;

/**
 * Base class for creating Controllers that handle requests based on their parameters.
 * @param Request $request
 * @param Response $response
 * @author Matas Pugzlys w19006600
 */
abstract class Controller
{
    private $request;
    private $response;
    protected $gateway;

    public function __construct($request, $response)
    {
        $this->setGateway();
        $this->setRequest($request);
        $this->setResponse($response);

        $data = $this->processRequest();
        $this->getResponse()->setData($data);
    }

    private function setRequest($request)
    {
        $this->request = $request;
    }

    protected function getRequest()
    {
        return $this->request;
    }

    private function setResponse($response)
    {
        $this->response = $response;
    }

    protected function getResponse()
    {
        return $this->response;
    }
    // Each class that extends this implements this function with a different Gateway
    protected function setGateway()
    {
    }

    protected function getGateway()
    {
        return $this->gateway;
    }
    // Each class that extends this implements this function differently
    protected function processRequest()
    {
    }
}
