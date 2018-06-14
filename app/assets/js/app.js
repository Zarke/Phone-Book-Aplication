document.getElementById("delete").addEventListener("click", (event)=>{
    event.preventDefault();
    let ID = document.getElementById("userID").value;
    let xhttp = new XMLHttpRequest();
    if (this.readyState ==4 && this.status ==200) {
        console.log("Poslao sam zahtev");
    }
    xhttp.open("DELETE", "http://127.0.0.1:8081/user/"+ ID, true);
    xhttp.send();
});

document.getElementById("insert").addEventListener("click", (event)=>{
    event.preventDefault();
    let firstName = document.getElementById('FirstName').value;
    let lastName = document.getElementById('LastName').value;
    let phoneNum = document.getElementById('PhoneNum').value;
    let newUser = {FirstName:firstName,LastName:lastName,TelephoneNumber:phoneNum};
    newUser = JSON.stringify(newUser);
    console.log(newUser);
    let xhttp = new XMLHttpRequest();
    if (this.readyState ==4 && this.status ==200) {
        
    }
    xhttp.open("POST", "http://127.0.0.1:8081/user/",true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(newUser);
});