
async function apiGetData(){
  const r = await fetch("api/data", { cache: "no-store" });
  if(!r.ok) throw new Error("Không tải được dữ liệu: " + r.status);
  return await r.json();
}
async function apiCreateCategory(name, folderPath){
  const r = await fetch("api/category/create", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ name, folderPath })
  });
  if(!r.ok) throw new Error(await r.text());
  return await r.json();
}
async function apiCreatePost(formData){
  const r = await fetch("api/post/create", { method:"POST", body: formData });
  if(!r.ok) throw new Error(await r.text());
  return await r.json();
}
function downloadExportZip(){
  window.location.href = "api/export/zip";
}


async function apiDeleteCategory(folderPath, opts){
  opts = opts || {};
  const r = await fetch("api/category/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folderPath, slug: opts.slug || null, cascade: !!opts.cascade, deleteFolder: !!opts.deleteFolder })
  });
  if(!r.ok) throw new Error(await r.text());
  return await r.json();
}


async function apiSetCategoryReadonly(folderPath, readonly){
  const r = await fetch("api/category/readonly", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ folderPath, readonly: !!readonly }) });
  if(!r.ok) throw new Error(await r.text());
  return await r.json();
}


async function apiSetPostReadonly(id, readonly){
  const r = await fetch("api/post/readonly", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ id, readonly: !!readonly }) });
  if(!r.ok) throw new Error(await r.text());
  return await r.json();
}


async function apiDeletePost(id, opts){
  opts = opts || {};
  const r = await fetch("api/post/delete", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ id, deleteFile: !!opts.deleteFile }) });
  if(!r.ok) throw new Error(await r.text());
  return await r.json();
}


async function apiUpdatePost(payload){
  const r = await fetch("api/post/update", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
  if(!r.ok) throw new Error(await r.text());
  return await r.json();
}


async function apiEditPost(formData){
  const r = await fetch("api/post/edit", { method:"POST", body: formData });
  if(!r.ok) throw new Error(await r.text());
  return await r.json();
}
