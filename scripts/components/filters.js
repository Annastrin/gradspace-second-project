import { products, eventedPushState, navigate } from "../helpers.js"

export default function filters(category = null, price = null) {
  const filtersElement = document.createElement("div")
  filtersElement.classList.add("products-filters")
  filtersElement.appendChild(categoriesFilters(category, price))
  filtersElement.appendChild(priceFilters(price, category))

  return filtersElement
}

function categoriesFilters(category, price) {
  const categoriesArr = products[0].prodType.productCategory
  const selectCategoryContainer = document.createElement("div")
  selectCategoryContainer.classList.add("products-categories")

  const selectCategoryLabel = document.createElement("label")
  selectCategoryLabel.setAttribute("for", "category")
  selectCategoryLabel.innerText = "Category"
  selectCategoryContainer.appendChild(selectCategoryLabel)

  const selectCategoryElement = document.createElement("select")
  selectCategoryElement.setAttribute("id", "category")
  selectCategoryElement.setAttribute("name", "category")
  selectCategoryElement.classList.add("filters")
  selectCategoryElement.onchange = () => handleCategorySelect(price)
  selectCategoryContainer.appendChild(selectCategoryElement)

  let categoryOption = document.createElement("option")
  categoryOption.setAttribute("value", "")
  categoryOption.innerText = "ALL HIRES"
  selectCategoryElement.appendChild(categoryOption)

  for (let i = 0; i < categoriesArr.length; i++) {
    categoryOption = document.createElement("option")
    categoryOption.setAttribute("value", `${categoriesArr[i].categoryId}`)
    categoryOption.innerText = categoriesArr[i].categoryName

    if (category) {
      if (categoriesArr[i].categoryId === category) {
        categoryOption.setAttribute("selected", "")
      }
    }

    selectCategoryElement.appendChild(categoryOption)
  }

  return selectCategoryContainer
}

function handleCategorySelect(price) {
  const category = document.getElementById("category").value
  eventedPushState(navigate({ category, price }))
}

function priceFilters(price, category) {
  const selectPriceContainer = document.createElement("div")
  selectPriceContainer.classList.add("products-prices")

  const selectPriceLabel = document.createElement("label")
  selectPriceLabel.setAttribute("for", "price")
  selectPriceLabel.innerText = "Price"
  selectPriceContainer.appendChild(selectPriceLabel)

  const selectPriceElement = document.createElement("select")
  selectPriceElement.setAttribute("id", "price")
  selectPriceElement.setAttribute("name", "price")
  selectPriceElement.classList.add("filters")
  selectPriceElement.onchange = () => handlePriceSelect(category)
  selectPriceElement.innerHTML = `
    <option value="" ${price === "" && "selected"}>All</option>
    <option value="min0max100" ${
      price === "min0max100" && "selected"
    }>0-100</option>
    <option value="min101max500" ${
      price === "min101max500" && "selected"
    }>101-500</option>
    <option value="min501max1000" ${
      price === "min501max1000" && "selected"
    }>501-1000</option>
    <option value="min1001" ${
      price === "min1001" && "selected"
    }>&gt;1000</option>
  `
  selectPriceContainer.appendChild(selectPriceElement)
  return selectPriceContainer
}

function handlePriceSelect(category) {
  const price = document.getElementById("price").value
  eventedPushState(navigate({ price, category }))
}
