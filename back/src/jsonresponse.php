<?php

/**
 * Used to construct JSON responses to requests
 * @author Matas Pugzlys w19006600
 */
class JSONResponse extends Response
{
    private $message;
    private $statusCode;
    protected function headers()
    {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
    }

    public function setMessage($message)
    {
        $this->message = $message;
    }

    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
    }

    public function getData()
    {
        if (is_null($this->message)) {
            if (count($this->data) === 0) {
                $this->message = "No results";
                // the status code cannot be 204 as this will not return other fields such as count and message
                $this->statusCode = 200;
            } else {
                $this->message = "Ok";
                $this->statusCode = 200;
            }
        }

        // sets the status code
        http_response_code($this->statusCode);

        $response['message'] = $this->message;
        if (is_array($this->data)) {
            $response['count'] = count($this->data);
            $response['results'] = $this->data;
        } else {
            $response['count'] = 0;
        }
        return json_encode($response);
    }
}
