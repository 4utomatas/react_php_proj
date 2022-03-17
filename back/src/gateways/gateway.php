<?php

namespace Gateways;

use Data\Database;

/**
 * Uses Database class to communicate with Database file and 
 * $result to return results from queries
 * @param Database Database file
 * @author Matas Pugzlys w19006600
 */
abstract class Gateway
{

    private $database;
    private $result = [];

    protected function setDatabase($database)
    {
        $this->database = new Database($database);
    }

    protected function getDatabase()
    {
        return $this->database;
    }

    protected function setResult($result)
    {
        $this->result = $result;
    }

    public function getResult()
    {
        return $this->result;
    }
}
