import { TIMEOUT_SEC } from '../config';

function timeout(s) {
   return new Promise((_, reject) => {
      setTimeout(() => {
         reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
   });
}
async function AJAX(url, uploadData = undefined) {
   const fetchPro = uploadData
      ? fetch(url, {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json',
           },
           body: JSON.stringify(uploadData),
        })
      : fetch(url);

   const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
   const data = await res.json();

   if (!res.ok) throw new Error(`${data.message} (${res.status})`);
   return data;
}
export async function fetchDataAsJSON(url) {
   return AJAX(url);
}
export async function uploadDataAsJSON(url, data) {
   return AJAX(url, data);
}
