import { createCustomElement, createImageElement } from "../services/createElements.js";

const inputSearch = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const sectionProducts = document.querySelector('.cartProducts')
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

const ceateCartProducts = () => {
  usuario.cart.forEach(( element ) => {
   const divM = document.createElement('div');
   divM.className = 'prod';
   divM.appendChild(createImageElement(element.thumb, 'img'));
   divM.appendChild(createCustomElement('h3', 'desc', element.title));
   divM.appendChild(createCustomElement('h3', 'price', element.price));
   sectionProducts.appendChild(divM);
  });
};

const verifications = () => {
  if (usuario !== null && usuario.active !== false) {
    ceateCartProducts();
    numberCart.innerText = usuario.cart.length;
    loginCadastro.innerText = 'perm_identity';
    loginCadastro.href = '/pages/favoritos.html'
    loginCadastro.appendChild(createCustomElement('span', 'perfil-name', usuario.nome.split(' ')[0]))
  } 
};

window.onload = () => {
  verifications();
};