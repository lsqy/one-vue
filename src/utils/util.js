const getAuthor = desc => desc && desc.split(' ')[0];

const formatDate = date => date.split(' ')[0].split('-').join('/');

export default {
  getAuthor,
  formatDate,
};

