const moment = require("moment");

module.exports = {
  formatDate: function (date) {
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  },
};
