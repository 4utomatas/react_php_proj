<?php

/**
 * Used to construct HTML and JSON responses to requests
 * @author Matas Pugzlys w19006600
 */
abstract class Response
{
    protected $data;

    public function __construct()
    {
        $this->headers();
    }

    public function setData($data)
    {
        $this->data = $data;
    }

    public function getData()
    {
        return $this->data;
    }

    protected function headers()
    {
    }
}
