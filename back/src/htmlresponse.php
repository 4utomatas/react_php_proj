<?php

/**
 * Used to construct HTML Responses to requests.
 * @author Matas Pugzlys w19006600
 */
class HTMLResponse extends Response
{
    protected function headers()
    {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: text/html; charset=UTF-8");
    }
}
