<?php

namespace LORIS\Data\Query;

class LessThanOrEqualCriteria {
    public function __construct($val) {
        $this->val = $val;
    }

    public function getValue() {
        return $this->val;
    }
}
