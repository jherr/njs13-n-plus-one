const cheerio = require("cheerio");

const convertToKb = (size) => {
  const kb = size / 1024;
  if (kb > 1024) {
    return `${(kb / 1024).toFixed(2)} MB`;
  }
  return `${kb.toFixed(2)} KB`;
};

const percent = (pct) => `${(pct * 100).toFixed(1)}%`;

const newAttribues = new Set();

(async () => {
  const htmlReq = await fetch(process.argv[2]);
  const html = await htmlReq.text();

  const totalSize = html.length;

  let clientData = 0;
  const addAttibutes = (node) => {
    if (node && node.length === 4) {
      Object.keys(node[3]).forEach((key) => {
        if (key === "children") {
          if (node[3].children?.length !== 4) {
            node[3].children.forEach((child) => {
              addAttibutes(child);
            });
          } else {
            addAttibutes(node[3].children);
          }
        } else {
          if (
            ![
              "data-theme",
              "className",
              "0",
              "assetPrefix",
              "initialCanonicalUrl",
              "initialTree",
              "initialHead",
              "globalErrorComponent",
              "notFound",
              "asNotFound",
              "lang",
              "className",
              "parallelRouterKey",
              "segmentPath",
              "error",
              "errorStyles",
              "loading",
              "loadingStyles",
              "hasLoading",
              "template",
              "templateStyles",
              "notFoundStyles",
              "childProp",
              "src",
              "alt",
              "width",
              "height",
            ].includes(key)
          ) {
            if (!newAttribues.has(key)) {
              console.log(`Found client data key: ${key}`);
              newAttribues.add(key);
            }
            clientData += JSON.stringify(node[3][key]).length;
          }
        }
      });
    }
  };

  const $ = cheerio.load(html);
  let scriptSize = 0;
  $("script").each((i, el) => {
    const scriptText = $(el).text();
    scriptSize += scriptText.length;
    if (scriptText.startsWith('self.__next_f.push([1,"')) {
      try {
        const mainScriptBlock = scriptText
          .replace("self.__next_f.push(", "")
          .replace(/\)$/, "");
        const data = eval(mainScriptBlock);
        const dataBlock = JSON.parse(data[1].replace(/^([A-Za-z0-9]+)+:/, ""));
        addAttibutes(dataBlock);
      } catch (e) {
        // console.log(e);
        // console.log(scriptText);
      }
    }
  });

  console.log(process.argv[2]);
  console.log(
    `            HTML: ${convertToKb(totalSize - scriptSize)} - ${percent(
      (totalSize - scriptSize) / totalSize
    )}`
  );
  console.log(
    `            JSON: ${convertToKb(scriptSize)} - ${percent(
      scriptSize / totalSize
    )}`
  );
  console.log(
    `JSON Client Data: ${convertToKb(clientData)} - ${percent(
      clientData / scriptSize
    )}`
  );
})();
