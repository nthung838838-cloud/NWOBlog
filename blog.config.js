// blog.config.js (server-backed) - giữ format cũ để các trang tĩnh dùng được
// NOTE: dùng sync XHR để đảm bảo BLOG_CONFIG có trước khi script inline trong index.html chạy.
(function () {
  function xhrGetJsonSync(url) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, false); // sync
      xhr.setRequestHeader("Cache-Control", "no-store");
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        return JSON.parse(xhr.responseText);
      }
    } catch (e) {}
    return null;
  }

  // dùng URL tương đối để chạy dưới /Blog/ hoặc root
  var data = xhrGetJsonSync("api/data") || { categories: [], posts: [] };

  var catsRaw = (data.categories || []);

  var cats = catsRaw.map(function (c) {
    return {
      id: c.slug || c.folder || c.name,
      name: c.name || c.folder || c.slug,
      slug: c.slug || (c.folder || c.name || ""),
      folder: c.folder || "",
      readonly: !!c.readonly
    };
  });

  function findCatBySlug(slug) {
    slug = String(slug || "").toLowerCase();
    for (var i = 0; i < catsRaw.length; i++) {
      var c = catsRaw[i];
      if (String(c.slug || "").toLowerCase() === slug) return c;
    }
    return null;
  }

  function findCatByFolder(folder) {
    folder = String(folder || "").toLowerCase();
    for (var i = 0; i < catsRaw.length; i++) {
      var c = catsRaw[i];
      if (String(c.folder || "").toLowerCase() === folder) return c;
    }
    return null;
  }

  function catFolderFromPost(p) {
    // ưu tiên categorySlug
    var c = findCatBySlug(p.categorySlug);
    if (c) return c.folder || c.slug || "";
    // fallback: post có categoryFolder / category (folder cũ)
    return p.categoryFolder || p.category || p.categorySlug || "";
  }

  function catSlugFromPost(p, folder) {
    if (p.categorySlug) return p.categorySlug;
    var c = findCatByFolder(folder);
    return c ? (c.slug || "") : "";
  }

  function catNameFromPost(p, slug, folder) {
    if (p.category) return p.category;
    var c = findCatBySlug(slug) || findCatByFolder(folder);
    return c ? (c.name || c.folder || c.slug) : "";
  }

  var posts = (data.posts || []).map(function (p) {
    var folder = catFolderFromPost(p);
    var slug = catSlugFromPost(p, folder);
    var name = catNameFromPost(p, slug, folder);

    var out = {
      id: p.id,
      title: p.title,
      category: folder,         // để tương thích code cũ
      categorySlug: slug,       // để filter theo chủ đề
      categoryName: name,
      type: p.type || "article",
      tags: p.tags || [],
      readonly: !!p.readonly
    };

    if (out.type === "docx") out.docx = p.docx;
    if (out.type === "video") { out.video = p.video; if (p.description) out.description = p.description; }
    if (out.type === "pdf") out.pdf = p.pdf || p.path || "";
    if (out.type === "article") out.url = p.url || p.htmlUrl || p.path || "";
    return out;
  });

  window.BLOG_CONFIG = { categories: cats, posts: posts };
})();
