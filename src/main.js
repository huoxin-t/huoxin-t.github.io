// ---- 轮播组件 ----
document.querySelectorAll('.carousel').forEach(initCarousel)

function initCarousel(carousel) {
  const slides  = carousel.querySelectorAll('.carousel-slide')
  const prev    = carousel.querySelector('.carousel-prev')
  const next    = carousel.querySelector('.carousel-next')
  let dotsContainer = carousel.querySelector('.carousel-dots')
  let current   = 0
  let timer     = null

  if (slides.length < 2) {
    // 只有一张图时隐藏箭头和圆点
    if (prev) prev.style.display = 'none'
    if (next) next.style.display = 'none'
    if (dotsContainer) dotsContainer.style.display = 'none'
    return
  }

  // 根据图片数量自动生成圆点
  if (dotsContainer) {
    dotsContainer.innerHTML = ''
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('button')
      dot.className = 'carousel-dot' + (i === 0 ? ' carousel-dot--active' : '')
      dot.setAttribute('aria-label', `第${i + 1}张`)
      dot.addEventListener('click', (e) => { e.preventDefault(); go(i); resetTimer() })
      dotsContainer.appendChild(dot)
    }
  }

  function go(index) {
    slides[current].classList.remove('active')
    current = (index + slides.length) % slides.length
    slides[current].classList.add('active')
    updateDots()
  }

  function updateDots() {
    if (!dotsContainer) return
    dotsContainer.querySelectorAll('button').forEach((d, i) => {
      d.classList.toggle('carousel-dot--active', i === current)
    })
  }

  if (prev) prev.addEventListener('click', (e) => { e.preventDefault(); go(current - 1); resetTimer() })
  if (next) next.addEventListener('click', (e) => { e.preventDefault(); go(current + 1); resetTimer() })

  // 触摸滑动
  let startX = 0
  carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX })
  carousel.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) { go(current + (diff > 0 ? 1 : -1)); resetTimer() }
  })

  carousel.addEventListener('mouseenter', stopTimer)
  carousel.addEventListener('mouseleave', startTimer)

  function startTimer() { timer = setInterval(() => go(current + 1), 5000) }
  function stopTimer()  { clearInterval(timer) }
  function resetTimer() { stopTimer(); startTimer() }

  startTimer()
}
