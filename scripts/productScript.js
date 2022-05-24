import { createImageElement, createProductItemElement } from "../services/createElements.js";
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

const mainImageDynamic = ({ target }) => {
    if (target.className === 'preview-image') {
        mainImage.src = target.src;
    }
};
preview.addEventListener('click', mainImageDynamic)

const createDetails = async () => {
    const results = await fetchItem();
    createGalery(results);
    createInformations(results)
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
    }
})


window.onload = () => {
    createDetails();
};
