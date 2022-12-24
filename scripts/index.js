var emailInLogin = document.getElementById("email");
var passwordInLogin = document.getElementById("password");
var loginButton = document.getElementById("login-button");
var signupButton = document.getElementById("signup-button");
var nameOfEmployee = document.getElementById("nameOfEmployee");
var emailOfEmployee = document.getElementById("emailOfEmployee");
var employeeId = document.getElementById("employeeId");
var techStackChosen = document.getElementById("techStackChosen");
var phoneNumber = document.getElementById("phoneNumber");
var passwordInSignUp = document.getElementById("passwordForSignup");
var confirmPasswordInSignup = document.getElementById("confirmPassword");
var loginContainer = document.getElementById("container-for-login");
var signupContainer = document.getElementById("container-for-signup");
var internsDashboard = document.getElementById("interns-dashboard");
var createTaskPopUp = document.getElementById("create-task-pop-up");
var taskName = document.getElementById("task-name");
var adminPage = document.getElementById("admin-page");
var projectName = document.getElementById("project-name");
var description = document.getElementById("description");
var estimatedTime = document.getElementById("estimated-time");
var listofTasks = document.getElementById("list-of-tasks");
var moveButtons = document.getElementsByClassName("move");
var profileDiv = document.getElementById("profile-div");
var employeeName = document.getElementById("name-value");
var employeeEmail = document.getElementById("email-value");
var employeeIDValue = document.getElementById("employeeID-value");
var techstackValue = document.getElementById("techStack-value");
var phoneNumberValue = document.getElementById("phone-value");
var projectCurrentlyWorking = document.getElementById("project-value");
var recordTimeContainer = document.getElementById("record-time-container");
var inProgressOrCompleted = document.getElementById(
  "choose-inprogress-or-completed"
);
var inprogressOrCompletedRadioButtons = document.getElementsByName("move");
var validationContainer = document.getElementById(
  "validation-message-container"
);
var toDoListContainer = document.getElementById("todo-list-container");

var inProgressListContainer = document.getElementById(
  "inprogress-list-container"
);
var completedListContainer = document.getElementById(
  "completed-list-container"
);
var validationMessage = document.getElementById("validation-message");
var inprogressContainer = document.getElementById("inprogress-list-container");
var contentContainer = document.getElementById("content-of-intern-container");
var monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  currentDiv,
  fromWhichPage,
  iterator,
  emailValue;
var tasksDiv = document.getElementById("tasks-div");
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var pauseButton = document.getElementById("pause"),
  fullTime,
  messageAlert = "";

loginContainer.classList.add("show");
function loginButtonHandle() {
  var credentials = {
    email: emailInLogin.value.trim(),
    password: passwordInLogin.value.trim(),
  };
  emailValue = emailInLogin.value;
  checkForLogin(credentials);
}

function signupInfo() {
  loginContainer.classList.remove("show");
  signupContainer.classList.add("show");
}
function signUpButtonHandle() {
  var information = {
    name: nameOfEmployee.value.trim(),
    email: emailOfEmployee.value.trim(),
    employeeId: employeeId.value.trim(),
    techStackChosen: techStackChosen.value.trim(),
    phoneNumber: phoneNumber.value.trim(),
    password: passwordInSignUp.value.trim(),
    confirmPassword: confirmPasswordInSignup.value.trim(),
  };
  writeUserDetails(information);
}

function createTasks() {
  internsDashboard.classList.remove("show");
  createTaskPopUp.classList.add("show-win-container");
}

function makeVisible(i) {
  iterator = i;
  inProgressOrCompleted.classList.add("show-win-container");
  currentDiv = document.getElementById(`task-email-${i}`);
}

async function listOfTasks() {
  let getTasks = await getTasksFromFile(emailValue.trim());
  toDoListContainer.replaceChildren();
  inProgressListContainer.replaceChildren();
  completedListContainer.replaceChildren();
  if (getTasks[emailValue.trim()].tasks) {
    let j = 0;
    getTasks[emailValue.trim()].tasks.forEach((element) => {
      let estTimes = element.estimatedTime / 3600;
      if (String(estTimes).split(".")[0] == 0) {
        estTimes = estTimes.toFixed(4);
      }

      if (element.status === "todo") {
        let tasks = `<div class="task-email" id="task-email-${element.taskName}">
    <div class="task-name-and-created-on">
      <p class="task-name">Task Name - ${element.taskName}</p>
      <button class="move" onclick="makeVisible('${element.taskName}')">move</button>
    </div>
    <p class="project-name">Project Name - ${element.projectName}</p>
    <p class="estimated-time">Estimated Time - ${estTimes} hr</p>
    <p class="time">Task created on - ${element.date}</p>
    </div>`;
        toDoListContainer.innerHTML += tasks;
      } else if (element.status === "inprogress") {
        let tasks = `<div class="task-email" id="task-email-${element.taskName}" >
    <div class="task-name-and-created-on">
      <p class="task-name">Task Name - ${element.taskName}</p>
      <button class="move" onclick="makeVisible('${element.taskName}')">move</button>
    </div>
    <p class="project-name">Project Name - ${element.projectName}</p>
    <p class="estimated-time">Estimated Time - ${estTimes} hr</p>
    <p class="time">Task created on - ${element.date}</p>
    </div>`;
        inProgressListContainer.innerHTML += tasks;
      } else if (element.status === "completed") {
        let tasks = `<div class="task-email" id="task-email-${element.taskName}">
    <div class="task-name-and-created-on">
      <p class="task-name">Task Name - ${element.taskName}</p>
      <button class="move" onclick="makeVisible('${element.taskName}')">move</button>
    </div>
    <p class="project-name">Project Name - ${element.projectName}</p>
    <p class="estimated-time">Estimated Time - ${estTimes} hr</p>
    <p class="time">Task created on - ${element.date}</p>
    </div>`;
        completedListContainer.innerHTML += tasks;
      }
      j++;
    });
    internsDashboard.classList.remove("show");
    listofTasks.classList.add("visible-container");
  } else {
    validationContainer.classList.add("show-win-container");
    validationMessage.innerText = "Nothing to show";
    setTimeout(() => {
      validationContainer.classList.remove("show-win-container");
    }, 2000);
  }
}

document
  .getElementById("add-task-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    var date = new Date();
    var task = {
      taskName: taskName.value.trim(),
      projectName: projectName.value.trim(),
      description: description.value.trim(),
      estimatedTime: Number(estimatedTime.value.trim()) * 60 * 60,
      email: emailValue.trim(),
      date:
        date.getDate() +
        "-" +
        monthNames[date.getMonth()] +
        "-" +
        date.getFullYear(),
      time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
      status: "todo",
      completionTime: "",
    };
    addTaskToFile(task);
  });

async function moveToInprogressOrCompleted() {
  inProgressOrCompleted.classList.remove("show-win-container");
  for (i = 0; i < inprogressOrCompletedRadioButtons.length; i++) {
    if (inprogressOrCompletedRadioButtons[i].checked) {
      if (inprogressOrCompletedRadioButtons[i].value === "inprogress") {
        let getTasks = await getTasksFromFile(emailValue.trim());
        let j = 0;
        if (getTasks[emailValue.trim()].tasks) {
          getTasks[emailValue.trim()].tasks.forEach((element) => {
            if (element.taskName === currentDiv.id.split("-")[2]) {
              updateStatus("inprogress", emailValue.trim(), j);
            }
            j++;
          });
        }
        setTimeout(() => {
          listOfTasks();
        }, 1000);
        inprogressOrCompletedRadioButtons[i].checked = false;
      } else if (inprogressOrCompletedRadioButtons[i].value === "completed") {
        let getTasks = await getTasksFromFile(emailValue.trim());
        let j1 = 0;
        if (getTasks[emailValue.trim()].tasks) {
          getTasks[emailValue.trim()].tasks.forEach((element) => {
            if (element.taskName === currentDiv.id.split("-")[2]) {
              updateStatus("completed", emailValue.trim(), j1);
            }
            j1++;
          });
        }
        setTimeout(() => {
          listOfTasks();
        }, 1000);
        inprogressOrCompletedRadioButtons[i].checked = false;
      }
    }
  }
}

async function takeToProfilePage(from) {
  profileDiv.classList.remove("profile-div");
  let result = await getTasksFromFile(emailValue.trim());
  employeeName.innerText = result[emailValue.trim()].name;
  employeeEmail.innerText = result[emailValue.trim()].email;
  employeeIDValue.innerText = result[emailValue.trim()].employeeId;
  techstackValue.innerText = result[emailValue.trim()].techStackChosen;
  phoneNumberValue.innerText = result[emailValue.trim()].phoneNumber;
  projectCurrentlyWorking.innerText =
    result[emailValue.trim()].tasks[0].projectName;
  if (from === "recordtimePage") {
    fromWhichPage = from;
    recordTimeContainer.classList.add("record-time-container");
  } else {
    fromWhichPage = from;
    listofTasks.classList.remove("visible-container");
  }
}

function backToPreviousPage() {
  if (fromWhichPage === "recordtimePage") {
    recordTimeContainer.classList.add("record-time-container");
  } else {
    listofTasks.classList.add("visible-container");
  }
  profileDiv.classList.add("profile-div");
}

function logoutFromApp(id) {
  if (id === "list-of-tasks") {
    listofTasks.classList.remove("visible-container");
  } else if (id === "profile-div") {
    profileDiv.classList.remove("profile-div");
  } else if (id === "admin-page") {
    adminPage.classList.add("admin-page");
  }
  loginContainer.classList.add("show");
}

async function checkForEstimatedTime(seconds, index) {
  let result = await getTasksFromFile(emailValue.trim());
  let k = "";
  if (seconds > Number(result[emailValue.trim()].tasks[index].estimatedTime)) {
    k = result[emailValue.trim()].tasks[index].taskName;
    return k;
  } else {
    return k;
  }
}

let intervalBackup = [];
async function recordTime() {
  let getTasks = await getTasksFromFile(emailValue.trim());
  tasksDiv.replaceChildren();
  let i = 0;
  if (getTasks[emailValue.trim()].tasks) {
    getTasks[emailValue.trim()].tasks.forEach((element) => {
      if (element.status !== "completed") {
        let tasks = `<div class="first-task" id="div-${element.taskName}">
          <div class="task-name-div">
            <div class="task-name-and-value">${element.taskName}</div>
            <div class="timer" id="timer-${i}">00:00:00</div>
          </div>
          <div class="btns">
            <button class="start timer-button" id="start" onclick="start(event)">
              <img
                src="./assets/play-buttton.png"
                alt=""
                class="start-image timer-button-image"
              />
            </button>
            <button class="stop timer-button" id="stop" onclick="stop(event)">
              <img
                src="./assets/stop-button.png"
                alt=""
                class="stop-image timer-button-image"
              />
            </button>
          </div>
        </div>`;
        tasksDiv.innerHTML += tasks;
        i++;
      }
    });
  }
  if (i == 0) {
    validationContainer.classList.add("show-win-container");
    validationMessage.innerText = "No Tasks created";
    setTimeout(() => {
      validationContainer.classList.remove("show-win-container");
    }, 2000);
  } else {
    recordTimeContainer.classList.remove("record-time-container");
    internsDashboard.classList.remove("show");
  }
}

function start(event) {
  let seconds = 0,
    exceeded = "",
    c = "1";
  let timerDiv =
    event.target.closest(".first-task").firstElementChild.lastElementChild;
  let currentButton =
    event.target.closest(".first-task").lastElementChild.firstElementChild;
  console.log("inside button " + currentButton);
  currentButton.disabled = true;
  let interval = setInterval(async () => {
    seconds++;
    if (exceeded == "") {
      exceeded = await checkForEstimatedTime(
        seconds,
        Number(timerDiv.id.split("-")[1])
      );
    } else {
      exceeded = seconds;
      if (c != "") {
        c = "";
        alert("you are lagging behind in your work");
      }
    }
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - hrs * 3600) / 60);
    let secs = seconds % 60;
    if (secs < 10) secs = "0" + secs;
    if (mins < 10) mins = "0" + mins;
    if (hrs < 10) hrs = "0" + hrs;
    timerDiv.innerText = `${hrs}:${mins}:${secs}`;
  }, 1000);
  intervalBackup.push({ interval: interval, division: timerDiv });
}

function stop(event) {
  let currentInterval;
  let calledDiv =
    event.target.closest(".first-task").firstElementChild.lastElementChild;
  let [hr, min, sec] = calledDiv.innerText.split(":");
  let seconds = hr * 60 * 60 + min * 60 + sec;
  seconds = seconds / 3600;
  if (String(seconds).split(".")[0] == 0) {
    seconds = seconds.toFixed(4);
  }
  event.target.closest(
    ".first-task"
  ).lastElementChild.firstElementChild.disabled = false;
  intervalBackup.forEach(async (element) => {
    if (element.division === calledDiv) {
      currentInterval = element.interval;
      let getTasks = await getTasksFromFile(emailValue.trim());
      let i = 0;
      if (getTasks[emailValue.trim()].tasks) {
        getTasks[emailValue.trim()].tasks.forEach(async (element) => {
          if (
            element.taskName ===
            event.target.closest(".first-task").id.split("-")[1]
          ) {
            let j = i;
            await updateCompletedTime(seconds, emailValue.trim(), j);
            await updateStatus("completed", emailValue.trim(), j);
          } else {
            i++;
          }
        });
      }
      clearInterval(element.interval);
      alert("task completed");
      tasksDiv.removeChild(event.target.closest(".first-task"));
    }
  });
  intervalBackup = intervalBackup.filter(
    (number) => number.interval !== currentInterval
  );

  calledDiv.innerText = `00:00:00`;
}

function backToDashboardFromTask() {
  internsDashboard.classList.add("show");
  createTaskPopUp.classList.remove("show-win-container");
}

function backToHomeFromList() {
  internsDashboard.classList.add("show");
  listofTasks.classList.remove("visible-container");
}

function backToHomeFromRecordPage() {
  internsDashboard.classList.add("show");
  recordTimeContainer.classList.add("record-time-container");
}
