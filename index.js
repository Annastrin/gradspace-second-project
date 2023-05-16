import productDetailsPage from "./scripts/pages/productDetailsPage.js"
import productsCatalogPage from "./scripts/pages/productsCatalogPage.js"

function renderContent(url) {
  const params = new URLSearchParams(url)
  const page = params.get("page")
  const product = params.get("product")
  const category = params.get("category")
  const price = params.get("price")

  if (
    page === null &&
    product === null &&
    category === null &&
    price === null
  ) {
    productsCatalogPage(null, 1, null)
  } else if (category || page || price) {
    productsCatalogPage(Number(category) || null, Number(page) || 1, price)
  } else if (product) {
    const productId = Number(product)
    productDetailsPage(productId)
  } else {
    renderPageNotFound()
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
  function () {
    const url = document.location.search.toLowerCase()
    renderContent(url)
  },
  false
)

function renderPageNotFound() {
  const content = document.getElementById("main-content")
  content.innerHTML = `
    <div class="container text-center">
      <div class="mb-4">
        <div class="nav-buttons">
          <button class="nav-btn" onclick="handleGoHome()">Home</button>
          <button class="nav-btn" onclick="handleGoBack()">Back</button>
        </div>
      </div>
      <p>Page Not Found :(</p>
    </div>
  `
}
