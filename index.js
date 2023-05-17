import productDetailsPage from "./scripts/pages/productDetailsPage.js"
import productsCatalogPage from "./scripts/pages/productsCatalogPage.js"
import pageNotFound from "./scripts/pages/pageNotFound.js"

function renderContent(url) {
  const params = new URLSearchParams(url)
  const page = params.get("page")
  const product = params.get("product")
  const category = params.get("category")
  const price = params.get("price")
  const sortPrice = params.get("sort-price")

  if (
    page === null &&
    product === null &&
    category === null &&
    price === null &&
    sortPrice === null &&
    (url === "" || url === "./")
  ) {
    productsCatalogPage(null, 1, null, null)
  } else if (category || page || price || sortPrice) {
    productsCatalogPage(
      Number(category) || null,
      Number(page) || 1,
      price,
      sortPrice
    )
  } else if (product) {
    const productId = Number(product)
    productDetailsPage(productId)
  } else {
    pageNotFound()
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
