import { eventedPushState } from "./helpers.js"

/**
 *
 * @param {number} pagesNum
 * @param {number} currentPage
 */
export default function renderNavigation(
  pagesNum,
  currentPage,
  category,
  price
) {
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
    if (category && price === null) {
      eventedPushState(
        { category_id: category, page_id: page + 1 },
        "",
        `?category=${category}&page=${page + 1}`
      )
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
