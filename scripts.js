document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registration-form");

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.getElementById("full-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const location = document.getElementById("location").value;
        const skills = document.getElementById("skills").value;
        const availability = document.getElementById("availability").value;

        alert(Thank you, ${fullName}, for registering as a volunteer!\n\nDetails:\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nSkills: ${skills}\nAvailability: ${availability});

        registrationForm.reset();
    });
});