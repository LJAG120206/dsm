<?php

class model
{
    private $connection;
	private $table;

	private $tables = array();

	public $fields = array();
	public $fieldsNames = array();
	public $fieldsTypes = array();

	public $count = 0;

    public function __construct($tableToUse)
    {
		try
		{
	        $this->connection = new PDO(
                "mysql:host=".MYSQL_HOST."; port=".MYSQL_PORT."; dbname=".MYSQL_DB."; charset=utf8mb4", 
                MYSQL_USER, 
                MYSQL_PWD
            );
			$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
		}
		catch (PDOException $e)
		{
			$msg = 'ERREUR PDO dans '.$e->getFile().' L.'.$e->getLine().' : '.$e->getMessage();
			die($msg);
		}

		$this->getTables();

		$this->table = '';
		foreach($this->tables as $table)
		{
			if($table == $tableToUse)
			{
				$this->table = $table;
			}
		}
		debug("use `{$this->table}`;");

		$this->getFields();
	}

	public function __destruct()
	{

	}

	public function setFetchMode($mode=0)
	{
		switch($mode)
		{
			case 1  : $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_NUM); break;
			case 2  : $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); break;
			default : $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
		}
	}

	private function getTables()
    {
		debug("getTables()");

		$this->setFetchMode(1);

		$SQL = "SHOW TABLES;";
		
		$result = $this->connection->prepare($SQL);
		$result->execute();
		$rows = $result->fetchAll();

		foreach($rows as $key => $table)
		{
			array_push($this->tables, $table[0]);
		}
	}

	private function getFields()
    {
		debug("getFields()");

		$this->setFetchMode(2);

		$SQL = "SHOW COLUMNS FROM `{$this->table}`;";
		
		$result = $this->connection->prepare($SQL);
		$result->execute();
		$this->fields = $result->fetchAll();

		$this->fieldNames = array();
		$this->fieldTypes = array();
		foreach($this->fields as $key => $field)
		{
			array_push($this->fieldNames, $field['Field']);
			
			if(substr($field['Type'],0,3) == 'int')     { $field['Type'] = 'int';     }
			if(substr($field['Type'],0,5) == 'float')   { $field['Type'] = 'float';   }
			if(substr($field['Type'],0,7) == 'varchar') { $field['Type'] = 'varchar'; }
			$this->fieldTypes[$field['Field']] = $field['Type'];
		}
	}

	public function selectById($value='', $offset=0, $limit=0)
    {
		debug("select_by_id()");

//		$this->setFetchMode(0);

		$offset = ($offset <= 0) ? 0 : $offset;
		$limit  = ($limit  <= 0) ? 0 : $limit;

		$WHERE = ($value != '') ? "WHERE id=:id" : "";
		$LIMIT = ($limit == 0) ? "" : "LIMIT :offset, :limit";
		$SQL   = "SELECT * FROM `{$this->table}` $WHERE $LIMIT;";
		
		$result = $this->connection->prepare($SQL);

		if($value != '')
			$result->bindParam(":id", $value, PDO::PARAM_INT);
		if($limit > 0)
		{
			$result->bindParam(":offset", $offset, PDO::PARAM_INT);
			$result->bindParam(":limit", $limit, PDO::PARAM_INT);
		}

		$result->execute();

		$this->count = $result->rowCount();
		$return = $result->fetchAll(); 

		$result->closeCursor();
		$result = NULL;

		return $return;
	}

	public function selectAll($offset='', $limit='')
	{
		debug("select_all()");

		return $this->selectById('', $offset, $limit);
	}

	public function deleteById($value)
    {
		debug("delete_by_id()");

		$this->setFetchMode(0);

		$SQL = "DELETE FROM `".$this->table."` WHERE id=:id;";
		
		$result = $this->connection->prepare($SQL);
		$result->bindParam(":id",$value,PDO::PARAM_INT);
		$result->execute();

		if( !$result->rowCount() )
			$return = 0;
		else
			$return = $result->rowCount();

		$result = NULL;

		return $return;
	}

	public function update($fields, $values, $cid)
	{
		debug("update()");

		if(count($fields) != count($values))
		{
			if(DEBUG) { debug("Le nombre de champs et le nombre de valeurs ne correspondent pas."); }
			return (FALSE);
		}
		else
		{
			$error = FALSE;

			foreach($fields as $field)
			{
				if(!in_array($field, $this->fieldNames))
				{
					$error = TRUE;
					if(DEBUG) { debug("Le champs `$field` n'existe pas."); }
					return (FALSE);
				}
			}

			if($error == FALSE)
			{
				$types = array();

				$types['tinyint'] = PDO::PARAM_INT;
				$types['date'] = PDO::PARAM_NULL;
				$types['int'] = PDO::PARAM_INT;
				$types['varchar'] = PDO::PARAM_STR;
				$types['float'] = PDO::PARAM_STR;

				$SQL = "UPDATE `{$this->table}` SET ";
				foreach($fields as $key => $field)
				{
					$value = $values[$key];
					$SQL  .= "`$field`=:$field, ";
				}
				$SQL  = substr($SQL,0,strlen($SQL)-2);
				$SQL .= " WHERE `id`=:cid ;";

				$result = $this->connection->prepare($SQL);

				foreach($fields as $field)
				{
					$type = $this->fieldTypes[$field];
					print($field.' : '.$type."\n");
					$result->bindParam(":$field",$value,$types[$type]);
				}
				$result->bindParam(":cid",$value,PDO::PARAM_INT);

				$result->execute();
		
				debug($SQL);
				return (TRUE);
			}
		}
	}

	public function insertInto($values)
	{
		debug("insertInto()");

		if(count($fields) != count($values))
		{
			if(DEBUG) { debug("Le nombre de champs et le nombre de valeurs ne correspondent pas."); }
			return (FALSE);
		}
		else
		{
			$error = FALSE;

			foreach($fields as $field)
			{
				if(!in_array($field, $this->fieldNames))
				{
					$error = TRUE;
					if(DEBUG) { debug("Le champs `$field` n'existe pas."); }
					return (FALSE);
				}
			}

			if($error == FALSE)
			{
				$types = array();

				$types['tinyint'] = PDO::PARAM_INT;
				$types['date'] = PDO::PARAM_NULL;
				$types['int'] = PDO::PARAM_INT;
				$types['varchar'] = PDO::PARAM_STR;
				$types['float'] = PDO::PARAM_STR;

				$SQL = "UPDATE `{$this->table}` SET ";
				foreach($fields as $key => $field)
				{
					$value = $values[$key];
					$SQL  .= "`$field`=:$field, ";
				}
				$SQL  = substr($SQL,0,strlen($SQL)-2)." ;";

				$result = $this->connection->prepare($SQL);

				foreach($fields as $field)
				{
					$type = $this->fieldTypes[$field];
					print($field.' : '.$type."\n");
					$result->bindParam(":$field",$value,$types[$type]);
				}
				$result->execute();
		
				debug($SQL);
				return (TRUE);
			}
		}
	}
}
