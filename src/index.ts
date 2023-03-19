import { getPage } from "./route";

type Nullable<T> = T | null;

window.addEventListener("hashchange", () => changeHash())


 
const root: Nullable<HTMLDivElement> = document.getElementById('root') as HTMLDivElement;

async function changeHash() {
  if(root === null) return
  const str = document.location.hash
  const html = await getPage(str)
  root.innerHTML = html
  const form: Nullable<HTMLFormElement> = document.getElementById('form1') as HTMLFormElement
  if (form !== undefined) {
    form.addEventListener("submit", onSubmit, true);
  }
}
function onSubmit(event: Event) {
  event.preventDefault();
  const form: Nullable<HTMLFormElement> = document.getElementById('form1') as HTMLFormElement
  window.location.href = form.action;
}
(async () => { await changeHash() })()
