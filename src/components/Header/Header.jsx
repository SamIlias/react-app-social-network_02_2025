import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s.header}>
      <img src="https://i.redd.it/p2ami7lbck681.jpg" alt="logo" />
      <span>User name</span>
    </header>
  );
};

export default Header;
