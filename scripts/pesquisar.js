import { createProductItemElement, createCustomElement } from "../services/createElements.js";
import { fetchProductGeneralCategorie, fetchCategories } from "../services/getAPIs.js";

const urlParamns = new URLSearchParams(window.location.search);
const inputSearch = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const sectionCardProducts = document.getElementById('cardProducts');
const categoriasNav = document.querySelector('.categorias');
const headerSearch = document.querySelector('.headerSearch');
const filterName = document.querySelector('.filterName');
const removeFilter = document.querySelector('.remove-filter');
const loginCadastro = document.getElementById('login-cadastro');
const numberCart = document.querySelector('.number-card');
const usuario = JSON.parse(localStorage.getItem('login'));


const loader = (bol) => {
  if (bol) {
    const lo = document.createElement('span')
    lo.className = 'loading'
    headerSearch.appendChild(lo);
  } else {
    const notLo = document.querySelector('.loading');
    notLo.parentNode.removeChild(notLo);
  }

};

const listProducts = async () => {
  loader(true);
    const { results } = await fetchProductGeneralCategorie(urlParamns.get('product'), urlParamns.get('categoria'));
    loader(false);
    if (results.length > 0) {
      const itensCards = document.querySelectorAll('.item');
      itensCards.forEach((e) => e.parentNode.removeChild(e));
      createCardsProducts(results);
    }
  };

  const selectCategories = async () => {
    const categories = await fetchCategories();
    if (urlParamns.get('categoria') !== '') {
      const findNameCategorie = categories.find((ev) => ev.id === urlParamns.get('categoria'));
      filterName.innerText = findNameCategorie.name;
      removeFilter.style.display = 'flex';
    }
    categories.pop();
    categories.forEach((element) => {
        const categories = document.createElement('a');
        categories.href = `/pages/pesquisar.html?categoria=${element.id}&product=${inputSearch.value}`
        categories.innerHTML = element.name;
        categoriasNav.appendChild(categories);
    });
    };

  const redirectPesquisar = () => {
    window.location.href = `/pages/pesquisar.html?categoria=${urlParamns.get('categoria')}&product=${inputSearch.value}`
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

  export const createCardsProducts = async (res) => {
    if (!res) {
      const { results } = await fetchProductGeneral();
      results.forEach((element) => {
        sectionCardProducts.appendChild(createProductItemElement(element));
      });
    } else {
      res.forEach((element) => {
        sectionCardProducts.appendChild(createProductItemElement(element));
      });
    }
  };

  removeFilter.addEventListener('click', () => {
    window.location.href = `/pages/pesquisar.html?categoria=&product=${urlParamns.get('product')}`
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
    listProducts();
    selectCategories();
    verifications();
  };