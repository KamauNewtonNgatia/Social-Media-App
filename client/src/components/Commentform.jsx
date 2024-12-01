import { MdSend } from "react-icons/md";

const Comment = () => {
  const formStyle = {
    display: "flex",
    width: "90%",
    margin: "auto",
  };

  return (
    <>
      <form style={formStyle}>
        <textarea
          style={{ width: "100%", padding: ".2rem" }}
          placeholder="send comment..."
        />
        <button type="button">
          <MdSend style={{ fontSize: "1.5rem" }} />
        </button>
      </form>
    </>
  );
};
export default Comment;
