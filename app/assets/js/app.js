// document.getElementById("btnDelete").addEventListener("click", (event)=>{
//     console.log('eve me');
//     // event.preventDefault();
//     // let ID = document.getElementById("userID").value;
//     // let xhttp = new XMLHttpRequest();
//     // if (this.readyState ==4 && this.status ==200) {
//     //     console.log("Poslao sam zahtev");
//     // }
//     // xhttp.open("DELETE", "http://127.0.0.1:8081/user/"+ ID, true);
//     // xhttp.send();
// });

document.getElementById("insert").addEventListener("click", (event)=>{
    event.preventDefault();
    let firstName = document.getElementById('FirstName').value;
    let lastName = document.getElementById('LastName').value;
    let phoneNum = document.getElementById('PhoneNum').value;
    let newUser = {FirstName:firstName,LastName:lastName,TelephoneNumber:phoneNum};
    newUser = JSON.stringify(newUser);
    let xhttp = new XMLHttpRequest();
    if (this.readyState ==4 && this.status ==200) {
        console.log("Poslao sam zahtev");
    }
    xhttp.open("POST", "http://127.0.0.1:8081/user/",true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(newUser);
});
   function getUsers () {
    const url = "http://127.0.0.1:8081/users";
    fetch(url)
    .then(
        response => response.json()
    ).then(function(data){
        $(".entry").view(data)
    });  
}

function searchTable() {
    let input, filter, table, tr, td, i;
    input = document.getElementById("lastNameSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("entriesTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

  function deleteEntry(entryID){
    let entry = entryID.value;
    let url = "http://127.0.0.1:8081/user/" + entry;
    fetch(url,{
        method: 'delete'
    })
  }

getUsers();

