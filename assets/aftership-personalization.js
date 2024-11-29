function debounce(fn, delay) {
  let timer
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

const getRecommendationId = () => {
  if (!window['pz-recommendations']) {
    return
  }
  const widget = document.querySelector('div[data-personalization-id]')
  if (!widget) {
    return
  }
  return widget.dataset.personalizationId
}

const removeRecommendation = async () => {
  const offerId = getRecommendationId()
  if (!offerId) {
    return
  }
  window['pz-recommendations'].remove(offerId)
}

const initRecommendation = () => {
  const offerId = getRecommendationId()
  if (!offerId) {
    return
  }
  window['pz-recommendations'].initialRecommendation(offerId)
}

const fetchCartData = async () => {
  const response = await fetch((window.Shopify?.routes?.root ?? '/') + 'cart.js')
  const data = await response.json()
  return data
}

const init = () => {
  let count = 0
  const callback = (event) => {
    count++
    const snapshot = count
    removeRecommendation()
    fetchCartData().then(data => {
      if (data.item_count && snapshot === count) {
        initRecommendation()
      }
    })
  }

  const timer = setInterval(() => {
    if (window.subscribe) {
      window.subscribe('cart-update', debounce(callback, 100))
      clearInterval(timer)
    }
  }, 100)

  document.addEventListener('apz:added', async () => {
    const cartData = await fetchCartData()
    window.publish?.('cart-update', {
      source: "aftership-personalization",
      cartData,
    })
  })
}

init()