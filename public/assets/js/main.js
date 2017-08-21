	//Modal Javascript
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
		$("#signup-submit").hide();
		$("#login-submit").show();
		$("#modal-switch").html("Sign up");
		isSignup = false;
	};

	function createSignup() {
		$("#modal-email-div").show();
		$("#modal-password2-div").show();
		$("#modal-header").html("Welcome");
		$("#login-submit").hide();
		$("#signup-submit").show();
		$("#modal-switch").html("Log in");
		isSignup = true;
	};

	$(".closeBtn").on("click", function() {
		$(".modal").toggleClass("is-active");
	});


// Nav Bar Burger Menu 

jQuery(document).ready(function ($) {

  var $toggle = $('#nav-toggle');
  var $menu = $('#nav-menu');

  $toggle.click(function() {
    $(this).toggleClass('is-active');
    $menu.toggleClass('is-active');
  });
});
