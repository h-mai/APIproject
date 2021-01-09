var loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function(e){
    e.preventDefault();
    var loginName = document.getElementById("login_name").value;
    var loginPassword = document.getElementById("loginPassword").value;
    console.log(loginName, loginPassword);
    checkLogin(loginName, loginPassword);
});

function checkLogin(user, password){
    var storedUser = localStorage.getItem("user");
    var storedPassword = localStorage.getItem("password");
    if(storedUser === user && storedPassword === password) {
        hideForm();
        displayFavorites();
    } else {
        M.toast({html: 'Login Error'});
};
}
function hideForm(){
    document.getElementById("loginForm").classList.add("hide");
    document.getElementById("loginBtn").classList.add("hide");
    document.getElementById("clearBtn").classList.remove("hide");
};