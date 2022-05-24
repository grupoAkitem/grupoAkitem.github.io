document.querySelector("a#close_link").addEventListener('click', changestyle);
document.querySelector("div#close_button").addEventListener('click', changestyle);
document.querySelector("a#forget_password").addEventListener("click", changestyle);

function changestyle(){
    let change_password = document.querySelector("div.change_password");
    console.log(change_password);
    
    if (change_password.style.display === "flex"){
        change_password.style.display = "none";
        
    } else {
        change_password.style.display = "flex";
        
    }   
}