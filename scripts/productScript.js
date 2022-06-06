import { createImageElement, createProductItemElement, createCustomElement } from "../services/createElements.js";
import { fetchItem, fetchProductGeneral, fetchCep } from "../services/getAPIs.js";

const preview = document.querySelector('.preview');
const mainImage = document.querySelector('.main-image');
const titleProduct = document.querySelector('.titulo-product');
const vendidosSpan = document.querySelector('#vendidos-span');
const priceProduct = document.querySelector('.priceProduct');
const detailMarca = document.querySelector('.detail-marca');
const garantia = document.querySelector('.garantia');
const compartilhar = document.getElementById('compartilhar');
const fullInfos = document.querySelector('.fullInfos');
const listProducts = document.querySelector('.listProducts');
const categoria = document.querySelector('.categoria');
const endereco = document.getElementById('endereco');
const inputCep = document.getElementById('inputCep');
const btnCep = document.getElementById('btnCep');
const prazoCalculado = document.querySelector('.prazo-calculado');
const calcularPrazo = document.querySelector('.calcular-prazo');
const seleStartsAva = document.querySelector('.seleStartsAva');
const conjuntoAvaliacoes = document.querySelector('.conjuntoAvaliacoes');
const startsAva = document.querySelectorAll('.startsAva');
const bntAddCart = document.querySelector('.bnt-addCart');
const inputSearch = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const favoritar = document.getElementById('favoritar');
const fav = document.querySelector('.fav');
const numberCart = document.querySelector('.number-card');
const btnComprar = document.querySelector('.bnt-comprar');
const inputsAval = document.querySelectorAll('.inputsAvaliacaoo');
const loginCadastro = document.getElementById('login-cadastro');
const btnConfirmarAval = document.getElementById('btn-avaliarr');
const numberAvaliacao = document.getElementById('number-avaliacao');
const usuario = JSON.parse(localStorage.getItem('login'));
const avalia = JSON.parse(localStorage.getItem('avaliacoesProdutos'));
const idDoProduto = window.location.href.split('?')[1];
const cart = {
    id: '',
    thumbnail: '',
    price: '',
    title: '',
    quanty: 1,
}
const avaliacao = {
    idProd: '',
    quantyStars: 0,
    nome: '',
    titulo: '',
    aval: '',
}

btnConfirmarAval.addEventListener('click', () => {
    avaliacao.nome = inputsAval[0].value;
    avaliacao.titulo = inputsAval[1].value;
    avaliacao.aval = inputsAval[2].value;
    if (avalia === null) {
        localStorage.setItem('avaliacoesProdutos', JSON.stringify([avaliacao]));
    } else {
        localStorage.setItem('avaliacoesProdutos', JSON.stringify([...avalia, avaliacao]));
    }

    inputsAval.forEach((e) => e.value = '');
    window.location.href = `/pages/product.html?${idDoProduto}`
})

const createStars = (ind) => {
    for (let i = 0; i < 5; i += 1) {
        const sta = document.createElement('span');
        const sta1 = document.createElement('span');
        if (i <= ind) {
            sta.className = 'material-icons seleStar'
            sta1.className = 'material-icons seleStar'
        } else {
            sta.className = 'material-icons'
            sta1.className = 'material-icons'
        }
        sta.innerText = 'star';
        sta1.innerText = 'star';

        startsAva[0].appendChild(sta);
        startsAva[1].appendChild(sta1);
    }
};

const setStars = ({target}) => {
    seleStartsAva.innerHTML = '';
    avaliacao.quantyStars = target.id;
    for (let i = 0; i < 5; i += 1) {
        const sta = document.createElement('span');
        if (i <= target.id) {
            sta.className = 'material-icons seleStar'
        } else {
            sta.className = 'material-icons'
        }
        sta.innerText = 'star';
        sta.id = i;

        seleStartsAva.appendChild(sta);
        
    }
};

seleStartsAva.addEventListener('click', setStars)

const createGalery = ({ pictures }) => {
    mainImage.src = pictures[0].url
    if (pictures.length > 5) {
        const slicePicture = pictures.slice(0, 5);
        slicePicture.forEach((element) => {
            preview.appendChild(createImageElement(element.url, 'preview-image'))
        });
    } else {
        pictures.forEach((element) => {
            preview.appendChild(createImageElement(element.url, 'preview-image'))
        });
    }
}

const createInformations = ({
    warranty,
    title,
    price,
    initial_quantity,
    available_quantity,
    attributes }) => {
    titleProduct.innerText = title;
    vendidosSpan.innerText = initial_quantity - available_quantity;
    priceProduct.innerText = `R$ ${price.toFixed(2)}`;
    garantia.innerText = (warranty === null) ? "Sem garantia" : warranty;
    const marcaFind = attributes.find((ev) => ev.name === 'Marca');
    detailMarca.innerText = (marcaFind === undefined || marcaFind.value_name === 'undefined')
        ? 'Generic'
        : detailMarca.innerText = marcaFind.value_name;
    createTable(attributes);
    createRelacionedProducts(title)
}

const createTable = (details) => {
    details.forEach((e) => {
        const newTr = document.createElement('tr');
        const newTd1 = document.createElement('td');
        const newTd2 = document.createElement('td');
        newTd1.innerText = e.name;
        newTd2.innerText = e.value_name;
        newTr.appendChild(newTd1);
        newTr.appendChild(newTd2);
        fullInfos.appendChild(newTr);
    })
};

const createInformayionsCart = ({ title, price, thumbnail, id }) => {
    cart.id = id;
    cart.thumbnail = thumbnail;
    cart.price = price.toFixed(2);
    cart.title = title;
    avaliacao.idProd = id;
};

const mainImageDynamic = ({ target }) => {
    if (target.className === 'preview-image') {
        mainImage.src = target.src;
    }
};
preview.addEventListener('click', mainImageDynamic)

const createDetails = async () => {
    const results = await fetchItem();
    createGalery(results);
    createInformations(results);
    createInformayionsCart(results);
    verifications();
}

const createRelacionedProducts = async (product) => {
    const { results } = await fetchProductGeneral(product)

    results.forEach((ev) => {
        const lis = document.createElement('li');
        lis.appendChild(createProductItemElement(ev))
        listProducts.appendChild(lis);
    })
    
};

const time  = () => {
    setTimeout(() => {
        const clearLinkCopy = document.getElementById('linkCopy');
        clearLinkCopy.parentNode.removeChild(clearLinkCopy);
    },2000)
}

function carrosselProducts({ target }) {
    if(target.id == 'passar') {
        listProducts.scrollBy(+200, 0)
    }
    if(target.id == 'voltar') {
        listProducts.scrollBy(-200, 0)
    }
}

categoria.addEventListener('click', carrosselProducts);

const copy = () => {
    const url = window.location.href.toString();
    navigator.clipboard.writeText(url);
    const linkCopied = document.createElement('span');
    linkCopied.id = 'linkCopy';
    linkCopied.innerText = 'Link Copiado';
    linkCopied.style.marginLeft = '15px';
    compartilhar.appendChild(linkCopied);
    time()
}
compartilhar.addEventListener('click', copy);

btnCep.addEventListener('click', async () => {
    const endre = await fetchCep(inputCep.value);
    if (endre.erro !== 'true') {
        const en = `${endre.logradouro}, ${endre.bairro} - ${endre.localidade}/${endre.uf}`;
        endereco.innerText = en
        prazoCalculado.style.display = 'flex';
        calcularPrazo.style.display = 'none';
        if (usuario !== null && usuario.active !== false) {
        usuario.cep = inputCep.value;
        localStorage.setItem('login', JSON.stringify(usuario));
        }
    } else {
        inputCep.style.border = '2px solid red';
    }
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

    bntAddCart.addEventListener('click', () => {
        if (usuario === null || usuario.active === false) {
            window.location.href = '/pages/login.html';
        } else if (bntAddCart.innerHTML !== 'done') {
            usuario.cart = [...usuario.cart, cart];
            localStorage.setItem('login', JSON.stringify(usuario));
            numberCart.innerText = usuario.cart.length;
            bntAddCart.innerHTML = 'done';
        } else {
            const offcart = usuario.cart.filter((ev) => ev.id !== cart.id);
            usuario.cart = offcart;
            localStorage.setItem('login', JSON.stringify(usuario));
            numberCart.innerText = usuario.cart.length;
            bntAddCart.innerHTML = 'add_shopping_cart';
        }
    })


    favoritar.addEventListener('click', () => {
        if (usuario === null || usuario.active === false) {
            window.location.href = '/pages/login.html';
        } 
        if (fav.innerHTML === 'favorite_border') {
            usuario.favoritos = [...usuario.favoritos, cart];
            localStorage.setItem('login', JSON.stringify(usuario));
            fav.innerHTML = 'favorite';
        } else {
            const offFav = usuario.favoritos.filter((ev) => ev.id !== cart.id);
            usuario.favoritos = offFav;
            localStorage.setItem('login', JSON.stringify(usuario));
            fav.innerHTML = 'favorite_border';
        }
    }) 

    btnComprar.addEventListener('click', () => {
        if (usuario === null || usuario.active === false) {
            window.location.href = '/pages/login.html';
        } else {
            usuario.cart = [...usuario.cart, cart];
            localStorage.setItem('login', JSON.stringify(usuario));
            window.location.href = '/pages/carrinho.html';
        }
    })

const verifications = () => {
    if (usuario !== null && usuario.active !== false) {
        const vericart = usuario.cart.some((e) => e.id === cart.id);
        const verifav = usuario.favoritos.some((e) => e.id === cart.id);
        numberCart.innerText = usuario.cart.length;
        numberCart.innerText = usuario.cart.length;
        loginCadastro.innerText = 'perm_identity';
        loginCadastro.href = '/pages/favoritos.html'
        loginCadastro.appendChild(createCustomElement('span', 'perfil-name', usuario.nome.split(' ')[0]))
        if (vericart) {
            bntAddCart.innerHTML = 'done';
        }
        if (verifav) {
            fav.innerHTML = 'favorite';
        }
        if (usuario.cep !== '') {
            inputCep.value = usuario.cep;
        }

           //         Para disp. mobile     //
    document.querySelector(".nav-item #login").setAttribute("id", "login-cadastro");
    document.querySelector(".nav-item #login-cadastro").innerText = 'perm_identity';
    document.querySelector(".nav-item #login-cadastro").classList.add("material-icons")
    document.querySelector(".nav-item #login-cadastro").href = '/pages/favoritos.html'
    document.querySelector(".nav-item #login-cadastro").appendChild(createCustomElement('span', 'perfil-name', usuario.nome.split(' ')[0]));
    document.getElementById("cart-number").innerText = `(${usuario.cart.length})`;
    } 

    if (avalia !== null) {
        const filterAvaliaId = avalia.filter((e) => e.idProd === idDoProduto);
        if (filterAvaliaId.length > 0) {
            let quantyStarTotal = 0;
            filterAvaliaId.forEach((e) => {
                conjuntoAvaliacoes.appendChild(createDivAval(e));
                if (e.quantyStars === 'btn-avaliar') {
                    quantyStarTotal += 0;
                } else {
                    quantyStarTotal += Number(e.quantyStars);
                }
            });
            const madiaStars = quantyStarTotal / filterAvaliaId.length;
            createStars(Math.ceil(madiaStars));
            numberAvaliacao.innerText = filterAvaliaId.length;
        } else {
            createStars();
        }
    } else {
        createStars();
    }
};

const createDivStarsUsuario = (starUsuario) => {
    const staUsu = document.createElement('div');
    staUsu.className = 'stars-Aval-usuario';
    for (let i = 0; i < 5; i += 1) {
        const sta = document.createElement('span');
        if (i <= starUsuario) {
            sta.className = 'material-icons seleStar'
        } else {
            sta.className = 'material-icons'
        }
        sta.innerText = 'star';
        staUsu.appendChild(sta);
    }
    return staUsu;
};

const createDivAval = ({aval, nome, quantyStars, titulo}) => {
    const divGeralA = document.createElement('div');
    const spanName = document.createElement('span');
    const spanTitle = document.createElement('span');
    const spanAvalCompleto = document.createElement('span');
    const hrSeparar = document.createElement('hr');

    divGeralA.className = 'avaliacao-usuario';
    spanName.innerText = nome;
    spanTitle.innerText = titulo;
    spanTitle.className = 'title-aval';
    spanAvalCompleto.innerText = aval;

    divGeralA.appendChild(spanName);
    divGeralA.appendChild(createDivStarsUsuario(quantyStars));
    divGeralA.appendChild(spanTitle);
    divGeralA.appendChild(spanAvalCompleto);
    divGeralA.appendChild(hrSeparar);
    return divGeralA;
}

const btnAvaliar = document.getElementById('btn-avaliar');
const modalAvaliar = document.getElementById('modal-avaliar');
const sairModal = document.getElementById('sair-trocarSenha');

btnAvaliar.addEventListener('click', (event) => {
    modalAvaliar.style.display = 'flex';
    setStars(event);
})

sairModal.addEventListener('click', () => {
    modalAvaliar.style.display = 'none';
})



window.onload = () => {
    createDetails();
};