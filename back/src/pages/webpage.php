<?php

namespace Pages;

/** 
 * Used to construct html pages. 
 * Defines main ways to add blocks of information to the page and output it.
 *
 * @author Matas Pugzlys w19006600
 * @var head
 * @var body
 * @var foot
 */
class WebPage
{
    private $head;
    private $body;
    private $foot;

    /**
     * @param string $title displayed on browser's tab
     * @param string $heading the heading of the webpage
     */
    public function __construct($title, $heading)
    {
        $this->setTitle($title);
        $this->setFoot();
        $this->setBody($heading);
    }

    public function addParagraph($text)
    {
        $this->body .= "\n<p>$text</p>";
    }

    public function addBlock($template)
    {
        $this->body .= "\n<div>$template</div>";
    }

    public function generateWebpage()
    {
        return $this->getHead() . $this->getBody() . $this->getFoot();
    }

    private function getHead()
    {
        return $this->head;
    }

    private function getFoot()
    {
        return $this->foot;
    }

    protected function getBody()
    {
        return $this->body;
    }

    protected function setTitle($title)
    {
        $cssPath = BASEPATH . "assets/css/style.css";
        $this->head = <<<EOT
            <!DOCTYPE html>
            <html lang="en-gb">
            <head>
                <title>$title</title>
                <meta charset="utf-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            </head>
            <body>
            <div class="container mt-5">
EOT;
    }

    protected function setFoot()
    {
        $basepath = BASEPATH;
        $this->foot = <<<EOT
            <p>Links to get around the webpage:</p>
            <ol>
                <li><a href="{$basepath}home/">Home</a></li>    
                <li><a href="{$basepath}documentation/">Documentation</a></li>
                <li><a href="{$basepath}api/papers/">Papers API</a></li>
                <li><a href="{$basepath}api/authors/">Authors API</a></li>
                <li><a href="{$basepath}api/">Base API</a></li>
            </ol>
            </div>
            </body>
            </html>
EOT;
    }

    protected function setBody($heading)
    {
        $this->body = <<<EOT
            <h1>$heading</h1>
EOT;
    }
}
