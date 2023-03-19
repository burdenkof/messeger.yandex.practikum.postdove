import { getPage } from "./route";



window.addEventListener("hashchange", () => changeHash())


 
const root = document.getElementById("root");

async function changeHash() {
  const str = document.location.hash
  const html = await getPage(str)
  root.innerHTML = html
  const form = document.form1
  if (form !== undefined) {
    form.addEventListener("submit", onSubmit, true);
  }
}
function onSubmit(event) {
  event.preventDefault();
  window.location.href = document.form1.action;
}
(async () => { await changeHash() })()
