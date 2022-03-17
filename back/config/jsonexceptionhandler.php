<?php

/**
 * Handles Exceptions that are thrown for api requests
 * @param object $e
 * @author Matas Pugzlys w19006600
 */
function JSONexceptionHandler($e)
{
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $output['error'] = "internal server error! (Status 500)";

    if (DEVELOPMENT_MODE) {
        $output['Message'] = $e->getMessage();
        $output['File'] = $e->getFile();
        $output['Line'] = $e->getLine();
    }

    echo json_encode($output);
}
