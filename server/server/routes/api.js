const configS3 = require('../config/s3credentials');


module.exports = (router, passport) => {
	
	// this router middleware protects these routes with token based authentication
	// don't need sessions since we are using token authentication
	// router.use(passport.authenticate('bearer', { session: false })); --> placed inside the actual route now


	router.get('/gets3data', (req, res, next) => {

		console.log('1111222222');

		if(req.query.access_token) {
			console.log('HIT HERE!!!!!!!!!!!');
			next(); // move to passport authentication middleware
		}
		else
			next('route'); // skip next middleware and go to next route ('/testAPI'); throws away remaining middlewares in this route

	}, passport.authenticate('bearer', { session: false }), (req, res) => {

		console.log('*********** HIT HERE *************');

		res.json(configS3);
		// res.json({ secretData: 'abc123', Authenticated: true });
	});

	router.get('/testAPI', (req, res, next) => {
		if(req.query.access_token)
			next(); // move to passport authentication middleware
		else
			next('route'); // skip next middleware and go to next route ('/testAPI'); throws away remaining middlewares in this route

	}, passport.authenticate('bearer', { session: false }), (req, res) => {
		res.json({ secretData: 'abc123', Authenticated: true });
	});


	router.get('/testAPI', (req,res) => {
		res.json({ secretData: 'abc123', Authenticated: false });
	});
};