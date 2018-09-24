const menuTrigger = document.getElementById('menu_trigger')
const menu = document.getElementById('main-nav')
menuTrigger.addEventListener('click', () => {
  menuTrigger.classList.toggle('open')
  menu.classList.toggle('open')
})
