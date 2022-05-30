const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const number = document.getElementById("number");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirmpassword");
const genderGroup = document.querySelector(".gender-group");
const confirmBtn = document.getElementById("confirm-btn");
const incorrect = document.getElementById("incorrect");
const verification =document.getElementById("verification");
const verificaInputs = [firstname, lastname, email, number, password, confirmpassword];


const cadastro = {
    nome: '',
    email: '',
    cel: '',
    senha: '',
    genero: '',
    cep: '',
    active: false,
    favoritos: [],
    cart: [],
};

confirmBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const veriIn = verificaInputs.every((e) => e.value !== '');
    const pass = (password.value == confirmpassword.value);
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if (!pass) {
        incorrect.innerText = 'As senhas não são equivalentes'
        verification.style.display = 'flex';
        password.style.border = '2px solid red';
        confirmpassword.style.border = '2px solid red';
    } else if (!regex.test(email.value)) {
        incorrect.innerText = 'Email incorreto'
        verification.style.display = 'flex';
        email.style.border = '2px solid red';
    } else if (veriIn && cadastro.genero !== '' && pass) {
        cadastro.nome = `${firstname.value} ${lastname.value}`;
        cadastro.email = email.value;
        cadastro.cel = number.value;
        cadastro.senha = password.value;
        localStorage.setItem('login', JSON.stringify(cadastro));
        window.location.href = '/pages/login.html'
    } else {
        incorrect.innerText = 'Preencha todos os campos corretamente'
        verification.style.display = 'flex';
    }

})

genderGroup.addEventListener('click', ({ target }) => {
    if (target.id !== '') {
        switch (target.id) {
            case 'female':
                cadastro.genero = 'Feminino'
                break;
            case 'male':
                cadastro.genero = 'Masculino'
                break;
            case 'others':
                cadastro.genero = 'Outros'
                break;
        
            default:
                cadastro.genero = 'Prefiro não dizer'
                break;
        };
    }
});






































