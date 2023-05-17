import { products, imagesUrl, eventedPushState, navigate } from "../helpers.js"
import navButtons from "../components/navButtons.js"

export default function productDetailsPage(productId) {
  const product = products.find((prod) => prod.prodId === productId)
  const content = document.getElementById("main-content")
  content.innerHTML = ""
  content.className = "product-container row"

  const productHasMultipleImages = product.productMedia.length > 1
  let productImage

  if (productHasMultipleImages) {
    productImage = addImageCarousel(product.productMedia)
  } else {
    productImage = document.createElement("img")
    productImage.setAttribute("src", imagesUrl + product.productMedia[0].url)
  }

  const navButtonsContainer = document.createElement("div")
  navButtonsContainer.classList.add("col-12", "mb-4")
  navButtonsContainer.appendChild(navButtons())
  content.appendChild(navButtonsContainer)

  const productPath = document.createElement("div")
  productPath.classList.add("col-12", "mb-4", "product-path")
  content.appendChild(productPath)
  const productCategoryElement = document.createElement("a")
  productCategoryElement.innerHTML = `<h2>${product.category.categoryName}</h2>`
  productCategoryElement.onclick = () =>
    handleCategoryClick(product.category.categoryId)
  const productPathTitle = document.createElement("h2")
  productPathTitle.innerHTML = `<span class="slash">&sol;</span><span>${product.title}</span>`
  productPath.appendChild(productCategoryElement)
  productPath.appendChild(productPathTitle)

  const productImageContainer = document.createElement("div")
  productImageContainer.classList.add("col-12", "col-md-7", "mb-4", "mb-md-0")
  productImageContainer.appendChild(productImage)
  content.appendChild(productImageContainer)

  const productDescriptionContainer = document.createElement("div")
  productDescriptionContainer.classList.add("col-12", "col-md-5")
  productDescriptionContainer.innerHTML = `
    <div class="ms-md-5">
      <h1>${product.title}</h1>
      <p>$ ${product.price}</p>
      <p>${product.description}</p>
    </div>
  `
  content.appendChild(productDescriptionContainer)

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

  return carouselElement
}

function handleCategoryClick(category) {
  eventedPushState(navigate({ category }))
}
