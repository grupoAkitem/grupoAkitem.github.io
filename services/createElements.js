export function createImageElement(imageSource, imgclass) {
    const img = document.createElement('img');
    img.className = imgclass;
    img.src = imageSource;
    return img;
  }

export function createCustomElement(element, className, innerText) {
    const e = document.createElement(element);
    e.className = className;
    e.innerText = innerText;
    return e;
  }

export  function createProductItemElement({ id, title, thumbnail, price }) {
    const cardProduct = document.createElement('a');
    cardProduct.className = 'item';
    cardProduct.href = `/pages/product.html?${id}`
  
    cardProduct.appendChild(createImageElement(thumbnail, 'item__image'));
    cardProduct.appendChild(createCustomElement('span', 'item__id', id));
    cardProduct.appendChild(createCustomElement('div', 'item__title', title));
    cardProduct.appendChild(createCustomElement('span', 'item__add', `R$: ${ price.toFixed(2) }`));
  
    return cardProduct;
  }
