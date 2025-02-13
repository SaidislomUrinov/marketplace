import moment from "moment";
const getNow = () => moment.now() / 1000;
const formatDate = (unix, format = 'DD.MM.YYYY | HH:mm') => moment.unix(unix).format(format);

export {getNow, formatDate}