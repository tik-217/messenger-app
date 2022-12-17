export function getCompanionId(
  e: React.MouseEvent<HTMLLIElement>,
  setCompanionId: React.Dispatch<React.SetStateAction<number>>,
  setOpenDialog?,
  setSearchText?
) {
  const divCompanion = e.target as HTMLAnchorElement | HTMLImageElement;

  if (divCompanion.tagName === "IMG" || divCompanion.tagName === "A") {
    let userId = (divCompanion.parentNode as HTMLDivElement).attributes[1]
      .value;

    setCompanionId(+userId);
    setSearchText("");
  }
  setOpenDialog(true);
}

export function changeTimeView(createdAt: string) {
  const date = new Date(createdAt);

  const dateString = `${date.getHours()}:${date.getMinutes()}, ${date.toLocaleString(
    "en-us",
    { weekday: "long" }
  )}`;

  return dateString;
}
