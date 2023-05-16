import eventedPushState from "./helpers.js"
const imagesUrl = "https://storage.googleapis.com/luxe_media/wwwroot/"

export default function renderProducts(products) {
  const content = document.getElementById("main-content")

  const productsContainer = document.createElement("div")
  productsContainer.classList.add("product-container", "row")
  content.appendChild(productsContainer)

  if (products.length > 0) {
    productsContainer.classList.add(
      "row-cols-1",
      "row-cols-sm-2",
      "row-cols-lg-4"
    )

    products.forEach((product) => {
      const productElement = document.createElement("div")
      productElement.className = "col"

      const productCard = document.createElement("a")
      productCard.classList.add("product-card")
      productCard.onclick = () => handleProductCardClick(product.prodId)
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${
            imagesUrl + product.productMedia[0].url
          }" alt="" class="product-image"/>
        </div>
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">$ ${product.price}</p>
      `
      productElement.appendChild(productCard)
      productsContainer.appendChild(productElement)
    })
  } else {
    const noProducts = document.createElement("div")
    noProducts.classList.add("col")
    noProducts.innerHTML = `<p class="no-products-found">Nothing found :(</p>`
    productsContainer.appendChild(noProducts)
  }
}

function handleProductCardClick(productId) {
  eventedPushState({ product_id: productId }, "", `?product=${productId}`)
}
