const User = require('../models/user');

module.exports = (router, passport) => {
	//localhost:8080/auth
	router.get('/', (req, res) => {
		res.render('index.ejs');
	});

	//localhost:8080/auth/login
	// router.get('/login', (req, res) => {
	// 	res.render('login.ejs', { message: req.flash('loginMessage') });
	// });

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/getToken',
		failureRedirect: '/login'
	}));
	

	router.get('/signup', (req, res) => {
		res.render('signup.ejs', { message: req.flash('signUpMessage') });
	});

	function validateSignupForm(payload) {
	  const errors = {};
	  let isFormValid = true;
	  let message = '';

	  // if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
	  if (!payload || typeof payload.email !== 'string') {
	    isFormValid = false;
	    errors.email = 'Please provide a correct email address.';
	  }

	  // if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
	  if (!payload || typeof payload.password !== 'string') {
	    isFormValid = false;
	    errors.password = 'Password must have at least 8 characters.';
	  }

	  if (!isFormValid) {
	    message = 'Check the form for errors.';
	  }

	  return {
	    success: isFormValid,
	    message,
	    errors
	  };
	}

	router.post('/signup', (req, res, next) => {

	  const validationResult = validateSignupForm(req.body);
	  if (!validationResult.success) {
	    return res.status(400).json({
	      success: false,
	      message: validationResult.message,
	      errors: validationResult.errors
	    });
	  }


	  return passport.authenticate('local-signup', (err) => {
	    if (err) {
	      if (err.name === 'MongoError' && err.code === 11000) {
	        // the 11000 Mongo code is for a duplication email error
	        // the 409 HTTP status code is for conflict error
	        return res.status(409).json({
	          success: false,
	          message: 'Check the form for errors.',
	          errors: {
	            email: 'This email is already taken.'
	          }
	        });
	      }

	      return res.status(400).json({
	        success: false,
	        message: 'Could not process the form.'
	      });
	    }

	    return res.status(200).json({
	      success: true,
	      message: 'You have successfully signed up! Now you should be able to log in.'
	    });

	  })(req, res, next);
});

	// isLoggedIn is middleware defined below
	// router.get('/profile', isLoggedIn, (req, res) => {
	// 	res.render('profile.ejs', { user: req.user });
	// });

	router.get('/logout', (req, res) => {
		req.logout(); //passport adds this function to express
		res.redirect('/');
	});

	/*
		*Browsers will by default try to request /favicon.ico from the root of a hostname, in order to show an icon in the browser tab.
		*This catches the favicon.ico request and sends a 204 No Content status.
	*/
	router.get('/favicon.ico', (req, res) => {
		res.status(204);
	});


	// Facebook auth routes
	// Redirect the user to Facebook for authentication.  When complete,
	// Facebook will redirect the user back to the application at
	// /auth/facebook/callback
	// add {scope: ['email']} in order to access facebook user's email
	router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/' }));

	// add {scope: ['profile', 'email']} in order to access google user's profile and email
	router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

	router.get('/google/callback', passport.authenticate('google', { successRedirect: '/profile', failureRedirect: '/' }));


	router.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));
	router.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

	router.get('/connect/local', (req, res) => {
		res.render('connect-local.ejs', { message: req.flash('signUpMessage') });
	});

	router.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/connect/local',
		failureFlash: true
	}));


	// remove facebook token in user profile
	router.get('/unlink/facebook', (req, res) => {
		let user = req.user;

		user.facebook.token = null;
		user.save((err) => {
			if(err)
				throw err;
			res.redirect('/profile');
		});

	});

	// delete local account data if user wants to unlink
	router.get('/unlink/local', (req, res) => {

		let user = req.user;

		user.local.password = null;
		user.local.email = null;

		user.save((err) => {
			if(err)
				throw err

			res.redirect('/profile');
		});
		
	});

	// remove googe token in user profile
	router.get('/unlink/google', (req, res) => {
		let user = req.user;

		user.google.token = null;

		user.save((err) => {
			if(err)
				throw err
			res.redirect('/profile');
		});
	});
}