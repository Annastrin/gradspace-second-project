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
  price = null
) {
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

  if (pagesNum > 0) {
    content.appendChild(navigation(pagesNum, page, category, price))
  }
  content.appendChild(filters(category, price))
  content.appendChild(productsCatalog(productsToShow, productsOnPage))
}
