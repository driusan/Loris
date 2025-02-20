<?php declare(strict_types=1);

/**
 * Implementation of ValidatableIdentifier for identifier types that are
 * numeric in nature.
 *
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 */
abstract class NumericIdentifier implements Identifier, \JsonSerializable
{
    /**
     * Default constructor
     *
     * @param int  $value The Identifier's value
     * @param ?int $min   The minimum value for the identifier, if provided
     * @param ?int $max   The maximum value for the identifier, if provided
     *
     * @throws \DomainException When the value is not valid
     */
    public function __construct(public readonly int $value,
        ?int $min=null,
        ?int $max=null
    ) {
        if ($min !== null && $value < $min || $max !== null && $value > $max) {
            throw new \DomainException('The value is not valid');
        }
    }

    /**
     * Generates a string representation of this number.
     *
     * @return string That CandID's value
     */
    public function __toString(): string
    {
        return strval($this->value);
    }

    /**
     * Specify how identifier is serialized to json.
     *
     * @see https://www.php.net/manual/en/jsonserializable.jsonserialize.php
     *
     * @return mixed
     */
    public function jsonSerialize() : mixed
    {
        return $this->value;
    }
}

