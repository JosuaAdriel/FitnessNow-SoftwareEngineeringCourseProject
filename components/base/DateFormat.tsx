import React from "react";

const DateFormat = ({ date }: any) => {
  const inputDate = new Date(date);

  const formattedDate = inputDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <div>{formattedDate}</div>;
};

export default DateFormat;
