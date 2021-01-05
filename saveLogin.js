var saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", function(e){
    e.preventDefault();
    var userName = document.getElementById("user_name").value;
    var userPassword = document.getElementById("password").value;
    localStorage.setItem("user", userName);
    localStorage.setItem("password", userPassword);
    
});