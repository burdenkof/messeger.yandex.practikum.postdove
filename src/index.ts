import { getPage } from "./route";
import { Nullable } from "./utils/renderDOM";



window.addEventListener("hashchange", () => changeHash())



const root: Nullable<HTMLDivElement> = document.getElementById('root') as HTMLDivElement;

async function changeHash() {
  if (root === null) return
  const str = document.location.hash
  await getPage(str, root)
}

(async () => { await changeHash() })()
