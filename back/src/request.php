<?php

/** 
 * Handles requests from the client. Prepares the URL, gets parameters, determines request type.
 *
 * @author Matas Pugzlys w19006600
 * 
 * @var url fetched path requested by the client
 */
class Request
{

    private $basepath = BASEPATH;
    private $path;

    public function __construct()
    {
        $this->path = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->path = strtolower(str_replace($this->basepath, "", $this->path));
        $this->path = trim($this->path, "/");
    }

    public function getPath()
    {
        return $this->path;
    }

    public function getParameter($param)
    {
        if ($this->getRequestMethod() === 'POST')
            $param = filter_input(INPUT_POST, $param, FILTER_SANITIZE_SPECIAL_CHARS);
        else $param = filter_input(INPUT_GET, $param, FILTER_SANITIZE_SPECIAL_CHARS);
        return $param;
    }

    public function getRequestType()
    {
        if ('api' == substr($this->getPath(), 0, 3)) {
            return 'api';
        }
        return 'html';
    }

    public function getRequestMethod()
    {
        return $_SERVER['REQUEST_METHOD'];
    }
}
