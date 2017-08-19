	var isSignup = true;
	$(".loginBtn").on("click", function() {
		$(".modal").toggleClass("is-active");
		createLogin();
	});
	$(".signupBtn").on("click", function() {
		$(".modal").toggleClass("is-active");
		createSignup();
	});
	$("#modal-switch").on("click", function() {
		if (isSignup) {
			createLogin();
		}
		else {
			createSignup();
		}
	});

	function createLogin() {
		$("#modal-email-div").hide();
		$("#modal-password2-div").hide();
		$("#modal-header").html("Welcome Back");
		$("#submit").html("Log in");
		$("#modal-switch").html("Sign up");
		isSignup = false;
	};

	function createSignup() {
		$("#modal-email-div").show();
		$("#modal-password2-div").show();
		$("#modal-header").html("Welcome");
		$("#submit").html("Sign up");
		$("#modal-switch").html("Log in");
		isSignup = true;
	};

	$(".closeBtn").on("click", function() {
		$(".modal").toggleClass("is-active");
	});

