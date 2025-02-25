import s from "./LeftBar.module.css";

const Leftbar = () => {
  return (
    <nav className={s.leftBar}>
      <div className={s.item}>
        <a>Profile</a>
      </div>
      <div className={s.item}>
        <a>Messages</a>
      </div>
      <div className={s.item}>
        <a>Music</a>
      </div>
      <div className={s.item}>
        <a>News</a>
      </div>
    </nav>
  );
};

export default Leftbar;
