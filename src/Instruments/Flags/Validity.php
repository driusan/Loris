<?php

namespace LORIS\Instruments\Flags;

enum Validity: string {
	case Questionable = 'Questionable';
	case Invalid = 'Invalid';
	case Valid = 'Valid';
}
