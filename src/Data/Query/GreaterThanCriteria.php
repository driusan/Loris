<?php

namespace LORIS\Data\Query;

class GreaterThanCriteria {
    public function __construct($val) {
        $this->val = $val;
    }

    public function getValue() {
        return $this->val;
    }
}
