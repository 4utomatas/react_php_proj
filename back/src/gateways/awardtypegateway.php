<?php

namespace Gateways;

/**
 * Executes and returns query results that are associated with award_type table. 
 * @param Database Database file
 * @author Matas Pugzlys w19006600
 */
class AwardTypeGateway extends Gateway
{
    private $baseSqlQuery =
    "SELECT a.award_type_id AS 'id', a.name
     FROM award_type as a
     ORDER BY a.name ASC";

    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }

    public function findAll()
    {
        $sql = $this->baseSqlQuery;
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }
}
