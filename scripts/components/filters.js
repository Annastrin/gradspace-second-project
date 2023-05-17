import { products, eventedPushState, navigate } from "../helpers.js"

export default function filters(
  category = null,
  price = null,
  sortPrice = null
) {
  const filtersElement = document.createElement("div")
  filtersElement.classList.add("products-filters")
  filtersElement.appendChild(categoriesFilter(category, price, sortPrice))
  filtersElement.appendChild(priceFilter(price, category, sortPrice))
  filtersElement.appendChild(priceSorter(category, price, sortPrice))

  return filtersElement
}

function categoriesFilter(category, price, sortPrice) {
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
  selectCategoryElement.onchange = () => handleCategorySelect(price, sortPrice)
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

function handleCategorySelect(price, sortPrice) {
  const category = document.getElementById("category").value
  eventedPushState(navigate({ category, price, sortPrice }))
}

function priceFilter(price, category, sortPrice) {
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
  selectPriceElement.onchange = () => handlePriceSelect(category, sortPrice)
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

function handlePriceSelect(category, sortPrice) {
  const price = document.getElementById("price").value
  eventedPushState(navigate({ price, category, sortPrice }))
}

function priceSorter(category, price, sortPrice) {
  console.trace(sortPrice)
  const sortContainer = document.createElement("div")
  sortContainer.classList.add("sort-price")

  const sortPriceLabel = document.createElement("label")
  sortPriceLabel.setAttribute("for", "sort-price")
  sortPriceLabel.innerText = "Sort price"
  sortContainer.appendChild(sortPriceLabel)

  const sortPriceElement = document.createElement("select")
  sortPriceElement.setAttribute("id", "sort-price")
  sortPriceElement.setAttribute("name", "sort-price")
  sortPriceElement.onchange = () => handleSortPrice(category, price)
  sortPriceElement.classList.add("filters")
  sortPriceElement.innerHTML = `
    <option value="" ${sortPrice === "" && "selected"}>Default</option>
    <option value="low-to-high" ${
      sortPrice === "low-to-high" && "selected"
    }>Low to High</option>
    <option value="high-to-low" ${
      sortPrice === "high-to-low" && "selected"
    }>High to Low</option>
  `
  sortContainer.appendChild(sortPriceElement)

  return sortContainer
}

function handleSortPrice(category, price) {
  const sortPrice = document.getElementById("sort-price").value
  console.log(sortPrice)
  eventedPushState(navigate({ category, price, sortPrice }))
}
