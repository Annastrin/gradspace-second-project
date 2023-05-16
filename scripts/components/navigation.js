import { eventedPushState, navigate } from "../helpers.js"

/**
 *
 * @param {number} pagesNum
 * @param {number} currentPage
 */
export default function navigation(pagesNum, currentPage, category, price) {
  price = price ? String(price) : price

  const nav = document.createElement("nav")
  nav.setAttribute("aria-label", "Page navigation")

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
  nextPageLinkElement.onclick = () => handleNextClick(pagesNum, category, price)
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

  return nav
}

function handlePageClick(el, pageNum, category, price) {
  const activePageLink = document.querySelector(".page-link.active")
  activePageLink && activePageLink.classList.remove("active")
  el.classList.add("active")

  eventedPushState(navigate({ page: pageNum, category, price }))
}

function handlePrevClick(category, price) {
  const page = Number(new URLSearchParams(document.location.search).get("page"))
  if (page > 1) {
    eventedPushState(navigate({ page: page - 1, category, price }))
  }
}

function handleNextClick(pagesNum, category, price) {
  const page =
    Number(new URLSearchParams(document.location.search).get("page")) || 1
  if (page < pagesNum) {
    eventedPushState(navigate({ page: page + 1, category, price }))
  }
}
