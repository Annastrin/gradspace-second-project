import renderNavigation from "./scripts/navigation.js"
import renderFilters from "./scripts/filters.js"
import renderProducts from "./scripts/products.js"
import renderProductDetails from "./scripts/product-details.js"

const products = rawdata.filter((product) => product.productMedia.length > 0)

/**
 *
 * @param {number} page
 */
function renderProductsPage(category = null, page = 1, price = null) {
  let productsToShow
  let productsNum

  if (category && price === null) {
    productsToShow = products.filter(
      (product) => product.categoryId === category
    )
  } else if (category === null && price) {
    productsToShow = products.filter((product) => {
      switch (price) {
        case "min0max100":
          return product.price <= 100
        case "min101max500":
          return product.price >= 101 && product.price <= 500
        case "min501max1000":
          return product.price >= 501 && product.price <= 1000
        case "min1001":
          return product.price >= 1001
        default:
          return product
      }
    })
  } else if (category && price) {
    productsToShow = products
      .filter((product) => product.categoryId === category)
      .filter((product) => {
        switch (price) {
          case "min0max100":
            return product.price <= 100
          case "min101max500":
            return product.price >= 101 && product.price <= 500
          case "min501max1000":
            return product.price >= 501 && product.price <= 1000
          case "min1001":
            return product.price >= 1001
          default:
            return product
        }
      })
  } else {
    productsToShow = products
  }
  productsNum = productsToShow.length

  const productsOnPage = 20
  const pagesNum = Math.ceil(productsNum / productsOnPage)

  productsToShow = productsToShow.slice(
    productsOnPage * (page - 1),
    productsOnPage * page
  )

  const content = document.getElementById("main-content")
  content.innerHTML = ""

  renderNavigation(pagesNum, page, category, price)
  renderFilters(category, price)
  renderProducts(productsToShow, productsOnPage)
}

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
    renderProductsPage(null, 1, null)
  } else if (category || page || price) {
    renderProductsPage(Number(category) || null, Number(page) || 1, price)
  } else if (product) {
    const productId = Number(product)
    renderProductDetails(productId)
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
