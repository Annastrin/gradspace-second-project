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
    productElement.className = "col"

    const productCard = `
      <a class="product-card" onclick="handleProductCardClick(${
        product.prodId
      })">
        <div class="product-image-container">
          <img src="${
            imagesUrl + product.productMedia[0].url
          }" alt="" class="product-image"/>
        </div>
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">$ ${product.price}</p>
      </a>
    `
    productElement.innerHTML = productCard
    productsContainer.appendChild(productElement)
  })
}

function handleProductCardClick(productId) {
  eventedPushState({}, "", `?product=${productId}`)
}

function renderProductDetails(productId) {
  const product = products.find((prod) => prod.prodId === productId)
  const productContainer = document.getElementById("main-content")
  productContainer.innerHTML = ""
  productContainer.className = "product-container row"

  const productHasMultipleImages = product.productMedia.length > 1
  let productImage

  if (productHasMultipleImages) {
    productImage = addImageCarousel(product.productMedia)
  } else {
    productImage = `
      <img src="${imagesUrl + product.productMedia[0].url}" />
    `
  }

  productContainer.innerHTML = `
    <div class="col-12 mb-4">
      <div class="nav-buttons">
          <button class="nav-btn" onclick="handleGoHome()">Home</button>
          <button class="nav-btn" onclick="handleGoBack()">Back</button>
        </div>
      </div>
    <div class="col-12 col-md-7 mb-4 mb-md-0">
      ${productImage}
    </div>
    <div class="col-12 col-md-5">
      <div class="ms-md-5">
        <h2>${product.title}</h2>
        <p>$ ${product.price}</p>
        <p>${product.description}</p>
      </div>
    </div>
  `
  if (productHasMultipleImages) {
    const carousel = new bootstrap.Carousel("#carousel")
    carousel.cycle()
  }
}

function addImageCarousel(images) {
  const carouselElement = document.createElement("div")
  carouselElement.classList.add("carousel", "slide", "carousel-fade")
  carouselElement.setAttribute("id", "carousel")
  carouselElement.setAttribute("data-bs-ride", "carousel")

  const carouselIndicators = document.createElement("div")
  carouselIndicators.classList.add("carousel-indicators")
  carouselElement.appendChild(carouselIndicators)

  for (let i = 0; i < images.length; i++) {
    let indicator = document.createElement("button")
    if (i === 0) {
      indicator.classList.add("active")
      indicator.setAttribute("aria-current", "true")
    }
    indicator.setAttribute("type", "button")
    indicator.setAttribute("data-bs-target", "#carousel")
    indicator.setAttribute("data-bs-slide-to", `${i}`)
    indicator.setAttribute("aria-label", `Slide ${i}`)
    carouselIndicators.appendChild(indicator)
  }

  const carouselControls = document.createElement("div")
  carouselControls.innerHTML = `
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  `
  carouselElement.appendChild(carouselControls)

  const carouselInner = document.createElement("div")
  carouselInner.classList.add("carousel-inner")
  carouselElement.appendChild(carouselInner)

  images.forEach((image, index) => {
    let carouselItem = document.createElement("div")
    carouselItem.classList.add("carousel-item")
    if (index === 0) {
      carouselItem.classList.add("active")
    }
    carouselItem.innerHTML = `<img src="${
      imagesUrl + image.url
    }" class="d-block w-100" alt="">`
    carouselInner.appendChild(carouselItem)
  })

  const carouselWrapper = document.createElement("div")
  carouselWrapper.appendChild(carouselElement)
  return carouselWrapper.innerHTML
}

function handleGoHome() {
  eventedPushState({}, "", "")
}

function handleGoBack() {
  history.back()
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
  },
  false
)
