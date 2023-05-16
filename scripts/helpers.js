export const products = rawdata.filter(
  (product) => product.productMedia.length > 0
)

export const imagesUrl = "https://storage.googleapis.com/luxe_media/wwwroot/"

export function eventedPushState(state, title, url) {
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
