import * as cheerio from "cheerio";

const extractRawDataOfWebsite = (data) => {
  console.log("function called");
  const $ = cheerio.load(data);
   const cssLinks = [];
  $('link[rel~="stylesheet"]').each((_, el) => {
    console.log("LINK TAG:", $(el).attr("rel"), $(el).attr("href"))
    const href = $(el).attr("href");
    if (href) cssLinks.push(href);
  });

  // ✅ JS
  const jsLinks = [];
  $("script[src]").each((_, el) => {
    const src = $(el).attr("src");
    if (src) jsLinks.push(src);
  });

  console.log(jsLinks);
};

export default extractRawDataOfWebsite;
