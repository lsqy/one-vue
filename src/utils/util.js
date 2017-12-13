const getAuthor = desc => desc && desc.split(' ')[0];

const formatDate = date => date.split(' ')[0].split('-').join('/');

const $ = (str) => {
  const char = str.charAt(0);
  if (char === '#') {
    return document.getElementById(str.slice(1));
  } else if (char === '.') {
    return document.getElementsByClassName(str.slice(1));
  }
  return document.getElementsByTagName(str);
};

export default {
  getAuthor,
  formatDate,
  $,
};

