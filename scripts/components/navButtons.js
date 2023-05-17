import { eventedPushState } from "../helpers.js"

export default function navButtons() {
  const buttonsContainer = document.createElement("div")
  buttonsContainer.classList.add("nav-buttons")

  const homeBtn = document.createElement("button")
  homeBtn.classList.add("nav-btn")
  homeBtn.innerText = "Home"
  homeBtn.onclick = handleGoHome
  buttonsContainer.appendChild(homeBtn)

  const backBtn = document.createElement("button")
  backBtn.classList.add("nav-btn")
  backBtn.innerText = "Back"
  backBtn.onclick = handleGoBack
  buttonsContainer.appendChild(backBtn)

  return buttonsContainer
}

function handleGoHome() {
  eventedPushState("./")
}

function handleGoBack() {
  history.back()
}
