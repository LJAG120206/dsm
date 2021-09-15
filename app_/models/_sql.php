<?php

class Database
{
    private	$connection;
	public	$tables = array();
	public	$fields = array();

	public function __construct()
    {
		try
		{
			$this->connection = new PDO("mysql:host=".MYSQL_HOST."; port=".MYSQL_PORT."; dbname=".MYSQL_DB."; charset=utf8mb4", MYSQL_USER, MYSQL_PWD);
			$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
		}
		catch (PDOException $e)
		{
			$msg = 'ERREUR PDO dans '.$e->getFile().' L.'.$e->getLine().' : '.$e->getMessage();
			die($msg);
		}

		// Tables
		$this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_NUM);

		$SQL = "SHOW TABLES;";
		
		$result = $this->connection->prepare($SQL);
		$result->execute();
		$records = $result->fetchAll();

		foreach($records as $row)
		{
			$table = $row[0];
			array_push($this->tables, $table);
		}

		// Fields
		$this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

		foreach($this->tables as $table)
		{
			$SQL = "SHOW FULL COLUMNS FROM `$table`;";
			
			$result = $this->connection->prepare($SQL);
			$result->execute();
			$records = $result->fetchAll();

			$this->fields[$table]['names']    = array();
			$this->fields[$table]['types']    = array();
			$this->fields[$table]['comments'] = array();

			$i = 0;
			foreach($records as $row)
			{
				$field   = $row['Field'];
				$type    = $row['Type'];
				$comment = $row['Comment'];
				
				array_push($this->fields[$table]['names'], $field);

				if(substr($type,0,3) == 'int')     { $this->fields[$table][$field]['type'] = 'int'; }
				if(substr($type,0,5) == 'float')   { $this->fields[$table][$field]['type'] = 'float'; }
				if(substr($type,0,7) == 'varchar') { $this->fields[$table][$field]['type'] = 'varchar'; }

				$this->fields[$table][$field]['comment'] = $comment;
				
			}
		}
	}

	public function checkTable($table)
	{
		debug("Database->checkTable(\"$table\")");

		$OK = FALSE;
		foreach($this->tables as $db_table)
		{
			if($table == $db_table);
			{
				$OK = TRUE;
			}
		}
		return($OK);
	}

	public function checkField($table,$field)
	{
		debug("Database->checkField(\"$table\",\"$field\")");

		$OK = FALSE;
		if($this->checkTable($table) == TRUE)
		{
			foreach($this->fields[$table]['names'] as $db_field)
			{
				if($field == $db_field)
				{
					$OK = TRUE;
				}
			}
		}
		return($OK);
	}

	public function getFields($table)
	{
		debug("Database->getFields(\"$table\")");

		$fields = array();

		if($this->checkTable($table) == TRUE)
		{
			$OK = TRUE;
			foreach($this->fields[$table]['names'] as $db_field)
			{
				array_push($fields, $db_field);
			}
			return($fields);
		}
		return(FALSE);
	}

	public function getTypes($table)
	{
		debug("Database->getTypes(\"$table\")");

		$types = array();

		if($this->checkTable($table) == TRUE)
		{
			$OK = TRUE;
			foreach($this->fields[$table]['names'] as $db_field)
			{
				array_push($types,$this->fields[$table][$db_field]['type']);
			}
			return($types);
		}
		return(FALSE);
	}

	public function getComments($table)
	{
		debug("Database->getComments(\"$table\")");

		$comments = array();

		if($this->checkTable($table) == TRUE)
		{
			$OK = TRUE;
			foreach($this->fields[$table]['names'] as $db_field)
			{
				array_push($comments,$this->fields[$table][$db_field]['comment']);
			}
			return($comments);
		}
		return(FALSE);
	}
}


class SQL
{
    public $connection;
	public $table = '';
	public $result = NULL;

	public $fetchMode = 0;

	public $count = 0;

    public function __construct($table)
    {
		global $db;

		debug("SQL(\"$table\")");

		$table = trim($table);

		try
		{
	        $this->connection = new PDO("mysql:host=".MYSQL_HOST."; port=".MYSQL_PORT."; dbname=".MYSQL_DB."; charset=utf8mb4", MYSQL_USER, MYSQL_PWD);
			$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
		}
		catch (PDOException $e)
		{
			$msg = 'ERREUR PDO dans '.$e->getFile().' L.'.$e->getLine().' : '.$e->getMessage();
			die($msg);
		}

		if($db->checkTable($table) == TRUE)
		{
			$this->table = $table;
		}
		else
		{
			die("La table `$table` n'existe pas dans la base de données.");
		}
	}

	public function __destruct()
	{

	}

	public function setFetchMode($mode=1)
	{
		debug("SQL->setFetchMode($mode)");

		switch($mode)
		{
			case 1  : 	$this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_NUM);
						break;
			case 2  :	$this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
						break;
			default :	$this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
		}
		$this->fetchMode = $mode;
	}

	public function select($header=FALSE,$where='',$values=array())
    {
		global $db;

		$SQL = "SELECT * FROM `".$this->table."` $where;";
		//SELECT * FROM form_benevoles_ WHERE id=:id;

		debug("SQL->select($header,\"$SQL\",\$values)");

		$this->setFetchMode($this->fetchMode);
		$result = $this->connection->prepare($SQL);

		$fields = array();

		if(substr_count($SQL,' WHERE ') == 1)
		{
			$write = FALSE;
			for($i=0; $i < strlen($where); $i++)
			{
				$char = $where[$i];
				if($write == FALSE && $char == '`')
				{
					$write = TRUE;
					$field = "";
				}
				elseif($write == TRUE && $char == '`')
				{
					$write = FALSE;
					array_push($fields, $field);
				}
				if($write == TRUE && $char !='`')
				{
					$field .= $char;
				}
			}

			debug(json_encode($fields));
			debug(json_encode($values));

			$types['tinyint'] = PDO::PARAM_INT;
			$types['null'] = PDO::PARAM_NULL;
			$types['date'] = PDO::PARAM_STR;
			$types['int'] = PDO::PARAM_INT;
			$types['varchar'] = PDO::PARAM_STR;
			$types['float'] = PDO::PARAM_STR;

			for($i=0; $i < count($values); $i++)
			{
				$field = $fields[$i];
				$type  = $db->fields[$this->table][$field]['type'];
				$result->bindParam(($i+1),$values[$i],$types[$type]);
			}
		}

		$result->execute();
		$records = $result->fetchAll();
		if($header == TRUE)
		{
			array_unshift($records, $db->getComments($this->table));
		}
		$this->count = $result->rowCount();

		debug($this->count);
		debug(json_encode($records));

		$result->closeCursor();
		$result = NULL;

		return($records);
	}

	public function delete($id)
    {
		debug("SQL->delete($id)");

		$this->setFetchMode(0);

		$SQL = "DELETE FROM `{$this->table}` WHERE id = ?;";
		
		$result = $this->connection->prepare($SQL);
		$result->bindParam(1, $$id, PDO::PARAM_INT);
		$result->execute();

		if(!$result->rowCount())
		{
			$return = 0;
		}
		else
		{
			$return = $result->rowCount();
		}

		$result = NULL;

		return $return;
	}

	public function update($fields, $values, $wid=NULL)
	{
		global $db;

		debug("SQL->update()");

		if($wid != NULL)
		{
			if(count($fields) != count($values))
			{
				if(DEBUG) { debug("Le nombre de champs et le nombre de valeurs ne correspondent pas."); }
				return (FALSE);
			}
			else
			{
				$OK = TRUE;

				$db_fields = $db->getFields($this->table);
				foreach($fields as $field)
				{
					if(!in_array($field, $db_fields))
					{
						$OK = FALSE;
						debug("Le champs `$field` n'existe pas.");
						return (FALSE);
					}
				}

				if($OK == TRUE)
				{
					$types = array();

					$types['tinyint'] = PDO::PARAM_INT;
					$types['null'] = PDO::PARAM_NULL;
					$types['date'] = PDO::PARAM_STR;
					$types['int'] = PDO::PARAM_INT;
					$types['varchar'] = PDO::PARAM_STR;
					$types['float'] = PDO::PARAM_STR;

					$SQL = "UPDATE `{$this->table}` SET ";
					foreach($fields as $field)
					{
						$SQL .= "`$field`=:$field, ";
					}
					$SQL  = substr($SQL,0,strlen($SQL)-2);
					$SQL .= " WHERE `id`=:wid ;";

					$result = $this->connection->prepare($SQL);

					foreach($fields as $i=>$field)
					{
						$type  = $db->fields[$this->table][$field]['type'];
						$result->bindParam(":$field",$values[$i],$types[$type]);
					}
					$result->bindParam(":wid",$wid,PDO::PARAM_INT);

					$result->execute();
			
					debug($SQL);
					return(TRUE);
				}
			}
		}
		return(FALSE);
	}

	public function insert($fields,$values)
	{
		debug("SQL->insert()");

		if(count($fields) != count($values))
		{
			die("Le nombre de champs et le nombre de valeurs ne correspondent pas.");
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
				$types['null'] = PDO::PARAM_NULL;
				$types['date'] = PDO::PARAM_STR;
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
				return(TRUE);
			}
		}
	}
}

// ====================================
$db = new Database();
