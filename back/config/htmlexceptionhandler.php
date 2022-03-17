<?php

/**
 * Handles Exceptions that are thrown for html page requests
 * @param object $e
 * @author Matas Pugzlys w19006600
 */
function HTMLexceptionHandler($e)
{
    echo "<p>internal server error! (Status 500)</p>";
    if (DEVELOPMENT_MODE) {
        echo "<p>";
        echo "Message: " .  $e->getMessage();
        echo "<br>File: " . $e->getFile();
        echo "<br>Line: " . $e->getLine();
        echo "</p>";
    }
}
