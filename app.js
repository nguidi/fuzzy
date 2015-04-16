/**
* Configuracion del servidor express

@return {HTTP APP}
*/

//	Importo las librerias necesarias para express
var	express
=	require('express')
,	path
=	require('path')
,	favicon
=	require('serve-favicon')
,	logger
=	require('morgan')
,	cookieParser
=	require('cookie-parser')
,	bodyParser
=	require('body-parser');

//	Importo las librerias necesarias para la ORM
var	Waterline
=	require('waterline');

//	Importo librerias auxiliares
var	_
=	require('lodash')
,	fs
=	require('fs');

//	Instancio la http app
var app = express();

//	Indico que favicon utilizare
app.use(favicon(__dirname + '/public/favicon.ico'));

//	Indico el logger a utilizar y el modo a ser utilizado
app.use(logger('dev'));

//	Indico y configuro el parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//	Indico que directorio a usar como publico
app.use(express.static(path.join(__dirname, 'public')));

//	Instanciamos la ORM
app.set('orm',new Waterline());

//	Inicializo la conexion y los adpatadores de la aplicacion
app.set('adapters',require('./config/adapters') || {});
app.set('connections', require('./config/connections') || {});

//	Recorro la collecion de adapters
_.map(
	app.get('adapters')
,	function (def, identity)
	{
		//	Nos aseguramos de que el adaptador tenga una identidad
		return	_.extend(
					def
				,	{
						identity: def.identity || identity
					}
				)
	}
);

//	Creo la waterline collection en base a las collections definidas
_.each(
	require('./config/collections') || {}
,	function (def, identity)
	{
		//	Obtengo la orm y cargo las colleciones de waterline (Varifico que tengan identidad y si no les agrego una)
		app.get('orm')
			.loadCollection(
				Waterline.Collection.extend(
					_.extend(
						def
					,	{
							identity: def.identity || identity
						}
					)
				)
			)
	}
);

//	Obtengo el nombre de todos los archivos dentro de la carpeta routes
_.each(
	_.map(
		_.filter(
			fs.readdirSync('routes')
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
		//	Importo la ruta segun el nombre
		var routes
		=	require('./routes/'+name);
		//	Indico que rutas voy a utilizar. Si el archivo es el index, las rutas se declaran sobre el "/"
		app.use('/'+name, routes);			
	}
);

//	Capturo el error 404 y devuelvo un mensaje de error
app.use(
	function(req, res, next) {
		var	err
		=	new Error('No Encontrado');
		err.status = 404;
		next(err);
	}
);

//	Capturo un error del servidor en modo desarrollo
if (app.get('env') === 'development') {
	app.use(
		function(err, req, res, next)
		{
			res.status(err.status || 500);
			res.send(
				{
					message: err.message
				,	error: err
				}
			);
		}
	);
}

//	Capturo un error del servidor en modo produccion
app.use(
	function(err, req, res, next)
	{
		res.status(err.status || 500);
		res.send(
			{
				error: 'Se ha detectado un error'
			}
		);
	}
);

module.exports = app;