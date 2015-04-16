/**
* Configuramos los modelos, conexiones y adaptadores de waterline

@param options
	:: {Object}	Adapters	[i.e. a dictionary]
	:: {Object}	Connections	[i.e. a dictionary]
	:: {Object}	Collections	[i.e. a dictionary]

@param	{Function} cb
	() {Error} err
	() ontology
		:: {Object}	Collections
		:: {Object}	Connections

@return {Waterline}
*/

module.exports = function bootstrap( options, cb )
	{

		//	Importo las librerias necesarias
		var	_
		=	require('lodash')
		, 	Waterline
		=	require('waterline');

		//	Inicializo los adapters, connections y collections
		var adapters
		=	options.adapters || {}
		,	connections
		=	options.connections || {}
		,	collections
		=	options.collections || {};

		//	Recorro la collecion de adapters
		_.each(
			adapters
		,	function (def, identity)
			{
				//	Nos aseguramos de que el adaptador tenga una identidad
				def.identity = def.identity || identity;
			}
		);

		//	Definimos una collecion a mappear
		var	extendedCollections
		=	[];

		//	Recorro la collecion de models
		_.each(
			collections
		,	function (def, identity)
			{
				//	Nos aseguramos de que el modelo tenga una identidad
				def.identity = def.identity || identity;

				//	Extendemos el Schema de Waterline a nuestro modelo
				extendedCollections.push(Waterline.Collection.extend(def));
			}
		);

		//	Instanciamos Waterline
		var	waterline
		=	new Waterline();
		
		//	Cargamos nuestros modelos en la instancia de waterline
		_.each(
			extendedCollections
		,	function (collection)
			{
				waterline.loadCollection(collection);
			}
		);


		//	Inicializamos waterline junto a nuestros adapters y conexiones
		waterline
			.initialize(
				{
					adapters: adapters,
					connections: connections
				}
			,	cb
			);

		//	Devolvemos la instancia de waterline
		return waterline;
	};