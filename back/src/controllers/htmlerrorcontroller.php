<?php

namespace Controllers;

use Pages\HTMLErrorPage;

/**
 * A Controller for HTML Error page. 
 * @param Request $request
 * @param HTMLResponse $response
 * @author Matas Pugzlys w19006600
 */
class HTMLErrorController extends Controller
{
    /**
     * Scaffolds a new Error page with information about error.
     */
    protected function processRequest()
    {
        $page = new HTMLErrorPage("Error 404", "No page was found, please go back");
        $page->addParagraph("These are links for reachable destinations on this site:");
        return $page->generateWebpage();
    }
}
