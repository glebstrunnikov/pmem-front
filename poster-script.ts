import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sources = [
  { link: "http://pmem.ru/index.php?id=9809", slug: "gotman" },
  { link: "http://pmem.ru/index.php?id=9810", slug: "efimova" },
  { link: "http://pmem.ru/index.php?id=9811", slug: "chebykina" },
  { link: "http://pmem.ru/index.php?id=9812", slug: "dvornikova" },
  { link: "http://pmem.ru/index.php?id=9813", slug: "mochankina" },
  { link: "http://pmem.ru/index.php?id=9814", slug: "mayer" },
  { link: "http://pmem.ru/index.php?id=9815", slug: "lungrin" },
];

function htmlToRichTextBlocks(html) {
  const dom = new JSDOM(`<body>${html}</body>`);
  const document = dom.window.document;

  function walk(node, format?: any) {
    let chunks = [];

    node.childNodes.forEach((child, i) => {
      if (child.nodeType === child.TEXT_NODE) {
        const text = child.nodeValue.replace(/\s+/g, " "); // normalize whitespaces

        if (text.trim()) {
          chunks.push({
            type: "text",
            text,
            bold: format && format.bold ? true : undefined,
            italic: format && format.italic ? true : undefined,
          });
        }
      }

      if (child.nodeType === child.ELEMENT_NODE) {
        const nextFormat = {
          bold: (format && format.bold) || child.tagName === "B",
          italic: (format && format.italic) || child.tagName === "I",
        };

        chunks = chunks.concat(walk(child, nextFormat));
      }
    });
    return chunks;
  }

  return {
    type: "paragraph",
    children: walk(document.body),
  };
}

async function getContent(link, slug) {
  const url = link;
  console.log("initiating get");
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const ab = await res.arrayBuffer();
  const html = Buffer.from(ab).toString();
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const panel = document.querySelector("#postpanel2");
  const title = panel.querySelector(".capt").textContent;

  const pSet = Array.from(panel.querySelectorAll("p"));
  console.log("paragraphs received: " + pSet.length);
  const content = pSet
    .map((el: any) => {
      const html = el.innerHTML;
      return htmlToRichTextBlocks(html);
    })
    .filter((block) => block.children && block.children.length > 0);
  console.log("sent: " + content.length);
  return {
    data: {
      title,
      content,
      slug,
    },
  };
}

const write = async (link, slug) => {
  const strapiReqBody = await getContent(link, slug);
  fs.writeFileSync(
    path.join(__dirname, "req.json"),
    JSON.stringify(strapiReqBody)
  );
  const req = await fetch("https://pmem-europa.de/api/interviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(strapiReqBody),
  });
  console.log(req);
  return req;
};

for (const source of sources) {
  const report = await getContent(source.link, source.slug);
  const res = await write(source.link, source.slug);
  console.log(source.slug + ": " + res.statusText);
}

// await write(sources[0].link, sources[0].slug);

console.log("complete");
// for (const source of sources) {
//   const report = await getContent(source.link, source.slug);
//   console.log(source.slug + ": " + report.statusText);
// }
