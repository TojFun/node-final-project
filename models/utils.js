function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

const notForCapitalization = [
  "and",
  "as",
  "as if",
  "as long as",
  "at",
  "but",
  "by",
  "even if",
  "for",
  "from",
  "if",
  "if only",
  "in",
  "into",
  "like",
  "near",
  "now that",
  "nor",
  "of",
  "off",
  "on",
  "on top of",
  "once",
  "onto",
  "or",
  "out of",
  "over",
  "past",
  "so",
  "so that",
  "than",
  "that",
  "till",
  "to",
  "up",
  "upon",
  "with",
  "when",
  "ye",
];

const titleCase = (str) =>
  str
    .replace(/-/g, " ")
    .replace(/\w\S*/g, (txt) =>
      notForCapitalization.includes(txt.toLowerCase())
        ? txt.toLowerCase()
        : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

module.exports = { camelCase, titleCase };
