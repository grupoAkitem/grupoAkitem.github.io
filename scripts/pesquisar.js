import { createProductItemElement } from "../services/createElements.js";
import { fetchProductGeneralCategorie, fetchCategories } from "../services/getAPIs.js";

const urlParamns = new URLSearchParams(window.location.search);
const inputSearch = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const sectionCardProducts = document.getElementById('cardProducts');
const categoriasNav = document.querySelector('.categorias');
const headerSearch = document.querySelector('.header-search');
const filterName = document.querySelector('.filterName');


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

  window.onload = () => { 
    listProducts();
    selectCategories();
  };