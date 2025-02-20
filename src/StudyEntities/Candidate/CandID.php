<?php declare(strict_types=1);

/**
 * This defines what a CandID should be so it can be passed as a typed
 * parameter in functions.
 *
 * PHP Version 7
 *
 * @category StudyEntities
 * @package  LORIS
 * @author   Xavier Lecours Boucher <xavier.lecoursboucher@mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */
namespace LORIS\StudyEntities\Candidate;

/**
 * A representation of a CandID object. A CandID is always a string of length 6.
 *
 * @category StudyEntities
 * @package  LORIS
 * @author   Xavier Lecours Boucher <xavier.lecoursboucher@mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */
class CandID extends \NumericIdentifier
{
    /*
     * The minimum allowed value for valid CandIDs. Origin unclear but
     * assists in avoiding issues with leading 0s in string representations of
     * integers.
     *
     * @var int
     */
    protected const MIN_VALUE = 100000;
    protected const MAX_VALUE = 9999999999;

    /**
     * Default constructor
     *
     * @param int  $value The Identifier's value
     * @param ?int $min   The minimum value for the identifier, if provided
     * @param ?int $max   The maximum value for the identifier, if provided
     *
     * @throws \DomainException When the value is not valid
     */
    public function __construct(
        int $value,
        ?int $min = null,
        ?int $max = null
    ) {
        // Ignore the min/max parameters, the caller doesn't have any
        // control over the database size
        parent::__construct($value, self::MIN_VALUE, self::MAX_VALUE);
    }

    /**
     * Returns this identifier type
     *
     * @return string Always 'CandID'
     */
    public function getType(): string
    {
        return 'CandID';
    }
}
