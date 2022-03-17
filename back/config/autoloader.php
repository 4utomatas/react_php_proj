<?php

/**
 * Loads files containing classes from src folder
 * @param string $className
 * @author Matas Pugzlys w19006600
 */
function autoloader($className)
{
    $filename = "src\\" . strtolower($className) . ".php";
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
    if (is_readable($filename)) {
        include_once $filename;
    } else {
        throw new Exception("File not found: " . $className . " (" . $filename . ")");
    }
}
