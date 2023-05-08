const makeSlug = (title) => {
  return title.toLowerCase().split(" ").join("-")
}

const products = rawdata.filter((product) => product.productMedia.length > 0)
const imagesUrl = "https://storage.googleapis.com/luxe_media/wwwroot/"

const container = document.getElementById("product-container")

products.forEach((product) => {
  const productElement = document.createElement("a")

  const productImage = `<img src="${
    imagesUrl + product.productMedia[0].url
  }" alt="" class="product-image"/>`
  const productTitle = `<h2 class="product-title">${product.title}</h2>`
  const productPrice = `<p>$ ${product.price}</p>`
  const productContent = `<div class="product-content">${
    productTitle + productPrice
  }</div>`
  productElement.setAttribute("href", `./${makeSlug(product.title)}`)
  productElement.className = "product-card"

  productElement.innerHTML = productImage + productContent
  container.appendChild(productElement)
})
