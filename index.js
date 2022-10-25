// variable for recieving delete index
let item

// variable for recieving edited array index
let editValue

//array creation

const string  = localStorage.getItem("TO-DO-ARRAY")

let taskArray = JSON.parse(string) || [] 
divCreation()
completedDivcreation()
findCountOfTask()

//eventlistener for sorting
document.querySelector(".form-select").addEventListener("change",function(){
    if(this.value == 1){

        alphabetSort(taskArray)
        divCreation()
     }
     else{

        dateSort(taskArray)
        divCreation()


     }
})




   

// creating a new div when clicking the add task button

document.querySelector('#add-btn').onclick = function(){
    if(document.querySelector('#task-title').value.length == 0){
        alert("Kindly Enter Task Title!!!!")
    }

    else{
        newTask() 
        divCreation()
       

       
            }
        }


// fuction for adding new task
function newTask(){

    var taskTitle = document.getElementById("task-title").value
    var description = document.getElementById("desc").value
    var date = document.getElementById("theDate").value
    
    
    // object creation
    var todo = {
                  
        title : taskTitle,
        desc : description,
        date : date,
        status :"active"
    
    
    }
    
    
       
  
        taskArray.push(todo)
         //local storage part
        var  jsonarray = JSON.stringify(taskArray)
        localStorage.setItem("TO-DO-ARRAY",jsonarray)

       

        console.log(taskArray)
        findCountOfTask()


}




// function for creating new division        
function divCreation(){

    document.querySelector('#duplicater').innerHTML = ""
    
    for ( i = 0 ; i < taskArray.length ; i ++)
    {
        if(taskArray[i].status == "active"){
    document.querySelector('#duplicater').innerHTML += `
           
    <div class="taskbox mt-2 d-flex justify-content-between" >
    <div class="checkbox-title d-flex align-items-center gap-4">
        <input class="form-check-input rounded-circle check ms-3 mt-0 mt-0" type="checkbox" id=${i}   onclick=checking(this.id)>
        <div class = "mt-3 ">
            <div class="d-flex align-items-center gap-2 ">
            <p class="addedtaskheading bold-head"> ${taskArray[i].title} <p>
            <div class="status"></div>
            </div>
            <p class="date"> By ${taskArray[i].date} <p>
        </div>
        
   </div>


    <div class= "gap-3 d-flex">
        <button class="edit border border-0 bg-white" data-bs-toggle="modal" data-bs-target="#updateModal" onclick=editTask(${i}) ><i class="bi bi-pencil-fill"></i></button>
        <button class="delete me-4 border border-0 bg-white class="bi bi-trash" data-bs-toggle="modal"  data-bs-target="#deletemodal" onclick=deleteIndex(${i})  ><i class="bi bi-trash"></i></button>
    </div>

   </div>
    `
    }
   }

    nullModal()
}
//function for creating completed division
function completedDivcreation(){

    document.querySelector('#completed').innerHTML = ""
    
    for ( i = 0 ; i < taskArray.length ; i ++)
    {
        if(taskArray[i].status == "completed"){
    document.querySelector('#completed').innerHTML += `
           
    <div class="taskbox mt-2 d-flex justify-content-between" >
    <div class="checkbox-title d-flex align-items-center gap-4">
        <input class="form-check-input rounded-circle  ms-3 mt-0 mt-0" type="checkbox" checked id=${i}  onclick=checking(this.id)>
        <div class = "mt-3 ">
        <div class="d-flex align-items-center gap-2 ">
            <p class="addedtaskheading bold-head"> ${taskArray[i].title} <p>
            <div class="status bg-success"></div>
            </div>
            <p class="date "> By ${taskArray[i].date} <p>
        </div>
    </div>


    <div class= "gap-3 d-flex">
        <button class="edit border border-0 bg-white" data-bs-toggle="modal" data-bs-target="#updateModal" onclick=editTask(${i}) ><i class="bi bi-pencil-fill"></i></button>
        <button class="delete me-4 border border-0 bg-white class="bi bi-trash" data-bs-toggle="modal"  data-bs-target="#deletemodal" onclick=deleteIndex(${i})  ><i class="bi bi-trash"></i></button>
    </div>

   </div>
    `
    }
   }

    nullModal()
}

// function for null modal
function nullModal(){

    document.querySelector('#task-title').value = ""
    document.querySelector('#desc').value = ""
    document.querySelector('#theDate').value = ""
  
}

// function for recieving delete index

function deleteIndex(deleteitem){
 
    item = deleteitem

}


// function for deleting item from array

function deleteItem(){
     
    taskArray.splice(item,1)
    divCreation()
    console.log(taskArray)
    findCountOfTask()

    var  jsonarray = JSON.stringify(taskArray)
    localStorage.setItem("TO-DO-ARRAY",jsonarray)

}

// function for editing addedtask
function editTask(item){
   editValue = item
   document.getElementById("update-title").value =  taskArray[item].title
   document.getElementById("update-desc").value = taskArray[item].desc
   document.getElementById("update-Date").value = taskArray[item].date


}

// function for updating added task
function updateTask(){
  
    taskArray[editValue].title = document.getElementById("update-title").value
    taskArray[editValue].desc = document.getElementById("update-desc").value
    taskArray[editValue].date = document.getElementById("update-Date").value
    divCreation()
    var  jsonarray = JSON.stringify(taskArray)
    localStorage.setItem("TO-DO-ARRAY",jsonarray)
}


// function for sorting added task by titles
function alphabetSort(array){
    // console.log("hai")
    return array.sort(function(a , b)
    
    {

    if( a.title.toLowerCase() < b.title.toLowerCase())
    return -1

    if( a.title.toLowerCase() > b.title.toLowerCase())
    return 1

    return 0

    }  
    )   
}


//function for sorting added task by date
function dateSort(array){

    return array.sort(function(a , b)
    
    {

    if( a.date < b.date)
    return -1

    if( a.date > b.date)
    return 1

    return 0

    }  
    )   

}


//function for checking completed or active
function checking(checkindex) {
  console.log("hai")
  var checkround = document.getElementById(checkindex)

  if(checkround.checked == true){
    taskArray[checkindex].status = "completed"
    console.log(taskArray[checkindex].status)
  }
  else{
    taskArray[checkindex].status = "active"
    console.log(taskArray[checkindex].status)
  }
  
  
  divCreation() 
  completedDivcreation()  
  findCountOfTask()

  var  jsonarray = JSON.stringify(taskArray)
    localStorage.setItem("TO-DO-ARRAY",jsonarray)

}

//function for deleting completed task
function deleteCompleted(){
  

     for( j = 0 ; j < taskArray.length ; j++ ){
 
         if(taskArray[j].status == "completed")
         {
            taskArray.splice(j,1)
            j--
         }
         divCreation()
         completedDivcreation()
         findCountOfTask()
    }
    var  jsonarray = JSON.stringify(taskArray)
    localStorage.setItem("TO-DO-ARRAY",jsonarray)
}

//function for all task
function alltask(){
    // document.getElementById("bold"). style. fontWeight = "1000"
    document.getElementById("duplicater").style.display = "block"
    document.getElementById("activeheading").style.display = "block"
    document.getElementById("completeheading").style.display = "block"
    document.getElementById("completed").style.display = "block"
    divCreation()
    
  


}
//function for active task
function activeTask(){

    document.getElementById("duplicater").style.display = "block"
    document.getElementById("activeheading").style.display = "block"
    document.getElementById("completed").style.display = "none"
    document.getElementById("completeheading").style.display = "none"
  


}
//function for completed task
function completeTask(){

    document.getElementById("duplicater").style.display = "none"
    document.getElementById("activeheading").style.display = "none"
    document.getElementById("completeheading").style.display = "block"
    document.getElementById("completed").style.display = "block"
  


}

//function for count of tasks
function findCountOfTask(){


    alltaskCount.innerHTML =""
    activetaskCount.innerHTML =""
    completedtaskCount.innerHTML =""

    for(i = 0 ; i < taskArray.length  ; i++){

        alltaskCount.innerHTML++

        if(taskArray[i].status == "active"){

        activetaskCount.innerHTML++
        }
        
        if(taskArray[i].status == "completed"){

            completedtaskCount.innerHTML++
        }

    }
}
    
// for searching
function search(){
   let searchInput = document.getElementById("exampleFormControlInput1").value
   console.log(searchInput)
   let div = document.querySelectorAll(".taskbox")
   console.log(div)
  

   for(i = 0;i < taskArray.length ; i++ ){
    
      




   }
}







      
        
        

    

























 



