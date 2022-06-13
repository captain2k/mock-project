const calculateComponentHeight = (selector) => {
  const component = document.querySelector(selector)
  return component?.getBoundingClientRect().height
}

export default calculateComponentHeight
