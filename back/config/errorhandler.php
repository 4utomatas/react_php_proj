<?php

/**
 * Handles Errors that are thrown
 * @param int $errno
 * @param string $errstr
 * @param string $errfile
 * @param int $errline
 * @author Matas Pugzlys w19006600
 */
function errorHandler($errno, $errstr, $errfile, $errline)
{
    if (($errno != 2 && $errno != 8) || DEVELOPMENT_MODE) {
        throw new Exception("Error Detected: [$errno] $errstr file: $errfile line: $errline", 1);
    }
}
