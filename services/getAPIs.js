export const fetchCategories = async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }

export const fetchProductGeneral = async (product) => {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
};

export const fetchProductGeneralCategorie = async (product, categorie) => {
    const url = ` https://api.mercadolibre.com/sites/MLB/search?category=${categorie}&q=${product}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
};

export const fetchItem = async () => {
    const id = window.location.href.split('?')[1];
    const url =`https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
};

export const fetchCep = async (cep) => {   
    const url =  `https://viacep.com.br/ws/${cep}/json`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
};