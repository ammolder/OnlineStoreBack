const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const dateRegexp = /^(?:(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20)\d\d)?$/;
const phoneRegexp = /^[\+\d]?(?:[\d-.\s()]*)$/;

module.exports = { emailRegexp, dateRegexp, phoneRegexp };
