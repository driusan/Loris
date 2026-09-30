<?php declare(strict_types=1);

/**
 * Implementation of ValidatableIdentifier needs to provide a validation
 * function to ensure that no Identifier of that type exists if the value is
 * not validated.
 *
 * PHP Version 8
 *
 * @category StudyEntities
 * @package  LORIS
 * @author   Xavier Lecours Boucher <xavier.lecours@mcin.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */

/**
 * ValidatableIdentifier with the default constructor that call validate
 *
 * @category StudyEntities
 * @package  LORIS
 * @author   Xavier Lecours Boucher <xavier.lecours@mcin.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */
abstract class NumericIdentifier implements Identifier
{
    /**
     * This function is called by the contructor to ensure that no
     * ValidatableIdentifier exists if it value is not valid.
     *
     * Validation should be done on the value format and not on the database
     * state.
     *
     * @param int $value The value to be validated
     *
     * @return bool True if the value format is valid
     */
    abstract static public function validate(int $value): bool;

    /**
     * Default constructor
     *
     * This is final to make sure that classes extending ValidatableIdentifier
     * will call validate upon instantiation.
     *
     * @param int $value The Identifier's value
     *
     * @throws \DomainException When the value is not valid
     */
    public final function __construct(public readonly int $value)
    {
        if (!static::validate($value)) {
            throw new \DomainException('The value is not valid');
        }
    }
}

