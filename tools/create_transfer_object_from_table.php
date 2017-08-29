<?php
require 'generic_includes.php';

class Template {
    private $_scriptPath;
    public $properties;

    public function setScriptPath($scriptPath){
        $this->_scriptPath=$scriptPath;
    }

    public function __construct(){
        $this->_scriptPath='templates/';
        $this->properties = array();
    }

    public function render($filename){
        ob_start();
        if(file_exists($this->_scriptPath.$filename)){
            include($this->_scriptPath.$filename);
        } else throw new Exception();
        return ob_get_clean();
    }

    public function __set($k, $v){
        $this->properties[$k] = $v;
    }

    public function &__get($k){
        return $this->properties[$k];
    }
}

$args = $argv;
if ($args[0] == 'php') {
    $args = array_slice($argv, 1);
}
if (count($args) < 2) {
    fwrite(STDERR, "Usage: create_transfer_object_from_table.php table_name [class_name]\n");
    exit(1);
}

$table_name = $args[1];
$class_name = $args[2] ?? $table_name;

$schema_name = $DB->pselectOne('SELECT database()',array());

if (empty($schema_name)) {
    die('something wrong');
}

$column_names = array_map(function ($row) {return $row['COLUMN_NAME'];}, $DB->pselect("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = :v_schema_name AND TABLE_NAME = :v_table_name",array('v_schema_name' => $schema_name, 'v_table_name' => $table_name)));

$pk_column_names = array_map(function ($row) {return $row['column_name'];}, $DB->pselect("SELECT k.column_name FROM information_schema.table_constraints t JOIN information_schema.key_column_usage k USING(constraint_name,table_schema,table_name) WHERE t.constraint_type='PRIMARY KEY'   AND t.table_schema=:v_schema_name   AND t.table_name=:v_table_name;", array('v_schema_name' => $schema_name, 'v_table_name' => $table_name)));

$view = new Template();
$view->class_name=ucfirst($class_name);
$view->columns=$column_names;
$view->pk_columns=$pk_column_names;
echo $view->render('DTO.tpl');
