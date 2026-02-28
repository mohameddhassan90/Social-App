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
export function changeTime(dateString) {
     if (!dateString) return "";

  const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);

  if (diff < 60) return diff + "s";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return minutes + "m";

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h";

  const days = Math.floor(hours / 24);
  return days + "d";
  }
