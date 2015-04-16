/**
* @route	users
* @desc		Rutas asociadas al modelo User
* @return	{Router}
*/


var	express
=	require('express')
,	router
=	express.Router();

// GET /user
router.get('/', function(req, res, next) {
	//	Obtengo todos los usuario usando waterline
	User.find().exec(
		function(err, users)
		{
			//	Si hay un error continuo pasando el error como argumento
			if	(err)
				next(err)
			//	Devuelvo los usuarios obtenidos
			res.send(users);
		}
	)
});

module.exports = router;