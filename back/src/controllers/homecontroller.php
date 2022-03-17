<?php

namespace Controllers;

use \Pages\HomePage;

/**
 * A Controller for Home page. 
 * @param Request $request
 * @param HTMLResponse $response
 * @author Matas Pugzlys w19006600
 */
class HomeController extends Controller
{
    /**
     * Scaffolds a new Home page with some information about the author and project's intentions.
     */
    protected function processRequest()
    {
        $page = new HomePage("Home", "Home Page");
        $page->addParagraph("Matas Pugzlys w19006600");
        $page->addParagraph("This website is a university coursework and is not associated with or endorsed by the DIS conference.");
        return $page->generateWebpage();
    }
}
