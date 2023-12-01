import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const COIN_INTERVAL_MIN = 2500
  const COIN_INTERVAL_MAX = 3000
  const worldElem = document.querySelector("[data-world]")
  
  let nextCactusTime
  export function setupCoin() {
    nextCoinTime = COIN_INTERVAL_MIN
    document.querySelectorAll("[data-coin]").forEach(coin => {
      coin.remove()
    })
  }
  
  export function updateCoin(delta, speedScale) {
    document.querySelectorAll("[data-coin]").forEach(coin => {
      incrementCustomProperty(coin, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(coin, "--left") <= -100) {
        coin.remove()
      }
    })
  
    if (nextCoinTime <= 0) {
      createCoin()
      nextCoinTime =
        randomNumberBetween(COIN_INTERVAL_MIN, COIN_INTERVAL_MAX) / speedScale
    }
    nextCoinTime -= delta
  }
  
  export function getCoinRects() {
    return [...document.querySelectorAll("[data-coin]")].map(coin => {
      return coin.getBoundingClientRect()
    })
  }
  
  function createcoin() {
    const coin = document.createElement("img")
    coin.dataset.coin = true
    coin.src = "img/coin.png"
    coin.classList.add("coin")
    setCustomProperty(coin, "--left", 100)
    worldElem.append(coin)
  }
  
  function randomNumberBetween(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min)
}