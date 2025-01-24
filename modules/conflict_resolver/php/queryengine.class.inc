<?php declare(strict_types=1);

namespace LORIS\conflict_resolver;
use LORIS\Data\Scope;
use LORIS\Data\Cardinality;
use LORIS\Data\Dictionary\DictionaryItem;
use LORIS\Data\Types\Enumeration;

/**
 * A QueryEngine providers a QueryEngine interface to query
 * against general candidate data such as identifiers, DoB, Entity Type,
 * etc.
 *
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 */
class QueryEngine extends \LORIS\Data\Query\SQLQueryEngine
{
    /**
     * Return a data dictionary of data types managed by this module.
     * DictionaryItems are grouped into categories and a module may
     * provide 0 or more categories of dictionaryitems.
     *
     * @return \LORIS\Data\Dictionary\Category[]
     */
    public function getDataDictionary() : iterable
    {
        $sesscope  = new Scope(Scope::SESSION);


	$ddeinstruments = \NDB_BVL_Instrument::getDDEInstrumentNamesList($this->loris);
	$dictionary = [];
	foreach($ddeinstruments as $short => $fullname) {
		$dictionary = array_merge($dictionary,  [
                new DictionaryItem(
                    "{$short}_DDE_Complete",
                    "Double Data Entry was completed for {$fullname} instrument?",
                    $sesscope,
                    new \LORIS\Data\Types\BooleanType(),
                    new Cardinality(Cardinality::SINGLE),
                ),
                new DictionaryItem(
                    "{$short}_Conflicts_Exist",
                    "Conflicts Exist for {$fullname} data entry?",
                    $sesscope,
                    new \LORIS\Data\Types\BooleanType(),
                    new Cardinality(Cardinality::SINGLE),
                ),
            ]);
	}

        $category = (new \LORIS\Data\Dictionary\Category(
		"Conflict Resolver",
		"Data Entry Conflicts",

        ))->withItems($dictionary);
        return [$category];
    }
    /**
     * {@inheritDoc}
     *
     * @param \Loris\Data\Dictionary\Category       $cat  The dictionaryItem
     *                                                    category
     * @param \Loris\Data\Dictionary\DictionaryItem $item The item
     *
     * @return string[]
     */
    public function getVisitList(
        \LORIS\Data\Dictionary\Category $cat,
        \LORIS\Data\Dictionary\DictionaryItem $item
    ) : iterable {
        if ($item->getScope()->__toString() !== 'session') {
            return [];
        }

        // Session scoped variables: VisitLabel, project, site, cohort
        return array_keys(\Utility::getVisitList());
    }

    /**
     * Get the SQL field name to use to refer to a dictionary item.
     *
     * @param \LORIS\Data\Dictionary\DictionaryItem $item The dictionary item
     *
     * @return string
     */
    protected function getFieldNameFromDict(
        \LORIS\Data\Dictionary\DictionaryItem $item
    ) : string {
	    $this->addTable(
		"LEFT JOIN session s ON (s.CandID=c.CandID AND s.Active='Y')"
	    );
	    $this->addTable(
		    "LEFT JOIN flag f (f.SessionID=s.ID)"
	    );
	    return "(SELECT true ) as {$item->getName()}
    }

    /**
     * {@inheritDoc}
     *
     * @param \LORIS\Data\Dictionary\DictionaryItem $item - The LORIS dictionary item
     *
     * @return string
     */
    protected function getCorrespondingKeyField(
        \LORIS\Data\Dictionary\DictionaryItem $item
    ) {
        // There are no cardinality::many fields in this query engine, so this
        // should never get called
        throw new \Exception(
            "Unhandled Cardinality::MANY field " . $item->getName()
        );
    }

    /**
     * {@inheritDoc}
     *
     * @param \LORIS\Data\Dictionary\DictionaryItem $item - The LORIS dictionary item
     *
     * @return string
     */
    public function getCorrespondingKeyFieldType(
        \LORIS\Data\Dictionary\DictionaryItem $item
    ) : string {
        throw new \Exception(
            "Unhandled Cardinality::MANY field " . $item->getName()
        );
    }
}
