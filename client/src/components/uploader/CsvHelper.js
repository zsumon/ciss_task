const Papa = require('papaparse');

function __parse(text) {
  const split = text.split(/\n/);
  const allHeadings = split[0].split(/,/);

  let content = [];
  for (let i = 1; i < split.length; i++) {
    if (split[i].trim() !== "")
      content.push(split[i]);
  }
  const ret = [];
  for (let i = 0; i < content.length; i++) {
    const it = content[i].split(/,/);
    ret.push({
      manufacturer: it[0],
      model: it[1],
      year: it[2],
      producing_country: it[3]
    });
  }
  return ret;
}


module.exports = {__parse}