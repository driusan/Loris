<?php declare(strict_types=1);

/**
 * This file contains the intrument flags class
 *
 * PHP Version 7
 *
 * @category Behavioural
 * @package  Loris
 * @author   Xavier Lecours Boucher <xavier.lecours@mcin.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */

/**
 * This is a placeholder for instrument flags
 *
 * @category Behavioural
 * @package  Loris
 * @author   Xavier Lecours Boucher <xavier.lecours@mcin.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */
class InstrumentFlags
{
    private ?string $_validity;

    /**
     * Contructor
     *
     * @param ?string $dataentry      A value for data entry
     * @param ?string $administration A value for administration
     * @param ?string $validity       A value for validity
     */
    public function __construct(
        public readonly ?\LORIS\Instruments\Flags\DataEntry $DataEntry,
        public readonly ?\LORIS\Instruments\Flags\Administration $Administration,
        ?string $validity
    ) {
        $this->_validity       = $validity;
    }

    /**
     * Provide an array representation of an instrument flag status
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            'Data_entry'     => $this->DataEntry->value,
            'Administration' => $this->Administration->value,
            'Validity'       => $this->_validity,
        ];
    }
}
