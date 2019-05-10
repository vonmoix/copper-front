<?php

namespace Engine\Router;

use \App\Core\RedirectTo;

class Router {

    private $url;
    private $routes = [];
    private $p404ControllerFn;

    public function __construct () {
        $this->url = isset($_GET['url']) ? $_GET['url'] : '';
    }

    public function get ($path, $controller) {
        return $this->add($path, $controller, 'GET');
    }

    public function post ($path, $controller) {
        return $this->add($path, $controller, 'POST');
    }

    public function p404 ($p404ControllerFn) {
        $this->p404ControllerFn = $p404ControllerFn;
    }

    public function add ($path, $controller, $method) {
        $route = new Route($path, $controller);
        $this->routes[$method][] = $route;
        return $route;
    }

    public function run () {
        // Get & Post
        foreach ($this->routes[$_SERVER['REQUEST_METHOD']] as $route) {
            if ($route->match($this->url)) {
                return $route->getController();
            }
        }

        // Page 404
        $controller = 'App\\Controller\\P404\\P404';
        $controller = new $controller(false);
        return call_user_func([$controller, $this->p404ControllerFn]);
    }

}
