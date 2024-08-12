export const dateFormat = (d: string) => {
  if (d == "") {
    return "";
  }
  const newDate = new Date(d);
  const year = newDate.getFullYear() % 1000;
  const month = newDate.getMonth();
  const date = newDate.getDate();
  const day = newDate.getDay();
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    year +
    "/" +
    month +
    "/" +
    date +
    "(" +
    days[day] +
    ") " +
    hour +
    ":" +
    `${minute < 10 ? "0" : ""}` +
    minute
  );
};
