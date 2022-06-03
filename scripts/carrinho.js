import { createCustomElement, createImageElement } from "../services/createElements.js";

const inputSearch = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const tBodyProducts = document.querySelector('.cartProducts')
const loginCadastro = document.getElementById('login-cadastro');
const numberCart = document.querySelector('.number-card');
const usuario = JSON.parse(localStorage.getItem('login'));
const numberItens = document.getElementById("numberItens");
const totalPrice = document.getElementById("totalPrice");
const totalCupom = document.getElementById("totalCupom");
const inserirCupom = document.getElementById("inserirCupom");
const btnAddCupom = document.getElementById("btnAddCupom");
const descriCupom = document.getElementById("descriCupom");
const divCupom = document.querySelector('.cupom');
const continueButton = document.querySelector('.continue-button');
const verification =document.getElementById("verification");
let activeCupom = false;

const redirectPesquisar = () => {
    window.location.href = `/pages/pesquisar.html?categoria=&product=${inputSearch.value}`
    inputSearch.value = '';
}

  continueButton.addEventListener('click', () => window.location.href = '/pages/pagamento.html')
  
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
  const removeItemCart = usuario.cart.some((ev) => ev.quanty <= 0);
  if (removeItemCart) {
    const filterAndRemove = usuario.cart.filter((e) => e.quanty >= 1);
    usuario.cart = filterAndRemove;
    localStorage.setItem('login', JSON.stringify(usuario));
    window.location.href = '/pages/carrinho.html';
  }
  usuario.cart.forEach(( element ) => {
   const tr = document.createElement('tr');
   const td1 = document.createElement('td');
   const divTd1 = document.createElement('div');
   const td2 = document.createElement('td');
   const divTd2 = document.createElement('div');
   const td3 = document.createElement('td');
   const td4 = document.createElement('td');
   
      divTd1.className = "div-img-table";
      divTd1.id = element.id;
      divTd1.appendChild(createImageElement(element.thumbnail, 'img'));
      divTd1.appendChild(createCustomElement('p', 'title', element.title));
      td1.appendChild(divTd1);

      divTd2.className = "add-remove";
      divTd2.id = element.id;
      divTd2.appendChild(createCustomElement('button', 'btnRem', '-'));
      divTd2.appendChild(createCustomElement('span', 'quanti', element.quanty));
      divTd2.appendChild(createCustomElement('button', 'btnAdd', '+'));
      td2.appendChild(divTd2);
      
  const fixedPrice = element.price * element.quanty;

      td3.innerText = element.id;
      td4.innerText = fixedPrice.toFixed(2);
      td3.className = "align-center";
      td4.className = "align-center";
      td4.style.fontWeight = '700';

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

   tBodyProducts.appendChild(tr);
  });
};

const addItemInCart = (id) => {
 usuario.cart.forEach((eve) => {
    if (eve.id === id) {
      eve.quanty += 1;
    }
  })
  localStorage.setItem('login', JSON.stringify(usuario));
  window.location.href = '/pages/carrinho.html';
};

const removeItemOfCart = (id) => {
  usuario.cart.forEach((eve) => {
    if (eve.id === id) {
      eve.quanty -= 1;
    }
  })
  localStorage.setItem('login', JSON.stringify(usuario));
  window.location.href = '/pages/carrinho.html';
};

tBodyProducts.addEventListener('click', ({ target }) => {

  if (target.parentNode.className === 'div-img-table') {
    window.location.href = `/pages/product.html?${target.parentNode.id}`
  }

  if (target.parentNode.className === 'add-remove') {
    switch (target.className) {
      case 'btnAdd':
        addItemInCart(target.parentNode.id)
        break;
        case 'btnRem':
          removeItemOfCart(target.parentNode.id)
          break;
      default:
        break;
    }
  }

});

const createresumo = () => {
  let quantyTotal = 0;
  let totalCompra = 0;

  usuario.cart.forEach((e) => {
    quantyTotal += e.quanty;
  });
  usuario.cart.forEach((e) => {
    totalCompra += (e.quanty * e.price);
  });
  
  const totlCupom = totalCompra - (totalCompra * 0.7);
  const veriCupom = (activeCupom) ? totlCupom.toFixed(2) : totalCompra.toFixed(2); 
  numberItens.innerText = quantyTotal;
  totalPrice.innerText = totalCompra.toFixed(2);
  totalCupom.innerText = veriCupom; 
  localStorage.setItem('totalprice', JSON.stringify(veriCupom)); 
};

btnAddCupom.addEventListener('click', () => {
  if (inserirCupom.value === 'SITENOTA10') {
    descriCupom.style.display = 'flex';
    divCupom.style.display = 'none';
    verification.style.display = 'none';
    activeCupom = true;
    createresumo();
  } else {
    verification.style.display = 'flex';
    inserirCupom.style.border = '1px solid red'
  }
})

const verifications = () => {
  if (usuario !== null && usuario.active !== false) {
    ceateCartProducts();
    createresumo();
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