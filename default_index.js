(function() {

	const config ={

		apiKey: "AIzaSyBzcBFPL6xIacLGi9h0l5NpiNnP04Jzrbs",
		authDomain: "slug-roulette.firebaseapp.com",
		databaseURL: "https://slug-roulette.firebaseio.com",
		storageBucket: "slug-roulette.appspot.com",
	
	};
	firebase.initalizeApp(config);
	
	const txtEmail    = document.getELementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin    = document.getElementById('btnLogin');
	const btnSignUp   = document.getElementById('btnSignUp');
	const btnLogout   = document.getElementById('btnLogout');

	btnLogin.addEventListener('click', e=> {

		const email = txtEmail.value;
		const pass  = txtPassword.value;
		const auth  = firebase.auth();
		alert('a');
		const promise = auth.signInWithEmailAndPassword(email, password);
		promise.catch(e => console.log(e.message));
	});
}());

