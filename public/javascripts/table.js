
const tableHeader = document.getElementById("table-header")
const tableBody = document.getElementById("table-body")
const table = document.getElementById("table")

document.addEventListener("DOMContentLoaded", async () => {
  let data = await fetch("/all", { method: "GET" })
  let res = await data.json()

  if (res.length > 0) table.classList.remove("hidden")
  for (let i = 0; i < res.length; i++) {
    tableBody.insertAdjacentHTML("beforeend", `
      <tr>
        <th>${res[i].classname}</th>
        <th>${res[i].teacher}</th>
        <th>${res[i].fullname}</th>
        <th>${res[i].mark1}</th>
        <th>${res[i].mark2}</th>
        <th>${res[i].mark3}</th>
        <th>${res[i].mark4}</th>
      </tr>
    `)
  }
})