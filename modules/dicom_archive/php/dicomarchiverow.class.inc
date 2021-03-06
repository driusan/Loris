<?php
/**
 * This class implements a data Instance which represents a single
 * row in the dicom archive menu table.
 *
 * PHP Version 7
 *
 * @category   Behavioural
 * @package    Main
 * @subpackage Imaging
 * @author     Dave MacFarlane <david.macfarlane2@mcgill.ca>
 * @license    http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link       https://www.github.com/aces/Loris/
 */

namespace LORIS\dicom_archive;

/**
 * A DICOMArchiveRow represents a row in the DICOM Archive menu table.
 *
 * @category   Behavioural
 * @package    Main
 * @subpackage Imaging
 * @author     Dave MacFarlane <david.macfarlane2@mcgill.ca>
 * @license    http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link       https://www.github.com/aces/Loris/
 */
class DICOMArchiveRow implements \LORIS\Data\DataInstance
{
    protected $DBRow;
    protected $CenterID;

    /**
     * Create a new DICOMArchiveRow
     *
     * @param array   $row The row (in the same format as \Database::pselectRow
     *                     returns
     * @param integer $cid The centerID affiliated with this row.
     */
    public function __construct(array $row, $cid)
    {
        $this->DBRow    = $row;
        $this->CenterID = $cid;
    }

    /**
     * Implements \LORIS\Data\DataInstance interface for this row.
     *
     * @return array which can be serialized by json_encode()
     */
    public function jsonSerialize() : array
    {
        return $this->DBRow;
    }

    /**
     * Returns the CenterID for this row, for filters such as
     * \LORIS\Data\Filters\UserSiteMatch to match again.
     *
     * @return integer The CenterID
     */
    public function getCenterID()
    {
        return $this->CenterID;
    }
}
