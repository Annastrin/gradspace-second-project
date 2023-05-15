const products = rawdata.filter((product) => product.productMedia.length > 0)
const imagesUrl = "https://storage.googleapis.com/luxe_media/wwwroot/"

function renderProducts(products) {
  const content = document.getElementById("main-content")
  console.log("Rendering products...")

  const productsContainer = document.createElement("div")
  productsContainer.classList.add("product-container")
  content.appendChild(productsContainer)

  if (products.length > 0) {
    productsContainer.classList.add(
      "row",
      "row-cols-1",
      "row-cols-sm-2",
      "row-cols-lg-4"
    )

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
  } else {
    const noProducts = document.createElement("p")
    noProducts.innerText = "Nothing found :("
    productsContainer.appendChild(noProducts)
  }
}

function handleProductCardClick(productId) {
  eventedPushState({ product_id: productId }, "", `?product=${productId}`)
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
  eventedPushState({ page_id: 1 }, "", "./")
}

function handleGoBack() {
  history.back()
}

function renderFilters(category = null, price = null) {
  const content = document.getElementById("main-content")

  const filters = document.createElement("div")
  filters.classList.add("products-filters")
  filters.appendChild(categoriesFilters(category, price))
  filters.appendChild(priceFilters(price, category))

  content.appendChild(filters)
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
  console.trace({ category, price })
  if ((category && price === null) || (category && price === "")) {
    eventedPushState({ category_id: category }, "", `?category=${category}`)
  } else if ((category === null || category === "") && price) {
    eventedPushState({ price: price }, "", `?price=${price}`)
  } else if (category && price) {
    eventedPushState(
      { price: price, category_id: category },
      "",
      `?category=${category}&price=${price}`
    )
  } else {
    eventedPushState({ page_id: 1 }, "", "./")
  }
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
  if (price && category === null) {
    eventedPushState({ price: price }, "", `?price=${price}`)
  } else if ((price === null && category) || (price === "" && category)) {
    eventedPushState({ category_id: category }, "", `?category=${category}`)
  } else if (price && category) {
    eventedPushState(
      { price: price, category_id: category },
      "",
      `?category=${category}&price=${price}`
    )
  } else {
    eventedPushState({ page_id: 1 }, "", "./")
  }
}

/**
 *
 * @param {number} pagesNum
 * @param {number} currentPage
 */
function renderNavigation(pagesNum, currentPage, category, price) {
  if (pagesNum > 0) {
    const content = document.getElementById("main-content")
    price = price ? String(price) : price

    const nav = document.createElement("nav")
    nav.setAttribute("aria-label", "Page navigation")
    content.appendChild(nav)

    const ul = document.createElement("ul")
    ul.classList.add("pagination")
    ul.setAttribute("id", "pagination")
    nav.appendChild(ul)

    const prevPageLinkItem = document.createElement("li")
    prevPageLinkItem.classList.add("page-item")

    if (currentPage === null || currentPage === 1) {
      prevPageLinkItem.classList.add("disabled")
    }
    const prevPageLinkElement = document.createElement("a")
    prevPageLinkElement.classList.add("page-link")
    prevPageLinkElement.setAttribute("aria-label", "Previous")
    prevPageLinkElement.onclick = () => handlePrevClick(category, price)
    prevPageLinkElement.innerHTML = `<span aria-hidden="true">&laquo;</span>`
    prevPageLinkItem.appendChild(prevPageLinkElement)

    const nextPageLinkItem = document.createElement("li")
    nextPageLinkItem.classList.add("page-item")

    if (currentPage === pagesNum) {
      nextPageLinkItem.classList.add("disabled")
    }

    const nextPageLinkElement = document.createElement("a")
    nextPageLinkElement.classList.add("page-link")
    nextPageLinkElement.setAttribute("aria-label", "Next")
    nextPageLinkElement.onclick = () =>
      handleNextClick(pagesNum, category, price)
    nextPageLinkElement.innerHTML = `<span aria-hidden="true">&raquo;</span>`
    nextPageLinkItem.appendChild(nextPageLinkElement)

    ul.appendChild(prevPageLinkItem)

    for (let i = 0; i < pagesNum; i++) {
      const pageItem = document.createElement("li")
      pageItem.classList.add("page-item")
      const pageLinkElement = document.createElement("a")
      pageLinkElement.innerText = i + 1
      pageLinkElement.classList.add("page-link")
      pageLinkElement.onclick = (e) =>
        handlePageClick(e.target, i + 1, category, price)

      if ((currentPage === null && i === 0) || currentPage === i + 1) {
        pageLinkElement.classList.add("active")
      }

      pageItem.appendChild(pageLinkElement)
      ul.appendChild(pageItem)
    }

    ul.appendChild(nextPageLinkItem)
  }
}

function handlePageClick(el, pageNum, category, price) {
  const activePageLink = document.querySelector(".page-link.active")
  activePageLink && activePageLink.classList.remove("active")
  el.classList.add("active")
  if (category && price == null) {
    eventedPushState(
      { category_id: category, page_id: pageNum },
      "",
      `?category=${category}&page=${pageNum}`
    )
  } else if (category === null && price) {
    eventedPushState(
      { price, page_id: pageNum },
      "",
      `?price=${price}&page=${pageNum}`
    )
  } else if (category && price) {
    eventedPushState(
      { category_id: category, price, page_id: pageNum },
      "",
      `?category=${category}&price=${price}&page=${pageNum}`
    )
  } else {
    eventedPushState({ page_id: pageNum }, "", `?page=${pageNum}`)
  }
}

function handlePrevClick(category, price) {
  const page = Number(new URLSearchParams(document.location.search).get("page"))
  if (page > 1) {
    if (category && price === null) {
      eventedPushState(
        { category_id: category, page_id: page - 1 },
        "",
        `?category=${category}&page=${page - 1}`
      )
    } else if (category === null && price) {
      eventedPushState(
        { price: price, page_id: page - 1 },
        "",
        `?price=${price}&page=${page - 1}`
      )
    } else if (category && price) {
      eventedPushState(
        { category_id: category, price: price, page_id: page - 1 },
        "",
        `?category=${category}&price=${price}&page=${page - 1}`
      )
    } else {
      eventedPushState({ page_id: page - 1 }, "", `?page=${page - 1}`)
    }
  }
}

function handleNextClick(pagesNum, category, price) {
  const page =
    Number(new URLSearchParams(document.location.search).get("page")) || 1
  if (page < pagesNum) {
    eventedPushState(
      { category_id: category, page_id: page + 1 },
      "",
      `?category=${category}&page=${page + 1}`
    )
    if (category && price === null) {
    } else if (category === null && price) {
      eventedPushState(
        { price: price, page_id: page + 1 },
        "",
        `?price=${price}&page=${page + 1}`
      )
    } else if (category && price) {
      eventedPushState(
        { category_id: category, price: price, page_id: page + 1 },
        "",
        `?category=${category}&price=${price}&page=${page + 1}`
      )
    } else {
      eventedPushState({ page_id: page + 1 }, "", `?page=${page + 1}`)
    }
  }
}

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
