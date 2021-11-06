
const btn = document.getElementById("sendButton")
const inputs = document.getElementsByTagName("input")
const form = document.getElementsByTagName("form")

const mainForm = document.forms.main

// mainForm.addEventListener("submit", event => {
//   // event.preventDefault();

//   let data = new Set()

//   for (let i = 0; i < inputs.length; i++) {
//     console.log(inputs[i].id);
//     data[inputs[i].id] = inputs[i].value
//   }

//   fetch("/create", { method: "POST", body: data })
// })