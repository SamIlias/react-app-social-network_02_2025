import style from "../Messages.module.css";

type PropsType = {
  itemData: {
    image?: string;
    message: string;
  };
};

const MessagesItem: React.FC<PropsType> = ({ itemData }) => {
  return (
    <div className={`${style.message}`}>
      <img src={`${itemData.image}`} alt="ava" />
      {itemData.message}
    </div>
  );
};

export default MessagesItem;
