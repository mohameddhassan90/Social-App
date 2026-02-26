export function changeDate(dateCreated) {
    const date = new Date(dateCreated);

    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();

    const formatted = `${day},${month},${year}`;
    return formatted;
  }