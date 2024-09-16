var form = document.getElementById("resumeForm");
var resumeDisplay = document.getElementById("resumeDisplay");
var shareableLinkContainer = document.getElementById("shareableLinkContainer");
var shareableLink = document.getElementById("shareableLink");
var downloadPdf = document.getElementById("downloadPdf");
// handling Form Submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // restricting the page reload
    //  collectiong information
    var userName = document.getElementById("userName").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Saving Form data in local storage.
    var resumeData = {
        userName: userName,
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    //  saving the data locally
    localStorage.setItem(userName, JSON.stringify(resumeData));
    // Generating Resume content dynamically
    var resumeHtml = "\n<h1><b> Editable Resume </b></h1>\n<h2> Personal Information </h2>\n<br>\n<p><span contentEditable = \"true\"><b>Name :</b> ".concat(name, "</p></span><br>\n<p><span contentEditable = \"true\"><b>Email :</b> ").concat(email, "</p></span><br>\n<p><span contentEditable = \"true\"><b>Phone:</b> ").concat(phone, "</span></p><br>\n\n<h3><b>Education:</b></h3> <p><span contentEditable = \"true\">").concat(education, "</span></p><br>\n\n\n<h3><b>Experience :</b></h3> \n<p><span contentEditable = \"true\">").concat(experience, "</span></p><br>\n\n<h3>Skills:</h3>\n <p><span contentEditable = \"true\">").concat(skills, "</span></p>\n");
    //  Displaying Resume Information
    if (resumeDisplay) {
        resumeDisplay.innerHTML = resumeHtml;
    }
    else {
        console.error("All Fields are Required to Display");
    }
    //  Generating a shareable link with username only
    var shareableUrl = "".concat(window.location.origin, "?userName=").concat(encodeURIComponent(userName));
    // Displaying the shareable Link
    shareableLinkContainer.style.display = "block";
    shareableLink.href = shareableUrl;
    shareableLink.textContent = shareableUrl;
});
// handling pdf document
// this will open prnt message and allow user to save the file as pdf
downloadPdf.addEventListener("click", function () {
    window.print();
});
//  prefill the form based on the username in the link
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var userName = urlParams.get("userName");
    if (userName) {
        var saveResumeData = localStorage.getItem(userName);
        if (saveResumeData) {
            var resumeData = JSON.parse(saveResumeData);
            document.getElementById("userName").value = resumeData.userName;
            document.getElementById("name").value = resumeData.name;
            document.getElementById("phone").value = resumeData.phone;
            document.getElementById("email").value = resumeData.email;
            document.getElementById("education").value = resumeData.education;
            document.getElementById("experience").value = resumeData.experience;
            document.getElementById("skills").value = resumeData.skills;
        }
    }
});
