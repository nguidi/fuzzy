/**
* Configura las conexiones disponibles

@return {Connections}

*/

module.exports = {

	//	Creo una conexion llamada "sgc" (Sistema de Gesion de Compras)
	'default':
	{
		//	Le defino el tipo de adapter para esta conexion
		adapter: 'sails-disk'
	}

}