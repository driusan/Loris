<?php declare(strict_types=1);
use \LORIS\Data\Dictionary\DictionaryItem;
use \LORIS\Data\Dictionary\Category;
use \LORIS\Data\Scope;
use \LORIS\Data\Cardinality;
/**
 * Helper to extract a dictionary from a LorisForm, primarily
 * used by instruments. This is based on lorisform_parser.php
 *
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 */
trait LorisFormDictionaryImpl
{
    /**
     * Recursively extract non-group elements from $elements, and
     * return the dictionary of the items.
     *
     * @param Category $cat        The dictionary category to use for the
     *                             items
     * @param array    $elements   The LorisForm elements in the format
     *                             of LorisForm->toElementArray().
     * @param string   $groupLabel The quickform group being recursively
     *                             extracted
     *
     * @return DictionaryItem[]
     */
    private function _getDataDictionaryGroup(
        string $prefix,
        \LORIS\Data\Dictionary\Category $cat,
        array $elements,
        string $groupLabel=''
    ) : array {
        $items = [];
        $scope = new Scope(Scope::Session);
        $card = new Cardinality(Cardinality::Single);
        foreach ($elements AS $element) {
            if (!empty($element['label'])) {
                $label = str_replace("&nbsp;", "", $element['label']);
                $label = trim(preg_replace('/\s+/', ' ', $label));
            } else {
                $label = trim(preg_replace('/\s+/', ' ', $groupLabel));
            }

            if ($element['type'] === 'group') {
                $items = array_merge(
                    $items,
                    $this->_getDataDictionaryGroup(
                        $prefix,
                        $cat,
                        $element['elements'],
                        $label,
                    ),
                );
                continue;
            }

            if (!array_key_exists('name', $element)) {
                continue;
            }

            switch($element['type']) {
            case 'select':
                // The values of the enumeration are the keys of the
                // options, but when the key is something like "0" or
                // "1" array_keys turns it into an int and we want to
                // ignore null/empty, so instead we just walk through
                // the array and coerce things to a string.
                $keys = [];
                foreach ($element['options'] as $key => $val) {
                    if($key === '' || $key === null) {
                        continue;
                    }

                    // Coerce it to a string 
                    $keys[] = "$key";
                }
                $t = new \LORIS\Data\Types\Enumeration(...$keys);
                break;
            case 'text':
                $t = new \LORIS\Data\Types\StringType(255);
                break;
            case 'textarea':
                $t = new \LORIS\Data\Types\StringType();
                break;
            case 'date':
                $t = new \LORIS\Data\Types\DateType();
                break;
            case 'time':
                $t = new \LORIS\Data\Types\TimeType();
                break;
            case 'advcheckbox':
                $t = new \LORIS\Data\Types\Enumeration("true", "false");
                break;
            case 'static':
                $t = new \LORIS\Data\Types\StringType(255);
                break;
            case 'file':
                $t = new \LORIS\Data\Types\StringType(255);
                break;
            case 'header':
                continue 2;
            default:
                throw new \LorisException("Unknown element type: " . $element['type']);
            }
            $items[] = new DictionaryItem($prefix . $element['name'], $label, $scope, $t, $card);
        }
        return $items;
    }

    /**
     * Extract the data dictionary from an instrument as per the LorisForm.
     *
     * @return DictionaryItem[]
     */
    public function getDataDictionary() : iterable
    {
        $subtests =$this->getSubtestList();
        foreach ($subtests as $subtest) {
            $this->page =$subtest['Name'];
            if (method_exists($this, '_setupForm')) {
                $this->_setupForm();
            }
        }

        $formElements = $this->form->toElementArray();
        $cat          = new Category($this->testName, $this->getFullName());
        return $this->_getDataDictionaryGroup($this->testName . "_", $cat, $formElements["elements"], '');
    }
}