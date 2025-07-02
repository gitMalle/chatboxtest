import markdownit from "markdown-it";

const md = markdownit({ html: true, linkify: true, typographer: true });

export { md };
