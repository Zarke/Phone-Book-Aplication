function insertUser(e){
  e.preventDefault();
  let firstName = document.getElementById('FirstName').value;
  let lastName = document.getElementById('LastName').value;
  let phoneNum = document.getElementById('PhoneNum').value;
  let newUser = {FirstName:firstName,LastName:lastName,TelephoneNumber:phoneNum};
  newUser = JSON.stringify(newUser);
  const url = "http://127.0.0.1:8081/user";
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: newUser
    }).then(
      responce => responce.json()
    ).then(function(data){
      renderUsersTable(data)
    }
    )

}

   function getUsers () {
    const url = "http://127.0.0.1:8081/users";
    fetch(url)
    .then(
        response => response.json()
    ).then(function(data){
      renderUsersTable(data)
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
    const url = "http://127.0.0.1:8081/user/" + entry;
    fetch(url,{
        method: 'delete'
    }).then(
      response => response.json()
    ).then(function(data){
      renderUsersTable(data);
      }
    )
    
  }

getUsers();

function renderUsersTable(data){
  if(!Array.isArray(data) || !data.length){
    $(".entry").view(data) 
  } else{
    $(".entry").view(data) 
  }
}