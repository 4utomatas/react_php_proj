<?php

namespace Controllers;

use \Pages\DocumentationPage;

/**
 * A Controller for Documentation page. 
 * @param Request $request
 * @param HTMLResponse $response
 * @author Matas Pugzlys w19006600
 */
class DocumentationController extends Controller
{
    /**
     * Scaffolds a new Documentation page with details
     */
    protected function processRequest()
    {
        $page = new DocumentationPage("Documentation", "Documentation");
        $page->addParagraph("Matas Pugzlys w19006600");
        $page->addParagraph("Information about endpoints:");
        return $page->generateWebpage();
    }
}
