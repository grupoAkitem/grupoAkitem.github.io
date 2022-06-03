import { createCustomElement } from "../services/createElements.js";

const inputSearch = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const loginCadastro = document.getElementById('login-cadastro');
const numberCart = document.querySelector('.number-card');
const usuario = JSON.parse(localStorage.getItem('login'));

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

const verifications = () => {
    if (usuario !== null && usuario.active !== false) {
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