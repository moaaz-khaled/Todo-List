//                                 ☻ To Allow The User to Control confirmation Alerts ☻                        //

let ShowAlerts = document.getElementById("Confirmations");
ShowAlerts.onclick = function() {
    if(ShowAlerts.checked)
        ShowAlerts.removeAttribute("checked");
    else
        ShowAlerts.checked;
}



let AddNoTaskDiv = function() {
    let divofFreeTasks = document.createElement("div");
    divofFreeTasks.className = "NoTasks";

    let Image = document.createElement("img");
    Image.src = "../imgs/to-do-list-icon-with-check-mark-notepad-checklist-vector-45067207.png";
    Image.style.width = "200px";
    Image.style.height = "200px";

    divofFreeTasks.appendChild(Image);

    let h2 = document.createElement("h2");
    h2.innerHTML = "No Tasks Yet";
    h2.style.color = "gray";

    divofFreeTasks.appendChild(h2);

    let h3 = document.createElement("h3");
    h3.innerHTML = "Add your First Task above to get started!";
    h3.style.color = "gray";

    divofFreeTasks.appendChild(h3);

    document.querySelector(".TaskManger").appendChild(divofFreeTasks);

}


let AddFoundTaskDiv = function() {
    let container = document.createElement("div");
    container.className = "TasksContianer";

    let p = document.createElement("p");
    p.className = "pendingTasks";
    p.innerHTML = `pending()`;
    container.appendChild(p);

    let DivofTasks = document.createElement("div");
    DivofTasks.className = "containerOfTasks";
    container.appendChild(DivofTasks);

    document.querySelector(".TaskManger").appendChild(container);
}


let AddTask = function(Task) {

    let Div = document.createElement("div");
    Div.setAttribute("id" , "Task-" + Task.id);
    Div.className = "Task";

    let p = document.createElement("p");
    p.innerHTML = Task.Name;

    let Deletebtn = document.createElement("button");
    Deletebtn.className = "Delbtn";


    Div.appendChild(p);
    Div.appendChild(Deletebtn);

    document.querySelector(".containerOfTasks").appendChild(Div);
}


let DeleteTask = function(TaskId) {
    let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    Tasks = Tasks.filter(task => task.id != TaskId);

    localStorage.setItem("Tasks" , JSON.stringify(Tasks));

    let TaskDiv = document.getElementById("Task-" + TaskId);
    TaskDiv.remove();

    document.querySelector(".pendingTasks").innerHTML = `Pending(${Tasks.length})`;
    document.querySelector(".CompletedTask").innerHTML = `0 of ${Tasks.length} Tasks Completed`;

    if(Tasks.length === 0){
        document.querySelector(".TasksContianer").remove();
        document.querySelector(".CompletedTask").innerHTML = "";
        AddNoTaskDiv();
    }
}

let AddTaskBtn = document.getElementById("addbtn");

AddTaskBtn.addEventListener("click", ()=> {
    let MyDiv = document.querySelector(".NoTasks");
    if(MyDiv) {
        MyDiv.remove();
        AddFoundTaskDiv();
    }
    let TaskID = localStorage.getItem("TaskId") || 20220492;
    let TaskName = document.getElementById("addTask").value;
    document.getElementById("addTask").value = "";
    let AllTask = JSON.parse(window.localStorage.getItem("Tasks")) || [];
    let Task = {
        id:TaskID++,
        Name:TaskName,
        status:"pending"
    }

    AllTask.push(Task);
    window.localStorage.setItem("Tasks" , JSON.stringify(AllTask));
    window.localStorage.setItem("TaskId" , TaskID);

    document.querySelector(".CompletedTask").innerHTML = `0 of ${AllTask.length} Tasks Completed`;
    AddTask(Task);

    document.querySelector(".pendingTasks").innerHTML = `Pending(${AllTask.length})`;
});


window.onload = function() {
    let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    if(Tasks.length === 0)
        AddNoTaskDiv();
    else {
        AddFoundTaskDiv();
        document.querySelector(".pendingTasks").innerHTML = `Pending(${Tasks.length})`;
        Tasks.forEach(Task => {
            AddTask(Task)
        });
        document.querySelector(".CompletedTask").innerHTML = `0 of ${Tasks.length} Tasks Completed`;
    }
}

document.querySelector(".TaskManger").addEventListener("click" , function(event) { 
    if(event.target.classList.contains("Delbtn")) {
        let Task = event.target.closest(".Task");
        let TaskID = (Task.id).slice(5);
        if(ShowAlerts.checked) {
            Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your Task has been deleted.",
                    icon: "success"
                    });
                    DeleteTask(TaskID);
                }
            });
        }
        else
            DeleteTask(TaskID);
    }
});