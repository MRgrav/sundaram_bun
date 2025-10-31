// // src/lib/sanitize.ts
// // import createDOMPurify from "dompurify";
// // import { JSDOM } from "jsdom";

// const window = new createCssJsxDomObjects("").window as unknown as Window;
// const DOMPurify = createDOMPurify(window);

// export function sanitizeHtml(html: string) {
//   return DOMPurify.sanitize(html, {
//     ALLOWED_TAGS: DOMPurify.getDefaultWhiteList?.() ? undefined : undefined,
//     ALLOWED_ATTR: ["href", "title", "src", "alt", "class", "target", "rel", "loading"],
//   });
// }
