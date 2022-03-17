<?php

namespace ApiControllers;

use Firebase\JWT\JWT;
use Controllers\Controller;
use Gateways\UserGateway;

/**
 * Processes Authentication requests 
 * and generates tokens upon successful authentication.
 * @param Request $request
 * @param JSONResponse $response
 * @author Matas Pugzlys w19006600
 */
class ApiAuthenticateController extends Controller
{
    protected function setGateway()
    {
        $this->gateway = new UserGateway();
    }
    
    /**
     * Processes posted details and generates token upon successful authentication.
     * Only supports POST request method. Other methods get a 405 status code response. 
     * Unsuccessful authentication results in a status code 401 unauthorised message to the request.
     * @param string username
     * @param string password
     * @author Matas Pugzlys w19006600
     */
    protected function processRequest()
    {
        $data = [];

        $username = $this->getRequest()->getParameter("username");
        $password = $this->getRequest()->getParameter("password");

        // Only support POST requests
        // Return a 405 status otherwise
        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!is_null($username) && !is_null($password)) {

                $this->getGateway()->findPassword($username);

                if (count($this->getGateway()->getResult()) == 1) {
                    $hashpassword = $this->getGateway()->getResult()[0]['password'];
                    if (password_verify($password, $hashpassword)) {
                        $key = SECRET_KEY;

                        // The token will contain two items of data, a
                        // user_id and an exp (expiry) time, which is 30 minutes from now. 
                        $payload = array(
                            "user_id" => $this->getGateway()->getResult()[0]['id'],
                            "exp" => time() + 1800
                        );

                        // Use the JWT class to encode the token
                        $jwt = JWT::encode($payload, $key, 'HS256');
                        $data = ['token' => $jwt];
                    }
                }
            }
            // If the token was not created then
            // return a 401 unauthorised response.
            if (!array_key_exists('token', $data)) {
                $this->getResponse()->setMessage("Unauthorized");
                $this->getResponse()->setStatusCode(401);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
        return $data;
    }
}
