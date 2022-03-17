<?php

namespace Gateways;

/**
 * Executes and returns query results that are associated with author table. 
 * @param Database Database file
 * @author Matas Pugzlys w19006600
 */
class AuthorGateway extends Gateway
{
    // Decluters functions and defines base structure
    private $baseSqlQuery =
    "SELECT author_id, first_name, middle_name, last_name
     FROM author";

    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }

    public function findAll()
    {
        $sql = $this->baseSqlQuery . " ORDER BY first_name, last_name ASC";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function findOne($id)
    {
        $sql = $this->baseSqlQuery . " WHERE author_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
