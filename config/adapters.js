/**
* Configuro el adaptador para conectarme a la db

@return {Adapter}
*/


module.exports = {

	//	Defino un adapter e importo la libreria asoaciada al mismo
	'sails-disk':	require('sails-disk')
	
	/*
	,	sails-mongo:	require('sails-mongo')
	,	sails-mysql:	require('sails-mysql')
	*/

}