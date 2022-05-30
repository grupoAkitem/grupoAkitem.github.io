document.querySelector("a#close_link").addEventListener('click', changestyle);
document.querySelector("div#close_button").addEventListener('click', changestyle);
document.querySelector("a#forget_password").addEventListener("click", changestyle);
const usuario = JSON.parse(localStorage.getItem('login'));
const emailEntrar = document.getElementById('email');
const btnEntrar = document.getElementById('btn-entrar');
const senha = document.getElementById('password');
const incorrect = document.getElementById("incorrect");
const verification =document.getElementById("verification")

function changestyle(){
    let change_password = document.querySelector("div.change_password");
    console.log(change_password);
    
    if (change_password.style.display === "flex"){
        change_password.style.display = "none";
        
    } else {
        change_password.style.display = "flex";
        
    }   
}

btnEntrar.addEventListener('click', (event) => {
    event.preventDefault();
    if (usuario === null) {
        incorrect.innerText = 'Usuário não encontrado! Crie um cadastro grátis'
        verification.style.display = 'flex';
    } else if (emailEntrar.value !== usuario.email) {
        incorrect.innerText = 'Email incorreto'
        verification.style.display = 'flex';
        emailEntrar.style.border = '2px solid red';
    } else if (senha.value !== usuario.senha) {
        incorrect.innerText = 'Senha incorreta';
        verification.style.display = 'flex';
        senha.style.border = '2px solid red';
    } else if (senha.value === usuario.senha && emailEntrar.value === usuario.email) {
        usuario.active = true;
        localStorage.setItem('login', JSON.stringify(usuario));
        window.location.href = '/index.html';
    } else {
        incorrect.innerText = 'Usuário ou senha incorretos';
        verification.style.display = 'flex';
        senha.style.border = '2px solid red';
        emailEntrar.style.border = '2px solid red';
    }
})

window.onload = () => { 
    if (usuario !== null) {
        emailEntrar.value = usuario.email;
    }
  };