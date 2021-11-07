
const btn = document.getElementById("sendButton")
const inputs = document.getElementsByTagName("input")
const form = document.getElementsByTagName("form")
const formErrors = document.querySelector(".form__errors")

const mainForm = document.forms.main

const createError = (node, text) => {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild)
  }
  node.insertAdjacentHTML("afterbegin", text)
}

mainForm.addEventListener("submit", event => {
  let data = new Set()

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].classList.contains("form-input-mark")) {
      if (Number.isNaN(parseInt(inputs[i].value))) data[inputs[i].id] = 5
      else data[inputs[i].id] = parseInt(inputs[i].value)
    }
    else data[inputs[i].id] = inputs[i].value
  }

  Object.keys(data).map(item => {
    if (item == "teacher" && data[item].length == 0) {
      event.preventDefault();
      createError(formErrors, "<p>Введите имя учителя</p>")
    }
    else if (item == "classname" && data[item].length == 0) {
      event.preventDefault();
      createError(formErrors, "<p>Введите название класса</p>")
    }
    else if (item == "firstname" && data[item].length == 0) {
      event.preventDefault();
      createError(formErrors, "<p>Введите ваше имя</p>")
    }
    else if (item == "lastname" && data[item].length == 0) {
      event.preventDefault();
      createError(formErrors, "<p>Введите вашу фамилию</p>")
    }
  })
})