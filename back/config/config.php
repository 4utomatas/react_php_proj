<?php
// TODO SET TO PRODUCTION LINK
/**
 * Base path for our application.
 * @var string returns /../../../ format 
 */
define('BASEPATH', '/year3/test/');
/**
 * Returns path to database file in sqlite format
 * @var string example/example.sqlite
 */
define('DATABASE', 'db/dis.sqlite');
define('USER_DATABASE', 'db/user.sqlite');
// !!!!!
// TODO set to false in production
// !!!!!
define("DEVELOPMENT_MODE", true);

// Secret key used for generating the token
define('SECRET_KEY', 'w19006600');

include 'config/autoloader.php';
spl_autoload_register("autoloader");


include 'config/htmlexceptionhandler.php';
include 'config/jsonexceptionhandler.php';
set_exception_handler("JSONexceptionHandler");

include 'config/errorhandler.php';
set_error_handler("errorHandler");

ini_set('display_errors', DEVELOPMENT_MODE);
ini_set('display_startup_errors', DEVELOPMENT_MODE);
