<?php namespace Gateways;

/**
 * Executes and returns query results that are associated with user table. 
 * @param Database Database file
 * @author Matas Pugzlys w19006600
 */
class UserGateway extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(USER_DATABASE);
    }

    /**
     * Finds users with the provided email.
     * @param string @email user.email
     */
    public function findPassword($email)
    {
        $sql = "SELECT id, password FROM user WHERE email = :email";
        $params = [":email" => $email];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
