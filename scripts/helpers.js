export const products = rawdata.filter(
  (product) => product.productMedia.length > 0
)

export const imagesUrl = "https://storage.googleapis.com/luxe_media/wwwroot/"

export function eventedPushState(url) {
  const state = {}
  const title = ""
  const pushChangeEvent = new CustomEvent("onpushstate", {
    detail: {
      state,
      title,
      url,
    },
  })
  document.dispatchEvent(pushChangeEvent)
  return history.pushState(state, title, url)
}

export function navigate({ page, category, price }) {
  const newLocation = new URLSearchParams()
  if (category) {
    newLocation.append("category", category)
  }
  if (price) {
    newLocation.append("price", price)
  }
  if (page) {
    newLocation.append("page", page)
  }

  if (newLocation.toString().length === 0) {
    return "./"
  }
  return `?${newLocation.toString()}`
}
