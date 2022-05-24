import { createProductItemElement } from "./services/createElements.js";
import { fetchCategories, fetchProductGeneral } from "./services/getAPIs.js";

const allCategories = document.getElementById('all-categories');
const inputSearch = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const selectdCategories = document.getElementById('all-categories');
const sectionCardProducts = document.getElementById('cardProducts');

  // function para criar o select das categorias
  const selectCategories = async () => {
    const categories = await fetchCategories();
    categories.pop();
    categories.forEach((element) => {
        const optionsCategories = document.createElement('option');
        optionsCategories.value = element.id;
        optionsCategories.innerHTML = element.name;
        allCategories.appendChild(optionsCategories);
    });
    };

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

  selectdCategories.addEventListener('click', ({target}) => {
    if (target.value !== 'categorias') {
      window.location.href = `/pages/pesquisar.html?categoria=${target.value}&product=${inputSearch.value}`;
    }
  })

window.onload = () => { 
    selectCategories();
    createCardsProducts();
  };