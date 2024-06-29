let tabs = document.querySelectorAll(".tabs span")
let tabContents = document.querySelectorAll(".ct")

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabContents.forEach((content) => {
            content.classList.remove("active")
        })
        tabs.forEach((tab) => {
            tab.classList.remove("active")
        })
        tabContents[index].classList.add("active")
        tabs[index].classList.add("active")
    })
})


const imgInput = document.querySelector(".img-input")
var uploadedImg = ''
const fileUpload = document.querySelector(".form")
const submit = document.querySelector(".form-submit")

imgInput.addEventListener("change", function() {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
        uploadedImg = reader.result
        document.querySelector(".display-img").style.display = "block"
        document.querySelector(".display-img").style.border = "1px solid black"
        document.querySelector(".display-img").style.backgroundImage = `url(${uploadedImg})`
    })
    reader.readAsDataURL(this.files[0])
})

async function uploadFile(query, name, inputSelector, address, hashVar) {
    let formData = new FormData();
    let fileInput = inputSelector;
    formData.append("query", query);
    formData.append("hash", hashVar);
    formData.append(name, fileInput.files[0]);
    console.log(formData)
    await fetch(address, {
        method: "POST",
        body: formData,
    }).then(function(response){
        abc = response.text().then(function(value) { 
            value = JSON.parse(value); 
            console.log(value); 
            if (value === true) {
                document.querySelector(".upload").style.display = "none"
                document.querySelector(".error").innerHTML = "uploaded"
            }
            else if (value === "Your file size is greater than our 5MB limit.") {
                error = "Your file size is greater than our 5MB limit."
            }
        });
    });
}

document.querySelector(".logout").addEventListener("click", function() {
    window.location.href = "https://www.youtube.com"
})

let error = document.querySelector(".error").innerText
fileUpload.addEventListener("submit", function(e) {
    e.preventDefault()
    if(imgInput.files.length === 0) {
        alert("no file selected")
    }
    else if(imgInput.files.length > 1) {
        alert("you should select only 1 file")
    }
    else {
        // document.querySelector(".status").innerHTML = "<h3>Payment Status:</h3> PENDING"
        let upload = uploadFile('proofOfPayment', 'proofOfPayment', imgInput, 'http://epsilon.move.pk/query.php', '8db40bca35ff678c194812d41cfeaee6');
    }
})






// function mapInfo(info) {

//     const members = info.members
//     members.forEach((member, index) => {
//         console.log(member)


//         var box = document.createElement('div')
//         box.classList.add("box")
//         var heading = document.createElement('h3')
//         heading.innerHTML = "Participant " + (index + 1)

//         var partItem = document.createElement('div')
//         partItem.classList.add("part-item")
//         var name = document.createElement('p')
//         name.innerHTML = "<b>Name:</b> " + member.name
//         var institute = document.createElement('p')
//         institute.innerHTML = "<b>Institution:</b> " + member.institution
//         partItem.appendChild(name)
//         partItem.appendChild(institute)

//         box.appendChild(heading)
//         box.appendChild(partItem)
//         console.log(box)

//         document.querySelector(".part-container").appendChild(box)
//     })

//     const status = info.paymentStatus.toUpperCase()
//     document.querySelector(".status").innerHTML = "<h3>Payment Status:</h3> " + status
// }

// setTimeout(() => {
//     mapInfo(info) 
// }, 9000)
