<?php
namespace LORIS\Data\Query\Criteria;
use LORIS\Data\Query\Criteria;


class GreaterThanOrEqual implements Criteria {
    public function __construct($val) {
        $this->val = $val;
    }

    public function getValue() {
        return $this->val;
    }
}
