var loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function(e){
    e.preventDefault();
    var loginName = document.getElementById("login_name").value;
    var loginPassword = document.getElementById("loginPassword").value;
    console.log(loginName, loginPassword);
    checkLogin(loginName, loginPassword);
    hideForm();
    document.getElementById("clearBtn").classList.replace("row hide");
})

function checkLogin(user, password){
    var storedUser = localStorage.getItem("user");
    var storedPassword = localStorage.getItem("password");
    if(storedUser === user && storedPassword === password) {
    } else(alert("Login Error"));
    
}

function hideForm(){
    document.getElementById("loginForm").classList.add("hide");
}