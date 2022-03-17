<?php

namespace ApiControllers;

use Controllers\Controller;
use Gateways\PaperGateway;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

/**
 * Processes Papers related queries. Returns results based on received parameters.
 * @param Request $request
 * @param JSONResponse $response
 * @author Matas Pugzlys w19006600
 */
class ApiPapersController extends Controller
{
    protected function setGateway()
    {
        $this->gateway = new PaperGateway();
    }

    /**
     * Processes sent details and selects which method to use to get results.
     * @param int $id Paper id
     * @param int $authorId Author id
     * @param int $award Award Type id
     * @param string $token JWT token
     * @author Matas Pugzlys w19006600
     */
    protected function processRequest()
    {
        $id = $this->getRequest()->getParameter("id");
        $authorId = $this->getRequest()->getParameter("authorid");
        $award = $this->getRequest()->getParameter("award");
        $token = $this->getRequest()->getParameter("token");

        switch ($this->getRequest()->getRequestMethod()) {
            case "POST":
                // If the user is signed in on the front end,
                // a request with token will be sent to identify the user 
                // and get additional info is the paper on their reading list
                if (!is_null($token)) {
                    try {
                        $key = SECRET_KEY;
                        $decoded = JWT::decode($token, new Key($key, 'HS256'));
                        $userId = $decoded->user_id;

                        if (!is_null($authorId))
                            $this->getGateway()->findByAuthorWithReadingList($userId, $authorId);
                        else if (!is_null($userId)) $this->getGateway()->findWithReadingList($userId);
                    } catch (ExpiredException $e) {
                        $this->getResponse()->setMessage("Unauthorized");
                        $this->getResponse()->setStatusCode(401);
                    }
                } else {
                    $this->getResponse()->setMessage("Unauthorized");
                    $this->getResponse()->setStatusCode(401);
                }
                break;
            case "GET":
                if (!is_null($id)) {
                    if ($id === "random")
                        $this->getGateway()->findRandom();
                    else $this->getGateway()->findOne($id);
                } else if (!is_null($authorId)) {
                    $this->getGateway()->findByAuthor($authorId);
                } else if (!is_null($award)) {
                    $this->getGateway()->findWithAward($award);
                } else {
                    $this->getGateway()->findAll();
                }
                break;
            default:
                $this->getResponse()->setMessage("Method not allowed");
                $this->getResponse()->setStatusCode(405);
                break;
        }

        return $this->getGateway()->getResult();
    }
}
