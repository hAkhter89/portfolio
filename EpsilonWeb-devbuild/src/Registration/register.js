
$.post("http://epsilon.move.pk/query.php", { query: "modules"
    }, function(data){
        data = JSON.parse(data);
        let modulesArr = data;
        modulesContainer.innerHTML = `<h3>General Modules</h3>`;
        createModules(modulesArr.general, "g");
        modulesContainer.innerHTML += `<h3>STEM Modules</h3>`;
        createModules(modulesArr.stem, "s");
        let allModules = document.querySelectorAll('.module');
        for (let i = 0; i < allModules.length; i++) 
            allModules[i].addEventListener("change", moduleLimitCheck);
    } );

$.post("http://epsilon.move.pk/query.php", { query: "bar"
    }, function(data){
        data = JSON.parse(data);
        data.forEach(function(bar) {
            var ba = document.createElement('option');
            ba.value = bar.id;
            ba.innerHTML = bar.name;
            document.getElementById('ambassador').appendChild(ba);
        }); } );


let modulesContainer = document.querySelector(".modules");
let sectionsContainer = document.querySelector("#sectionsContainer");
const form = document.getElementById("form")
const teamName = document.getElementById("name")
const password = document.getElementById("password")
const repassword = document.getElementById("repassword")
const errorBox = document.getElementById("errorBox")
const notes = document.getElementById("notes")
const ambassador = document.getElementById("ambassador")


function createModules(arr, gOrS) {
    for (let i = 0; i < arr.length; i++)
        modulesContainer.innerHTML += `<label><input modId=` + arr[i].id + ` type="checkbox" class="module ` + gOrS + `module" name="` + arr[i].name + `">` + arr[i].name + `</label><br>` }

let sectionButtons = document.querySelectorAll(".sectionButtons");

for (let i = 0; i < sectionButtons.length; i++) sectionButtons[i].addEventListener("click", changeSection);

const validateTeamData = () => {
    let error = "";
    errorBox.innerHTML = "";
    if (teamName.value === '' || teamName.value === null)
        error += 'Team Name is required<br>';
    if (teamName.value.length < 4 || teamName.value.length > 16)
        error += 'Team Name must contain atleast 4 characters and must be less than 16 characters<br>';
    if (password.value === '' || password.value === null || repassword.value === '' || repassword.value === null)
        error += 'Password is required<br>';
    if (repassword.value !== password.value)
        error += 'Passwords donot match<br>';
    if (password.value.length < 4 || password.value.length > 10)
        error += 'Password must have atleast 4 characters and must be smaller than 10 characters<br>';
    errorBox.innerHTML = error;
    return (error == "")? 
        {
            name: teamName.value,
            password: password.value,
        }: false;
}

const moduleLimitCheck = (evt) => {
    if (!evt) {
        let randCheckedModule = document.querySelectorAll('.module:checked');
        randCheckedModule = randCheckedModule[Math.floor(Math.random()*randCheckedModule.length)];
        evt = {path: [randCheckedModule]}; }
    let sModules = document.querySelectorAll('.smodule');
    let gModules = document.querySelectorAll('.gmodule');
    let checked = 0; let error = "";
    for (let i = 0; i < sModules.length; i++)
        if (sModules[i].checked) checked++;
    if (checked > 4) {
        evt.path[0].checked = false;
        error += "STEM Module Limit Reached: 4.<br>"; }
    else if (checked < 4) error += (4-checked) + " STEM Modules remaining to be selected.<br>";
    checked = 0;
    for (let i = 0; i < gModules.length; i++)
        if (gModules[i].checked) checked++;
    if (checked > 2) {
        evt.path[0].checked = false;
        error += "General Module Limit Reached: 2.<br>"; }
    else if (checked < 2) error += (2-checked) + " General Modules remaining to be selected.<br>";
    errorBox.innerHTML = error;
    return (error == "")? getModulesArray(): false;
}

const getModulesArray = () => {
    let allModules = document.querySelectorAll('.module');
    let modules = [];
    for (let i = 0; i < allModules.length; i++)
        if (allModules[i].checked)
            modules.push(allModules[i].getAttribute("modId"));
    return modules;
}

const validateMemberData = (memberIndex) => {
    console.log(memberIndex);
    const j = memberIndex+1; let error = "";
    const name = document.getElementById(`name${j}`);
    const email = document.getElementById(`email${j}`);
    const phone = document.getElementById(`phone${j}`);
    const institution = document.getElementById(`institution${j}`);
    errorBox.innerHTML = "";
    // VERIFICATION OF PARTICIPANT DETAILS
    if (name.value === '' || name.value === null) {
        error += 'Name for member#' + j + ' is required<br>'; 
    }
    if (email.value === '' || email.value === null) {
        error += 'Email for member#' + j + ' is required<br>'; 
    }
    if (phone.value === '' || phone.value === null) {
        error += 'Phone number for member#' + j + ' is required<br>'; 
    }
    if (institution.value === '' || institution.value === null) {
        error += 'Institution for member#' + j + ' is required<br>';  
    }
    // if (phone.value.length != 11 || phone.value.length != 12) {
    //     error += 'Phone number must contain 11 digits in the format: 03xxxxxxxxx<br>'; 
    // }
    errorBox.innerHTML = error;
    return (error == "")?  
        {
            name: name.value,
            email: email.value,
            phone: phone.value,
            institution: institution.value 
        }: false;
}

function validateSection(id) {
    let result = false;
    console.log(id, id-2);
    if (id == 0) result = validateTeamData();
    else if (id == 1) result = moduleLimitCheck();
    else result = validateMemberData(id-2);
    return (result)? true: false;
}

function changeSection(evt) {
    // let sectionButtons = document.querySelectorAll(".sectionButtons");
    // let sections = document.querySelectorAll(".sections");
    let sectionButtonClicked = evt.path[0];
    let id = Number(sectionButtonClicked.getAttribute("id"));
    let sectionClicked = document.querySelector("#section" + id);
    let activeSection = document.querySelector(".sections[style='display: block;']");
    let activeSectionId = Number(activeSection.getAttribute("id").at(-1));
    if (activeSection != sectionClicked) {
        if (errorBox.innerHTML == "") validateSection(activeSectionId);
        else errorBox.innerHTML = "";
        if (errorBox.innerHTML == "") {
            sectionClicked.style.display = "block";
            activeSection.style.display = "none"; } }
}

document.querySelector("#next").addEventListener("click", nextSection)

document.querySelector("#back").addEventListener("click", backSection)


function nextSection() {
    let sectionButtons = document.querySelectorAll(".sectionButtons");
    let activeSectionId = Number(document.querySelector(".sections[style='display: block;']").getAttribute("id").at(-1));
    if (activeSectionId < (sectionButtons.length-1)) changeSection({path:[sectionButtons[activeSectionId+1]]});
}
function backSection() {
    let sectionButtons = document.querySelectorAll(".sectionButtons");
    let activeSectionId = Number(document.querySelector(".sections[style='display: block;']").getAttribute("id").at(-1));
    if (activeSectionId > 0) changeSection({path:[sectionButtons[activeSectionId-1]]});
}

document.querySelector("#addMember").addEventListener("click", addMember);

function addMember() {
    let sectionCount = document.querySelectorAll(".sections").length;
    let sectionsContainer = document.querySelector("#sectionsContainer");
    let sectionsNavBar = document.querySelector("#sectionsNavBar");
    memberCount = document.querySelectorAll(".members").length;
    if (memberCount < 6) {
        sectionsContainer.innerHTML +=
        `<div class="sections members" id="section` + sectionCount + `" style="display: none;">
            <h3>Member ` + (memberCount + 1) + ` Details</h3>
            <label>Name: <input type="text" name="name` + (memberCount + 1) + `" placeholder="Name" id="name` + (memberCount + 1) + `" ></label><br>
            <label>Email: <input type="email" name="email` + (memberCount + 1) + `" placeholder="Email" id="email` + (memberCount + 1) + `" ></label><br>
            <label>Phone: <input type="text" name="phone` + (memberCount + 1) + `" placeholder="03xxxxxxxxx" id="phone` + (memberCount + 1) + `" minlength="10" maxlength="11"></label><br>
            <label>institution: <input type="text" name="institution` + (memberCount + 1) + `" placeholder="institution" id="institution` + (memberCount + 1) + `"></label><br>
            <input id="submit" type="submit" value="Register">
        </div>`;
        document.querySelector("#addMember").remove();
        document.querySelector("#next").remove();
        document.querySelector("#submit").remove();
        sectionsNavBar.innerHTML += `<span class="sectionButtons" id="` + sectionCount + `">Member ` + (memberCount + 1) + `</span>
        <span id="addMember">Add Member</span>
        <span id="next" style="cursor: pointer; user-select: none;">&gt;</span>`;
        document.querySelector("#addMember").addEventListener("click", addMember);
        document.querySelector("#next").addEventListener("click", nextSection);
        let sectionButtons = document.querySelectorAll(".sectionButtons");
        for (let i = 0; i < sectionButtons.length; i++) sectionButtons[i].addEventListener("click", changeSection);
    }
    resetDeleteMemberBtn();
}

function resetDeleteMemberBtn() {
    let btn = document.querySelector("#deleteMember");
    let sections = document.querySelectorAll(".sections");
    lastSection = sections[sections.length-1];
    if (btn) btn.remove();
    if (sections.length > 6) {
        lastSection.innerHTML += '<div id="deleteMember">X</div>';
        btn = document.querySelector("#deleteMember");
        lastSection.insertBefore(btn, lastSection.firstChild);
        document.querySelector("#deleteMember").addEventListener("click", deleteMember);
    }
}

function deleteMember(evt) {
    backSection();
    let lastSection = document.querySelectorAll(".sections");
    lastSection[lastSection.length-1].remove();
    sections = document.querySelectorAll(".sections");
    sections[sections.length-1].innerHTML += '<input id="submit" type="submit" value="Register">';
    let lastSectionButtons = document.querySelectorAll(".sectionButtons");
    lastSectionButtons[lastSectionButtons.length-1].remove();
    resetDeleteMemberBtn();

}

let data = {
    register: 'query',
    name: '',
    password: '',
    bar: '',
    note: '',
    modules: [],
    members: [],
}

form.addEventListener('submit', (e) => {
    let errorCount = 0;
    e.preventDefault();

    let result = validateTeamData();
    if (result) {
        data.name = result.name;
        data.password = result.password }
    else errorCount++;

    result = moduleLimitCheck();
    if (result) data.modules = result;
    else errorCount++;

    len = document.querySelectorAll(".members").length;
    for (let i = 0; i < len; i++) {
        let result = validateMemberData(i);
        if (result) data.members.push(result);
        else { errorCount++; break; } }


    console.log(errorCount, data);

    // Submission    
    if (errorCount == 0) {
        // let options = {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // }
        // fetch('http://epsilon.move.pk/query.php', options)
        // .then((response) => response.json())
        // .then((json) => console.log(json))
        console.log(data)
    }
})


