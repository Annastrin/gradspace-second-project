import navigation from "../components/navigation.js"
import filters from "../components/filters.js"
import productsCatalog from "../components/products.js"
import { products } from "../helpers.js"

/**
 *
 * @param {number} page
 */
export default function productsCatalogPage(
  category = null,
  page = 1,
  price = null,
  sortPrice = null
) {
  let filteredProducts
  if (category && price === null) {
    filteredProducts = products.filter((product) =>
      categoryFilter(product, category)
    )
  } else if (category === null && price) {
    filteredProducts = products.filter((product) => priceFilter(product, price))
  } else if (category && price) {
    filteredProducts = products.filter(
      (product) =>
        categoryFilter(product, category) && priceFilter(product, price)
    )
  } else {
    filteredProducts = products.slice()
  }

  let productsToShow
  if (sortPrice) {
    if (sortPrice === "low-to-high") {
      productsToShow = filteredProducts
        .slice()
        .sort((a, b) => a.price - b.price)
    }
    if (sortPrice === "high-to-low") {
      productsToShow = filteredProducts
        .slice()
        .sort((a, b) => b.price - a.price)
    }
  } else {
    productsToShow = filteredProducts
  }

  const productsNum = productsToShow.length
  const productsOnPage = 20
  const pagesNum = Math.ceil(productsNum / productsOnPage)

  productsToShow = productsToShow.slice(
    productsOnPage * (page - 1),
    productsOnPage * page
  )

  const content = document.getElementById("main-content")
  content.className = ""
  content.innerHTML = ""

  if (pagesNum > 0) {
    content.appendChild(navigation(pagesNum, page, category, price, sortPrice))
  }
  content.appendChild(filters(category, price, sortPrice, page))
  content.appendChild(productsCatalog(productsToShow, productsOnPage))
}

function categoryFilter(product, category) {
  return product.categoryId === category
}

function priceFilter(product, price) {
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
}
