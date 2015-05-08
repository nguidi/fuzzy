/**
* Configura las conexiones disponibles

@return {Connections}

*/

module.exports = {
	/*

	//	Una connection de tipo MySQL
	'mysql':
	{
		adapter: 	'sails-mysql'
	,	host:		'localhost'
	,	port:		3306
	,	user:		'username'
	,	password:	'password'
	,	database:	'dbname'
	//	Parametros opcionales
	,	charset:	'utf8'
	,	collation:	'utf8_spanish_ci'
	}

	//	Una connection de tipo MongoDB
,	'mongodb':
	{
		adapter:	'sails-mongo'
	,	host:		'localhost'
	,	port:		27017
	,	user:		'username'
	,	password:	'password'
	,	database:	'dbname'
	}
	*/

	//	Creo una conexion llamada "default"
	'default':
	{
		//	Le defino el tipo de adapter para esta conexion
		adapter: 'sails-disk'
	}

}