<?php

namespace App\Controller\Separate;

use \Engine\Controller\Controller;

class P404 extends Controller {

    public function show () {

        /*------------------------------------
            HEAD
        ------------------------------------*/

        $this->head['title'] = 'Error — 404 Not Found';

        /*------------------------------------
            RENDER ERROR
        ------------------------------------*/

        $this->renderError();
    }

}
