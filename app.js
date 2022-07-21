var menuToggle = document.getElementById("menuToggle");
var body = document.querySelector("body")
var menuitem = document.querySelectorAll(".menu-item")
var menuBar = gsap.timeline();

menuBar.reverse();

var tl = gsap.timeline({ paused: true });

tl.to('.fullpage-menu', {
	duration: 0,
	display: "block",
	ease: 'power2.in',
});
tl.to("body", {
	overflowY: "hidden"
})
tl.to("main", {
	opacity: 0,

})
tl.from('.menu-bg span', {
	duration: 1,
	x: "100%",
	stagger: 0.1,
	ease: 'power2.in'
});

tl.from('.main-menu li a', {
	duration: 1,
	y: "100%",
	stagger: 0.2,
	ease: 'power2.in'
}, "-=0.5");

tl.from('.social-links li', {
	duration: 1,
	y: "-100%",
	opacity: 0,
	stagger: 0.1,
	ease: 'power2.in'
}, "-=0.5");

tl.reverse();

menuToggle.addEventListener('click', function () {
	menuBar.reversed(!menuBar.reversed());
	tl.reversed(!tl.reversed());
});

menuitem.forEach(el => {
	el.addEventListener("click", () => {
		tl.reverse();
	})
})



// home page animation
let homeGsap = gsap.timeline();

homeGsap.from(".lg-title", {
	duration: 1,
	x: -100,
	opacity: 0,
	ease: "power2.out"
})
homeGsap.from(".des", {
	duration: 0.5,
	x: -100,
	opacity: 0,
	ease: "power2.out",
})


homeGsap.from(".img-container", {
	duration: 0.5,
	x: 100,
	opacity: 0,
	ease: "power2.out",
})
homeGsap.from(".nav-container", {
	duration: 0.5,
	top: "-100px",
	opacity: 0,
	ease: "power2.out",
})


// form vallidation
const nameInput = document.querySelector("input[name='name']")
const emailInput = document.querySelector("input[name='email']")
const phoneInput = document.querySelector("input[name='phone']")
const messageInput = document.querySelector("textarea[name='message']")
const form = document.querySelector("form[name='contact_form']")
let alert=document.querySelector(".display")
nameInput.isValid = () => !!nameInput.value;
emailInput.isValid = () => isValidEmail(emailInput.value);
phoneInput.isValid = () => isValidPhone(phoneInput.value);
messageInput.isValid = () => !!messageInput.value;

const inputFields = [nameInput, emailInput, phoneInput, messageInput];

const isValidEmail = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => {
	const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	return re.test(String(phone).toLowerCase());
};

let shouldValidate = false;
let isFormValid = false;


const validateInputs = () => {

	if (!shouldValidate) return;

	isFormValid = true;
	inputFields.forEach((input) => {
		input.classList.remove("invalid");
		input.nextElementSibling.classList.add("hide");

		if (!input.isValid()) {
			input.classList.add("invalid");
			isFormValid = false;
			input.nextElementSibling.classList.remove("hide");
		}
	});
};

function sendMail(name,email,message){
	var params={
		from_name:name,
		from_Email:email,
		from_Message:message
	}
	emailjs.send('service_l45pjul', 'template_5xk7q83',params)
    .then(function(response) {
    
	   alert.innerHTML="Thank you for Text Me!!"
	   alert.classList.remove("display")

	   setTimeout(()=>{
		alert.classList.add("display")
	   },2000)
    }, function(error) {
		alert.innerHTML="Some Error Occured Please Try Again"
		alert.classList.remove("display")
		setTimeout(()=>{
			alert.classList.add("display")
		   },2000)
    });
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	shouldValidate = true;
	validateInputs();
	if (isFormValid) {

		sendMail(nameInput.value,emailInput.value,messageInput.value)
	}
  });
  
  inputFields.forEach((input) => input.addEventListener("input", validateInputs));