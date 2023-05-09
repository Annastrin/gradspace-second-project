const products = rawdata.filter((product) => product.productMedia.length > 0)
const imagesUrl = "https://storage.googleapis.com/luxe_media/wwwroot/"
const productsContainer = document.getElementById("product-container")

function showProducts(products) {
  products.forEach((product) => {
    const productElement = document.createElement("div")
    const productCard = `
      <a class="product-card" href="./products/${product.prodId}">
        <img src="${
          imagesUrl + product.productMedia[0].url
        }" alt="" class="product-image"/>
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">$ ${product.price}</p>
      </a>
    `
    productElement.className = "col"
    productElement.innerHTML = productCard
    productsContainer.appendChild(productElement)
  })
}

const url = new URL(window.location.href.toLowerCase())
const page = Number(url.searchParams.get("page")) || 1

const productsNum = products.length
const productsOnPage = 20
const pagesNum = Math.ceil(productsNum / productsOnPage)

const productsToShow = products.slice(
  productsOnPage * (page - 1),
  productsOnPage * page
)

function handlePageClick(el, pageNum) {
  const activePageLink = document.querySelector(".page-link.active")
  activePageLink && activePageLink.classList.remove("active")
  el.classList.add("active")

  //history.pushState({ page: pageNum }, "", `?page=${pageNum}`)
  window.location.href = `?page=${pageNum}`
}

const pagesContainer = document.getElementById("pagination")

for (let i = 0; i < pagesNum; i++) {
  const pageItem = document.createElement("li")
  let pageLinkContent

  if ((page === null && i === 0) || page === i + 1) {
    pageLinkContent = `<a class="page-link active" onclick="handlePageClick(this, ${
      i + 1
    })">${i + 1}</a>`
  } else {
    pageLinkContent = `<a class="page-link" onclick="handlePageClick(this, ${
      i + 1
    })">${i + 1}</a>`
  }

  pageItem.innerHTML = pageLinkContent
  pageItem.className = "page-item"
  pagesContainer.appendChild(pageItem)
}

showProducts(productsToShow)
