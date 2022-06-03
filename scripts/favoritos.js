import { createProductItemElement, createCustomElement } from "../services/createElements.js";

const inputSearch = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const loginCadastro = document.getElementById('login-cadastro');
const numberCart = document.querySelector('.number-card');
const sectionCardProducts = document.getElementById('cardProducts');
const usuario = JSON.parse(localStorage.getItem('login'));

const spanNome = document.getElementById('name-span');
const name = document.getElementById('nome');
const emaill = document.getElementById('email');
const tel = document.getElementById('tel');
const gen = document.getElementById('gen');
const cepp = document.getElementById('cep');

const incorrect = document.getElementById("incorrect");
const verification =document.getElementById("verification")

const btnSenha = document.getElementById('btn-trocar-senha');
const modalTrocSenha = document.getElementById('modal-trocar-senha');
const inputsTrocSenha = document.querySelectorAll('.trocSenhaIn');
const btnSenhaConfirm = document.getElementById('btn-trocar-senhaa');
const sairModal = document.getElementById('sair-trocarSenha');
const sair = document.getElementById('btn-deslogar');

btnSenha.addEventListener('click', () => {
    modalTrocSenha.style.display = 'flex';
})

sairModal.addEventListener('click', () => {
    modalTrocSenha.style.display = 'none';
})

btnSenhaConfirm.addEventListener('click', () => {
    const verificaIgual = inputsTrocSenha[1].value !== inputsTrocSenha[2].value;
    const verificaSenhaAntiga = inputsTrocSenha[0].value !== usuario.senha;
    const verificaVazia = inputsTrocSenha[1].value === '';
    const verificaMinCarac = inputsTrocSenha[1].value.length < 6;
    if (verificaSenhaAntiga){
        incorrect.innerText = 'Senha Atual Incorreta'
        verification.style.display = 'flex';
    } else if (verificaIgual) {
        incorrect.innerText = 'As senhas novas não são equivalentes'
        verification.style.display = 'flex';
    } else if (verificaVazia) {
        incorrect.innerText = 'Preencha Todos os campos'
        verification.style.display = 'flex';
    } else if (verificaMinCarac) {
        incorrect.innerText = 'Sua nova senha precisa ter mais de 6 caracteres'
        verification.style.display = 'flex';
    } else if (inputsTrocSenha[1].value === inputsTrocSenha[2].value && inputsTrocSenha[0].value === usuario.senha && inputsTrocSenha[2].value !== '') {
        usuario.active = false;
        usuario.senha = inputsTrocSenha[1].value;
        localStorage.setItem('login', JSON.stringify(usuario));
        window.location.href = '/pages/login.html';
    } else {
        incorrect.innerText = 'Usuário não encontrado! Crie um cadastro grátis'
        verification.style.display = 'flex';
    }
})

sair.addEventListener('click', () => {
    usuario.active = false;
    localStorage.setItem('login', JSON.stringify(usuario));
    window.location.href = '/index.html';
})

const redirectPesquisar = () => {
    window.location.href = `/pages/pesquisar.html?categoria=&product=${inputSearch.value}`
    inputSearch.value = '';
  }
    searchBtn.addEventListener('click', () => {
      if (inputSearch.value !== '') {
        redirectPesquisar();
      }
      });
    document.addEventListener('keypress', ({ key }) => {
      if (key === 'Enter' && inputSearch.value !== '') {
        redirectPesquisar();
      }
    })

const createFavItens = () => {
    const { cel, nome, email, genero, cep } = usuario;
    const formCel = `(${cel[0]}${cel[1]}) ${cel[2]}${cel[3]}${cel[4]}${cel[5]}${cel[6]} - ${cel[7]}${cel[8]}${cel[9]}${cel[10]}`
    spanNome.innerText = nome;
    name.innerText = nome;
    emaill.innerText = email;
    tel.innerText = formCel;
    gen.innerText = genero;
    cepp.innerText = (cep === '') ? 'Falta inserir o cep' : cep;

    usuario.favoritos.forEach((e) => {
        sectionCardProducts.appendChild(createProductItemElement(e));
    });
};


const verifications = () => {
    if (usuario !== null && usuario.active !== false) {
        createFavItens();
        numberCart.innerText = usuario.cart.length;
        loginCadastro.innerText = 'perm_identity';
        loginCadastro.href = '/pages/favoritos.html'
        loginCadastro.appendChild(createCustomElement('span', 'perfil-name', usuario.nome.split(' ')[0]))

        //         Para disp. mobile     //
        document.querySelector(".nav-item #login").setAttribute("id", "login-cadastro");
        document.querySelector(".nav-item #login-cadastro").innerText = 'perm_identity';
        document.querySelector(".nav-item #login-cadastro").classList.add("material-icons")
        document.querySelector(".nav-item #login-cadastro").href = '/pages/favoritos.html'
        document.querySelector(".nav-item #login-cadastro").appendChild(createCustomElement('span', 'perfil-name', usuario.nome.split(' ')[0]));
        document.getElementById("cart-number").innerText = `(${usuario.cart.length})`;
    } 
    };

window.onload = () => { 
    verifications();
};