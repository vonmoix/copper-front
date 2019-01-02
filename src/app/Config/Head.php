<?php

namespace App\Config;

class Head {

    public static function data () {
        $head['urlBase'] = 'https://www.example.com'; // Desktop version only with protocol
        $head['serverName'] = 'www.example.com'; // Desktop or mobile without protocol

        $head['twitter']['pseudo']  = '';
        $head['twitter']['creator'] = '';

        return $head;
    }

}
