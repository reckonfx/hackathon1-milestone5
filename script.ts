
const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumeDisplay = document.getElementById("resumeDisplay") as HTMLDivElement;
const shareableLinkContainer = document.getElementById("shareableLinkContainer") as HTMLDivElement;
const shareableLink = document.getElementById("shareableLink") as HTMLAnchorElement;
const downloadPdf = document.getElementById("downloadPdf") as HTMLButtonElement;

// handling Form Submission
form.addEventListener("submit", (event:Event)=>{
 event.preventDefault(); // restricting the page reload

//  collectiong information
const userName =(document.getElementById("userName") as HTMLInputElement).value;
const name = (document.getElementById("name") as HTMLInputElement).value;
const email = (document.getElementById("email") as HTMLInputElement).value;
const phone = (document.getElementById("phone") as HTMLInputElement).value;
const education = (document.getElementById("education") as HTMLInputElement).value;
const experience = (document.getElementById("experience") as HTMLInputElement).value;
const skills = (document.getElementById("skills") as HTMLInputElement).value;

// Saving Form data in local storage.

const resumeData = {
    userName,
    name,
    email,
    phone,
    education,
    experience,
    skills

};
//  saving the data locally

localStorage.setItem(userName,JSON.stringify(resumeData));



// Generating Resume content dynamically

const resumeHtml = `
<h1><b> Editable Resume </b></h1>
<h2> Personal Information </h2>
<br>
<p><span contentEditable = "true"><b>Name :</b> ${name}</p></span><br>
<p><span contentEditable = "true"><b>Email :</b> ${email}</p></span><br>
<p><span contentEditable = "true"><b>Phone:</b> ${phone}</span></p><br>

<h3><b>Education:</b></h3> <p><span contentEditable = "true">${education}</span></p><br>


<h3><b>Experience :</b></h3> 
<p><span contentEditable = "true">${experience}</span></p><br>

<h3>Skills:</h3>
 <p><span contentEditable = "true">${skills}</span></p>
`;

//  Displaying Resume Information

if(resumeDisplay){
    resumeDisplay.innerHTML = resumeHtml;
}else{
    console.error("All Fields are Required to Display")
}

//  Generating a shareable link with username only
const shareableUrl = `${window.location.origin}?userName=${encodeURIComponent(userName)}`;

// Displaying the shareable Link
shareableLinkContainer.style.display="block";
shareableLink.href=shareableUrl;
shareableLink.textContent = shareableUrl;



});

// handling pdf document

// this will open prnt message and allow user to save the file as pdf
downloadPdf.addEventListener("click",()=>{
    window.print();
});


//  prefill the form based on the username in the link
window.addEventListener("DOMContentLoaded",()=>{
    const urlParams =new URLSearchParams(window.location.search);
    const userName = urlParams.get("userName");
    if(userName){
        const saveResumeData = localStorage.getItem(userName);
        if(saveResumeData){
            const resumeData = JSON.parse(saveResumeData);
            (document.getElementById("userName") as HTMLFormElement).value = resumeData.userName;
            (document.getElementById("name") as HTMLFormElement).value = resumeData.name;
            (document.getElementById("phone") as HTMLFormElement).value = resumeData.phone;
            (document.getElementById("email") as HTMLFormElement).value = resumeData.email;
            (document.getElementById("education")as HTMLFormElement).value = resumeData.education;
            (document.getElementById("experience") as HTMLFormElement).value = resumeData.experience;
            (document.getElementById("skills") as HTMLFormElement).value = resumeData.skills;
        }
    }  
});