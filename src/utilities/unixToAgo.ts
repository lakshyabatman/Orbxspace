import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export const unixToAgo = (unix: number) => {
  const timeAgo = new TimeAgo("en-US");
  return timeAgo.format(new Date(unix * 1000));
};
