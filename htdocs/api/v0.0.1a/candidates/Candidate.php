<?php
set_include_path(get_include_path() . ":" . __DIR__ . "/../");
require_once 'APIBase.php';

class CandidateJSON extends APIBase {
    var $Candidate;
    public function __construct($CandID) {
        parent::__construct();

        if(!is_numeric($CandID)
            || $CandID < 100000
            || $CandID > 999999
        ) {
            header("HTTP/1.1 400 Bad Request");
            print json_encode(["error" => "Invalid CandID format"]);
            exit(0);

        }

        try {
            $this->Candidate = Candidate::singleton($CandID);
        } catch(Exception $e) {
            header("HTTP/1.1 404 Not Found");
            print json_encode(["error" => "Unknown CandID"]);
            exit(0);
        }

        $this->JSON = [
            "Meta"   => [ "CandID" => $CandID ],
            "Visits" => array_values($this->Candidate->getListOfVisitLabels())
        ];
    }
}

if(!isset($_REQUEST['NoCandidate'])) {
    $obj = new CandidateJSON($_REQUEST['CandID']);
    print $obj->toJSONString();
}
?>
