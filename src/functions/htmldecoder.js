const encodeConverter = (encodedString = "") => {
  console.info("encodedString", encodedString)
  const translate_re = /&(nbsp|amp|quot|lt|gt);/g
  const translate = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    lt: "<",
    gt: ">",
  }
  return encodedString
    .replace(translate_re, function (match, entity) {
      return translate[entity]
    })
    .replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec)
    })
}

export const htmlDecode = (content) => {
  return content
}

export default encodeConverter
