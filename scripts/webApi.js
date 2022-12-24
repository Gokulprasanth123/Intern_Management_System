async function checkForLogin(credentials) {
  var resFromServer = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  let result = await resFromServer.json();
  if (result === "wrong password") {
    validationContainer.classList.add("show-win-container");
    validationMessage.innerText = result;
    setTimeout(() => {
      validationContainer.classList.remove("show-win-container");
      passwordInLogin.value = "";
    }, 2000);
  } else if (result === "welcome user") {
    validationContainer.classList.add("show-win-container");
    validationMessage.innerText = result;
    setTimeout(() => {
      validationContainer.classList.remove("show-win-container");
      emailInLogin.value = "";
      loginContainer.classList.remove("show");
      internsDashboard.classList.add("show");
    }, 2000);
  } else if (result === "welcome admin") {
    validationContainer.classList.add("show-win-container");
    validationMessage.innerText = result;
    setTimeout(() => {
      validationContainer.classList.remove("show-win-container");
      emailInLogin.value = "";
      passwordInLogin.value = "";
      loginContainer.classList.remove("show");
      adminPage.classList.remove("admin-page");
    }, 2000);
    adminPageFunc();
  } else if (result === "email is incorrect") {
    validationContainer.classList.add("show-win-container");
    validationMessage.innerText = result;
    setTimeout(() => {
      validationContainer.classList.remove("show-win-container");
      emailInLogin.value = "";
    }, 2000);
  }
}

async function writeUserDetails(information) {
  var resFromServer = await fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(information),
  });
  let result = await resFromServer.json();
  if (result === "email already exists") {
    validationContainer.classList.add("show-win-container");
    validationMessage.innerText = result;
    setTimeout(() => {
      validationContainer.classList.remove("show-win-container");
      emailOfEmployee.value = "";
    }, 2000);
  } else if (result === "password and confirm password didn't match") {
    validationContainer.classList.add("show-win-container");
    validationMessage.innerText = result;
    setTimeout(() => {
      validationContainer.classList.remove("show-win-container");
      passwordInSignUp.value = "";
      confirmPasswordInSignup.value = "";
    }, 2000);
  } else {
    validationContainer.classList.add("show-win-container");
    validationMessage.innerText = "Registered Successfully";
    setTimeout(() => {
      validationContainer.classList.remove("show-win-container");
      passwordInSignUp.value = "";
      confirmPasswordInSignup.value = "";
    }, 2000);
    signupContainer.classList.remove("show");
    loginContainer.classList.add("show");
  }
}

async function addTaskToFile(task) {
  var resFromServer = await fetch("http://localhost:8000/addTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  let result = await resFromServer.json();
  if (result === "success") {
    validationContainer.classList.add("show-win-container");
    validationMessage.innerText = "task added successfully";
    setTimeout(() => {
      validationContainer.classList.remove("show-win-container");
      createTaskPopUp.classList.remove("show-win-container");
      internsDashboard.classList.add("show");
      taskName.value = "";
      projectName.value = "";
      description.value = "";
      estimatedTime.value = "";
    }, 2000);
  }
}

async function getTasksFromFile(email) {
  var emailObject = {
    email: email,
  };
  var resFromServer = await fetch("http://localhost:8000/getTasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailObject),
  });
  let result = await resFromServer.json();
  return result;
}

async function updateStatus(status, email, taskId) {
  var completionStatus = {
    status: status,
    email: email,
    taskId: taskId,
  };
  var resFromServer = await fetch("http://localhost:8000/updateStatus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completionStatus),
  });
  let res = await resFromServer.json();
}

async function updateCompletedTime(time, email, taskId) {
  var completionStatus = {
    time: time,
    email: email,
    taskId: taskId,
  };
  var resFromServer = await fetch(
    "http://localhost:8000/updateCompletionTime",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completionStatus),
    }
  );
  let res = await resFromServer.json();
}

async function adminPageFunc(exceeded) {
  let getTasks = await getTasksFromFile("all");
  let i = 0;
  contentContainer.replaceChildren();
  if (Object.values(getTasks)) {
    Object.values(getTasks).forEach((email) => {
      email.tasks.forEach((element) => {
        let estTime = element.estimatedTime / 3600;
        if (String(estTime).split(".")[0] == 0) {
          estTime = estTime.toFixed(4);
        }
        let tasks = `<div class="interns-content-container">
      <div class="intern-name intern-info">${email.name}</div>
      <div class="intern-current-task intern-info">${element.taskName}</div>
      <div class="estimated-time intern-info">${estTime} hr</div>
      <div class="completion-time intern-info">${element.completionTime}hr</div>
    </div>`;
        i++;
        contentContainer.innerHTML += tasks;
      });
    });
  }
}
