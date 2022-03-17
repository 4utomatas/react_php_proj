<?php

namespace ApiControllers;

use Controllers\Controller;
use Gateways\ReadingListGateway;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

/**
 * Processes Reading List related queries. Returns results based on received parameters.
 * @param Request $request
 * @param JSONResponse $response
 * @author Matas Pugzlys w19006600
 */
class ApiReadingListController extends Controller
{
    protected function setGateway()
    {
        $this->gateway = new ReadingListGateway();
    }

    /**
     * Processes sent details and selects which method to use to get results.
     * @param string $token
     * @param int $add paper id to add to reading list
     * @param int $remove paper id to remove from reading list
     * @author Matas Pugzlys w19006600
     */
    protected function processRequest()
    {
        $token = $this->getRequest()->getParameter("token");
        $add = $this->getRequest()->getParameter("add");
        $remove = $this->getRequest()->getParameter("remove");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!is_null($token)) {
                try {
                    $key = SECRET_KEY;
                    $decoded = JWT::decode($token, new Key($key, 'HS256'));
                    $userId = $decoded->user_id;

                    // Check what action to do
                    if (!is_null($add) && !is_null($userId)) {
                        $this->getGateway()->add($userId, $add);
                    } elseif (!is_null($remove) && !is_null($userId)) {
                        $this->getGateway()->remove($userId, $remove);
                    } elseif (!is_null($userId)) {
                        $this->getGateway()->findByUser($userId);
                    }
                } catch (ExpiredException $e) {
                    $this->getResponse()->setMessage("Unauthorized");
                    $this->getResponse()->setStatusCode(401);
                }
            } else {
                $this->getResponse()->setMessage("Unauthorized");
                $this->getResponse()->setStatusCode(401);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
        return $this->getGateway()->getResult();
    }
}
