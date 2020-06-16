<?php
declare(strict_types=1);
namespace LORIS\Data\Dictionary;
use \LORIS\Data\Scope;

/**
 * @license    http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 */
class DictionaryItem
{
    protected $name;
    protected $category;
    protected $description;
    protected $scope;

    public function __construct(string $name, string $desc, Category $cat, Scope $scope)
    {
        $this->name        = $name;
        $this->category    = $cat;
        $this->description = $desc;
        $this->scope = $scope;
    }

    public function getName() : string
    {
        return $this->name;
    }

    public function getDescription() : string
    {
        return $this->description;
    }

    public function getCategory() : Category
    {
        return $this->category;
    }

    public function getScope() : Scope {
        return $this->scope;
    }
}