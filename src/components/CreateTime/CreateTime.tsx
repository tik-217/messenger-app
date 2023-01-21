export default function CreateTime({
  timeString,
}: {
  timeString: string | boolean;
}) {
  function timeOutput() {
    if (typeof timeString === "boolean") return;

    const date = timeString && new Date(timeString);
    return date && date.toLocaleTimeString().slice(0, 5);
  }

  return (
    <>
      {timeString === false ? (
        <>
          <i className="fa fa-circle online"></i> online
        </>
      ) : (
        <>
          <i className="fa fa-circle offline"></i> offline since {timeOutput()}
        </>
      )}
    </>
  );
}
