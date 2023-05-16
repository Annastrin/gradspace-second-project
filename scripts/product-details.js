import eventedPushState from "./helpers.js"

const imagesUrl = "https://storage.googleapis.com/luxe_media/wwwroot/"
const products = rawdata.filter((product) => product.productMedia.length > 0)

export default function renderProductDetails(productId) {
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

  const navButtonsContainer = document.createElement("div")
  navButtonsContainer.classList.add("col-12", "mb-4")
  navButtonsContainer.appendChild(addNavButtons())
  productContainer.appendChild(navButtonsContainer)

  const productImageContainer = document.createElement("div")
  productImageContainer.classList.add("col-12", "col-md-7", "mb-4", "mb-md-0")
  productImageContainer.innerHTML = productImage
  productContainer.appendChild(productImageContainer)

  const productDescriptionContainer = document.createElement("div")
  productDescriptionContainer.classList.add("col-12", "col-md-5")
  productDescriptionContainer.innerHTML = `
    <div class="ms-md-5">
      <h2>${product.title}</h2>
      <p>$ ${product.price}</p>
      <p>${product.description}</p>
    </div>
  `
  productContainer.appendChild(productDescriptionContainer)

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

function addNavButtons() {
  const buttonsContainer = document.createElement("div")
  buttonsContainer.classList.add("nav-buttons")

  const homeBtn = document.createElement("button")
  homeBtn.classList.add("nav-btn")
  homeBtn.innerText = "Home"
  homeBtn.onclick = handleGoHome
  buttonsContainer.appendChild(homeBtn)

  const backBtn = document.createElement("button")
  backBtn.classList.add("nav-btn")
  backBtn.innerText = "Back"
  backBtn.onclick = handleGoBack
  buttonsContainer.appendChild(backBtn)

  return buttonsContainer
}

function handleGoHome() {
  console.trace("Go Home")
  eventedPushState({ page_id: 1 }, "", "./")
}

function handleGoBack() {
  console.trace("Go Back")
  history.back()
}
