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