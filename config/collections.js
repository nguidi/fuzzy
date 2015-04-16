/**
* Obtiene todos los modelos a partir del nombre del archivo

@return {Collections}

*/

//	Importo las librerias necesarias
var	_
=	require('lodash')
,	fs
=	require('fs');

//	Creo un objeto vacio al cual asignare cada modelo
var	mappedModels
=	{}

//	Obtengo el nombre de todos los archivos dentro de la carpeta models
_.each(
	_.map(
		_.filter(
			fs.readdirSync('models')
		,	function(name)
			{
				//	Selecciono todos los archivos javascrip
				return	_.endsWith(name,'.js');
			}
		)
	,	function(name)
		{
			//	Remuevo la extencion del nombre
			return	name.substr(0,name.length-3);
		}
	)
,	function(name)
	{
		//	Importo el modelo asociado al nombre leido previamente
		var model
		=	require('../models/'+name);

		mappedModels[model.identify ||	name] = model
	}
);

//	Configuro la conexion por defecto para cada modelo
_.mapValues(
	mappedModels
,	function(model)
	{
		return	_.extend(
					model
				,	{
						connection:	model.connection || 'default'
					}
				)
	}
)

module.exports = mappedModels