const products = rawdata.filter((product) => product.productMedia.length > 0)
const imagesUrl = "https://storage.googleapis.com/luxe_media/wwwroot/"

function renderProducts(products) {
  const content = document.getElementById("main-content")

  const productsContainer = document.createElement("div")
  productsContainer.className = "product-container row"
  productsContainer.classList.add(
    "row-cols-1",
    "row-cols-sm-2",
    "row-cols-lg-4"
  )
  content.appendChild(productsContainer)

  products.forEach((product) => {
    const productElement = document.createElement("div")
    const productCard = `
      <a class="product-card" onclick="handleProductCardClick(${
        product.prodId
      })">
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

function renderProductDetails(productId) {
  const product = products.find((prod) => prod.prodId === productId)
  console.trace(product)
  const productContainer = document.getElementById("main-content")
  productContainer.innerHTML = ""
  productContainer.className = "product-container row"

  const productHasMultipleImages = product.productMedia.length > 1
  let productImage

  if (productHasMultipleImages) {
    productImage = `
      <img src="${imagesUrl + product.productMedia[0].url}" />
    `
  } else {
    productImage = `
      <img src="${imagesUrl + product.productMedia[0].url}" />
    `
  }

  productContainer.innerHTML = `
    <div class="col-12 col-md-6">
      ${productImage}
    </div>
    <div class="col-12 col-md-6">
      <h2>${product.title}</h2>
      <p>$ ${product.price}</p>
      <p>${product.description}</p>
    </div>
  `
}

function handleProductCardClick(productId) {
  eventedPushState({}, "", `?product=${productId}`)
}

/**
 *
 * @param {number} pagesNum
 * @param {number} currentPage
 */
function renderNavigation(pagesNum, currentPage) {
  const content = document.getElementById("main-content")

  const nav = document.createElement("nav")
  nav.setAttribute("aria-label", "Page navigation")
  content.appendChild(nav)

  const ul = document.createElement("ul")
  ul.classList.add("pagination")
  ul.setAttribute("id", "pagination")
  nav.appendChild(ul)

  const prevPageLink = document.createElement("li")
  prevPageLink.classList.add("page-item")

  if (currentPage === null || currentPage === 1) {
    prevPageLink.classList.add("disabled")
  }
  prevPageLink.innerHTML = `
    <a class="page-link" aria-label="Previous" onclick="handlePrevClick()">
      <span aria-hidden="true">&laquo;</span>
    </a>
  `
  const nextPageLink = document.createElement("li")
  nextPageLink.classList.add("page-item")

  if (currentPage === 11) {
    nextPageLink.classList.add("disabled")
  }

  nextPageLink.innerHTML = `
    <a class="page-link" aria-label="Next" onclick="handleNextClick()">
      <span aria-hidden="true">&raquo;</span>
    </a>
  `
  ul.appendChild(prevPageLink)

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
    ul.appendChild(pageItem)
  }

  ul.appendChild(nextPageLink)
}

function handlePageClick(el, pageNum) {
  const activePageLink = document.querySelector(".page-link.active")
  activePageLink && activePageLink.classList.remove("active")
  el.classList.add("active")
  eventedPushState({}, "", `?page=${pageNum}`)
}

function handlePrevClick() {
  const page = Number(new URLSearchParams(document.location.search).get("page"))
  if (page > 1) {
    eventedPushState({}, "", `?page=${page - 1}`)
  }
}

function handleNextClick() {
  const page =
    Number(new URLSearchParams(document.location.search).get("page")) || 1
  if (page < 11) {
    eventedPushState({}, "", `?page=${page + 1}`)
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

  const content = document.getElementById("main-content")
  content.innerHTML = ""

  renderNavigation(pagesNum, page)
  renderProducts(productsToShow, productsOnPage)
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

function renderContent(url) {
  const params = new URLSearchParams(url)
  const page = params.get("page")
  const product = params.get("product")

  if (page === null && product === null) {
    renderPage(1)
  } else if (page) {
    renderPage(Number(page))
  } else if (product) {
    const productId = Number(product)
    renderProductDetails(productId)
  } else {
    console.log("Something went wrong!")
  }
}

function initialRender() {
  const url = document.location.search.toLowerCase()
  renderContent(url)
}

initialRender()

document.addEventListener(
  "onpushstate",
  function (event) {
    renderContent(event.detail.url)
  },
  false
)

window.addEventListener(
  "popstate",
  function (event) {
    const url = document.location.search.toLowerCase()
    renderContent(url)
    console.trace(event)
  },
  false
)
