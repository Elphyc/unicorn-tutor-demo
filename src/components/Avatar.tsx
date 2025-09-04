import unicornGirl from "../assets/unicorn girl.svg";

function Avatar() {
  return (
    <img
      className="avatar-image"
      src={unicornGirl}
      alt="Unicorn avatar"
      draggable={false}
    />
  );
}

export default Avatar;

