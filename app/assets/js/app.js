   //variables used in pagination and sort funcitons
 let table 
 let rowCount 
 let pageCount
 let n = 5


function insertUser(e){
  e.preventDefault();
  let firstName = document.getElementById('FirstName').value;
  let lastName = document.getElementById('LastName').value;
  let phoneNum = document.getElementById('PhoneNum').value;
  let newUser = {FirstName:firstName,LastName:lastName,TelephoneNumber:phoneNum};
  firstName = document.getElementById('FirstName').value = "";
  lastName = document.getElementById('LastName').value = "";
  phoneNum = document.getElementById('PhoneNum').value = "";
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
      var table = document.getElementById('tableList')
      table.innerHTML = ""
      renderUsersTable(data)
      table = document.getElementById('tableList')
      rowCount = table.rows.length;
      pageCount = Math.ceil(rowCount/5);
      let tr =[]
      pagination()
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
      table = document.getElementById('tableList')
      rowCount = table.rows.length;
      pageCount = Math.ceil(rowCount/5);
      let tr =[]
      pagination()
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
      td = tr[i].getElementsByTagName("td")[1];
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
      var table = document.getElementById('tableList')
      table.innerHTML = ""
      renderUsersTable(data)
      table = document.getElementById('tableList')
      rowCount = table.rows.length;
      pageCount = Math.ceil(rowCount/5);
      let tr =[]
      pagination()
      }
    )
    
  }

getUsers();




 //function in charge of entries table paginatioln
 function pagination(){
   if (pageCount > 1){
   tr =[]
   let i
   for (i = 0; i < (rowCount); i++){
     tr[i] = table.rows[i].outerHTML
   }
   var btnDiv = document.getElementById('buttons')
    if (btnDiv) {
      btnDiv.parentNode.removeChild(btnDiv)
    }
   document.getElementById('entriesTable').insertAdjacentHTML("afterend","<div id='buttons' class='pagination justify-content-center'></div>");
   
   sort(1)
   }
   
 }
 function sort(p){
   let rows = ''
   let s = ((n * p)-n)
   for (i = s; i < (s+n) && i < tr.length; i++){
     rows += tr[i]
     
   }
   table.innerHTML = rows
   document.getElementById("buttons").innerHTML = pageButtons(pageCount,p);
 }

 function pageButtons(pCount,cur) {
   let	prevDis = (cur == 1)?"disabled":""
   let nextDis = (cur == pCount)?"disabled":""
   let buttons = "<input type='button'class='btn btn-outline-dark' value='&lt;&lt; ' onclick='sort("+(cur - 1)+")' "+prevDis+">"
   for (i=1; i<=pCount;i++){
     buttons += "<input type='button' class='btn btn-outline-dark' id='id"+i+"'value='"+i+"' onclick='sort("+i+")'>"
     
   }
   buttons += "<input type='button' class='btn btn-outline-dark' value=' &gt;&gt;' onclick='sort("+(cur + 1)+")' "+nextDis+">"
   return buttons;
 }

//if there are users in the database displays the entries table or no users notification 
function renderUsersTable(data){
  if(!Array.isArray(data) || !data.length){
    document.getElementById('users').style.display = "none"
    document.getElementById('search').style.display = "none"
    document.getElementById('users').insertAdjacentHTML('afterend','<span id="notification">There are currently no registered entries</span>')
  } else{
    document.getElementById('search').style.display = ""
    document.getElementById('users').style.display = ""
    var notification = document.getElementById('notification')
    if (notification) {
      notification.parentNode.removeChild(notification)
    }
    var temp = document.getElementsByTagName("template")[0]
    var clon = temp.content.cloneNode(true)
    document.getElementById('tableList').appendChild(clon)
    $('.entry').view(data)
  }
}