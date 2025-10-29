import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sources = [
  //   { link: "http://pmem.ru/index.php?id=9807", slug: "ade" },
  //   { link: "http://pmem.ru/index.php?id=9808", slug: "yanke" },
  { link: "http://pmem.ru/index.php?id=9809", slug: "gotman" },
  { link: "http://pmem.ru/index.php?id=9810", slug: "efimova" },
  { link: "http://pmem.ru/index.php?id=9811", slug: "chebykina" },
  { link: "http://pmem.ru/index.php?id=9812", slug: "dvornikova" },
  { link: "http://pmem.ru/index.php?id=9813", slug: "mochankina" },
  { link: "http://pmem.ru/index.php?id=9814", slug: "mayer" },
  { link: "http://pmem.ru/index.php?id=9815", slug: "lungrin" }
];

function htmlToRichTextBlocks(html) {
  const dom = new JSDOM(`<body>${html}</body>`);
  const document = dom.window.document;

  function walk(node, format = { bold: false, italic: false }) {
    let chunks = [];

    node.childNodes.forEach((child) => {
      if (child.nodeType === child.TEXT_NODE) {
        const text = child.nodeValue.replace(/\s+/g, " "); // normalize whitespaces

        if (text.trim()) {
          chunks.push({
            type: "text",
            text,
            ...(format.bold ? { bold: true } : {}),
            ...(format.italic ? { italic: true } : {})
          });
        }
      }

      if (child.nodeType === child.ELEMENT_NODE) {
        const nextFormat = {
          bold: format.bold || child.tagName === "B",
          italic: format.italic || child.tagName === "I"
        };

        chunks = chunks.concat(walk(child, nextFormat));
      }
    });
    return chunks;
  }

  return {
    type: "paragraph",
    children: walk(document.body)
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
  const content = pSet.map((el: any) => {
    const html = el.innerHTML; // cache once

    // return {
    //   type: "paragraph",
    //   children: [
    //     {
    //       type: "text",
    //       text: el.textContent,

    //       bold: /<b>...+?<\/b>/i.test(html),
    //       italic: html.indexOf("<i>") >= 0
    //     }
    //   ]
    // };
    return htmlToRichTextBlocks(html);
  });

  const testContent = [
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          text: "29.11.2024"
        }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          text: "Справка",
          bold: true,
          italic: true
        },
        {
          type: "text",
          text: "Справка",
          italic: true
        }
      ]
    }
  ];

  const strapiReqBody = {
    data: {
      title,
      content: testContent,
      slug
    }
  };
  fs.writeFileSync(path.join(__dirname, "req.json"), JSON.stringify(strapiReqBody));
  const req = await fetch("https://pmem-europa.de/api/interviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(strapiReqBody)
  });
  console.log(req);
  return req;
}

getContent("http://pmem.ru/index.php?id=9808", "yankeee");

// for (const source of sources) {
//   const report = await getContent(source.link, source.slug);
//   console.log(source.slug + ": " + report.statusText);
// }
