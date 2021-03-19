/////////////////////////////////////////////////////////////////////////////////////////////////

const form_sign = document.getElementById('form-sign');
const form_login = document.getElementById('form-login');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const password_log = document.getElementById('password-login');
const email_log = document.getElementById('email-login');

form_sign.addEventListener('submit', e => {
	e.preventDefault();

	if (checkInputs()) {
		getDataSign(email.value.trim());
	}
});

form_login.addEventListener('submit', e => {
	e.preventDefault();

	if (checkInputsLogin()) {
		getDataLogin(email_log.value.trim(), password_log.value.trim());
	}

});

function checkInputs() {
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();

	if (usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
		return false;
	} else {
		setSuccessFor(username);
	}

	if (emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
		return false;
	} else if (!validateEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
		return false;
	} else {
		setSuccessFor(email);
	}

	if (passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
		return false;
	} else if (validatePassword(passwordValue) == false) {
		setErrorFor(password, 'Password should contain one capital letter, number, special symbol and be 8 characters in length');
		return false;
	} else {
		setSuccessFor(password);
	}

	if (password2Value === '') {
		setErrorFor(password2, 'Password Confirmation cannot be blank');
		return false;
	} else if (passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
		return false;
	} else {
		setSuccessFor(password2);
	}

	return true;
}

function checkInputsLogin() {
	const email_value = email_log.value.trim();
	const password_value = password_log.value.trim();

	if (email_value === '') {
		setErrorFor(email_log, 'Email cannot be blank');
		return false;
	} else if (!validateEmail(email_value)) {
		setErrorFor(email_log, 'Not a valid email');
		return false;
	} else {
		setSuccessFor(email_log);
	}

	if (password_value === '') {
		setErrorFor(password_log, 'Password cannot be blank');
		return false;
	} else {
		setSuccessFor(password_log);
	}

	return true;
}

function getDataLogin(email, password) {
	$.get("https://my-json-server.typicode.com/Adok6/final/users", function (data, status) {
		console.log(data);
		console.log(status);
		var res = findElement(data, email);
		if (res.length != 0) {
			if (res[0].password != password) {
				setErrorFor(password_log, 'Try again! Password is incorrect');
			}
			else {
				alert("You signed in!");
			}
		} else {
			setErrorFor(email_log, 'No such user');
		}

	});
}

function getDataSign(emailVal) {
	$.get("https://my-json-server.typicode.com/Adok6/final/users", function (data, status) {
		console.log(data);
		console.log(status);
		var res = findElement(data, emailVal);
		if (res.length != 0) {
			setErrorFor(email, 'Such email already registered');
		} else {
			registerUser(username.value.trim(), emailVal, password.value.trim());
		}

	});
}

function findElement(json, email) {
	var res = $.grep(json,
		function (element, index) {
			return (element.email === email);
		});
	return res;
}

function registerUser(usernameVal, emailVal, passwordVal) {
	$.post("https://my-json-server.typicode.com/Adok6/final/users",
		obj = {
			"username": usernameVal,
			"email": emailVal,
			"password": passwordVal
		},
		function (data, status) {
			if (status == "success") {
				console.log(data);
				alert("Registered Succesfully! Your id: " + data.id);
			}
		});
}

$('#login-toggler').on('click', function (e) {
	$(".container-sign").toggleClass("d-none");
	$(".container-login").toggleClass("d-none");
});

$('#sign-toggler').on('click', function (e) {
	$(".container-sign").toggleClass("d-none");
	$(".container-login").toggleClass("d-none");
});


function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control-sign error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control-sign success';
}

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
	const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	return regex.test(password);
}


