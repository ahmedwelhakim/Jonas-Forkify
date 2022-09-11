export async function fetchDataAsJSON(url) {
   const res = await fetch(url);
   const data = await res.json();
   if (!res.ok) throw new Error(`${data.message} (${res.status})`);
   return data;
}

export default { fetchDataAsJSON };
