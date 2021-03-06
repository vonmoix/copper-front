<?php

/*

// ------------------------------------

function exception_error_handler ($severity, $message, $file, $line) {
   if (!(error_reporting(E_ALL) & $severity)) {
        // Ce code d'erreur n'est pas inclus dans error_reporting()
        return;
    }
    throw new ErrorException($message, 0, $severity, $file, $line);
}
set_error_handler("exception_error_handler");

// ------------------------------------

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ------------------------------------

var_dump(realpath(dirname(getcwd())));
exit();

// ------------------------------------

echo '<pre>';
phpinfo();
echo '</pre>';
exit();

*/

define('VERSION', 0);

$root = explode('/', $_SERVER['DOCUMENT_ROOT']);
array_pop($root);

require implode('/', $root) . '/app/Core/Constant.php';
\App\Core\Constant::init();

require ROOT . 'app/Core/App.php';
\App\Core\App::init();
