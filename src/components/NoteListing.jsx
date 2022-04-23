export default function NoteListing(props) {
  return (
    <div className="note-card">
      <h3>{props.noteTitle}</h3>
      <p dangerouslySetInnerHTML={props.note}></p>
    </div>
  );
}
