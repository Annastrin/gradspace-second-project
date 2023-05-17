import navButtons from "../components/navButtons.js"

export default function pageNotFound() {
  const content = document.getElementById("main-content")
  const pageNotFoundContainer = document.createElement("div")
  content.appendChild(pageNotFoundContainer)

  pageNotFoundContainer.classList.add("container", "text-center")
  const navButtonsElement = navButtons()
  navButtonsElement.classList.add("mb-4")
  pageNotFoundContainer.appendChild(navButtonsElement)

  const pageNotFoundContent = document.createElement("p")
  pageNotFoundContent.innerText = "Page Not Found :("
  pageNotFoundContainer.appendChild(pageNotFoundContent)
}
