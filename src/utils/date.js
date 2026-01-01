import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/id";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
// dayjs.locale("id");

export const formatDateTime = (date) => {
  return dayjs(date).format("D MMM YYYY • HH:mm");
};

export const fromNow = (date) => {
  return dayjs(date).fromNow();
};