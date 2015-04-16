/**
* Lleno la base de datos con datos base

@return {undefined}
*/


//	Importo las librerias necesarias
var	_
=	require('lodash')
,	setupWaterline
=	require('./bootstrap/setup')
,	fs
=	require('fs')
,	async
=	require('async')
,	log
=	require('clog');

//	Importo el adaptador configurado, los modelos y conexiones del sistema.
var	AppAdapter
=	require('./config/adapters')
,	AppCollections
=	require('./config/collections')
,	AppConnection
=	require('./config/connections');

//	Configuro la ORM
setupWaterline(
	{
		adapters:		AppAdapter
	,	collections:	AppCollections
	,	connections:	AppConnection
	}
,	function waterlineReady (err, bs)
	{
		//	En caso de que ocurra un error lo muestro termino la ejecucion y lo muestro en consola
		if	(err)
			throw err;

		//	Obtengo el nombre de todos los archivos dentro de la carpeta bootstrap (omitiendo setup)
		var	modelsToBs
		=	_.map(
				_.filter(
					fs.readdirSync('bootstrap')
				,	function(name)
					{
						//	Selecciono todos los archivos javascrip que no se llamen setup
						return	_.endsWith(name,'.js') && (name.indexOf('setup') == -1);
					}
				)
			,	function(name)
				{
					//	Remuevo la extencion del nombre
					return	name.substr(0,name.length-3);
				}
			)

		async
			.parallel(
				_.object(
					modelsToBs
				,	_.map(
						modelsToBs
					,	function(name)
						{
							return	function(callback)
									{
										bs.collections[name]
											.destroy(
												function(err)
												{
													if	(err)
														callback(err)

													bs.collections[name]
														.create(
															require('./bootstrap/'+name).data
														,	function createCallback(err, created)
															{
																callback(err, err || true);
															}
														)
												}
											)
									}
						}
					)
				)
		,	function(error, result)
			{
				_.each(
					result
				,	function(status, model)
					{
						log[status ? 'info' : 'error'](model+': Carga de datos '+(status ? 'correcta' : 'incorrecta'));
					}
				)
			}
		)
	}
);