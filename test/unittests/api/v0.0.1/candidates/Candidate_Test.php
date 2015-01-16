<?php
require_once __DIR__ . '/../../../../../vendor/autoload.php';
require_once __DIR__ . '/../../../../../htdocs/api/v0.0.1a/candidates/Candidate.php';

class Candidate_Test extends PHPUnit_Framework_TestCase
{
    function setUp() {
        if(!defined("UNIT_TESTING")) {
            define("UNIT_TESTING", true);
        }
    }

    function testValidMethods() {
        try {
            $API = new \Loris\API\Candidates\Candidate("GET", "123456");
        } catch(\Loris\API\SafeExitException $e) {
            $API = $e->Object;
        }
        $this->assertEquals($API->AllowedMethods, ['GET']);
    }
}
?>
