const products = rawdata.filter((product) => product.productMedia.length > 0)
const imagesUrl = "https://storage.googleapis.com/luxe_media/wwwroot/"

function renderProducts(products) {
  const productsContainer = document.getElementById("product-container")
  productsContainer.innerHTML = ""
  products.forEach((product, i) => {
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

/**
 *
 * @param {number} pagesNum
 * @param {number} currentPage
 */
function renderNavigation(pagesNum, currentPage) {
  const pagesContainer = document.getElementById("pagination")
  pagesContainer.innerHTML = ""

  for (let i = 0; i < pagesNum; i++) {
    const pageItem = document.createElement("li")
    let pageLinkContent

    if ((currentPage === null && i === 0) || currentPage === i + 1) {
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
}

/**
 *
 * @param {number} page
 */
function renderPage(page) {
  const productsNum = products.length
  const productsOnPage = 20
  const pagesNum = Math.ceil(productsNum / productsOnPage)

  const productsToShow = products.slice(
    productsOnPage * (page - 1),
    productsOnPage * page
  )

  renderNavigation(pagesNum, page)
  renderProducts(productsToShow, productsOnPage)
}

function initialRender() {
  const url = new URL(window.location.href.toLowerCase())
  const page = Number(url.searchParams.get("page")) || 1
  renderPage(page)
}

initialRender()

function handlePageClick(el, pageNum) {
  const activePageLink = document.querySelector(".page-link.active")
  activePageLink && activePageLink.classList.remove("active")
  el.classList.add("active")
  eventedPushState({}, "", `?page=${pageNum}`)
}

function eventedPushState(state, title, url) {
  var pushChangeEvent = new CustomEvent("onpushstate", {
    detail: {
      state,
      title,
      url,
    },
  })
  document.dispatchEvent(pushChangeEvent)
  return history.pushState(state, title, url)
}

document.addEventListener(
  "onpushstate",
  function (event) {
    const page = new URLSearchParams(event.detail.url).get("page")
    renderPage(Number(page))
  },
  false
)
