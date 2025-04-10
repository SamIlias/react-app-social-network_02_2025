import { Field, InjectedFormProps, reduxForm } from "redux-form";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { maxLengthValidatorCreator, required } from "../../../utils/validators";
import { Textarea } from "../../common/FormControl/FormControl";
import { PostType } from "../../../redux/profile-reducer";

const PROFILE_ADD_POST_FORM = "profileAddPost";

const maxLength15 = maxLengthValidatorCreator(15);

// Types ------------------------------------------------------
type MapStatePropsType = {
  posts: Array<PostType>;
};
type MapDispatchPropsType = {
  addPost: (newPostText: string, formName: string) => void;
};
type OwnPropsType = {};
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

type LoginFormValuesType = {
  newPostText: string;
};

// Form --------------------------------------------------------
const AddPostForm: React.FC<
  InjectedFormProps<LoginFormValuesType & OwnPropsType> & OwnPropsType
> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newPostText"
          className={s.textarea}
          placeholder="Write your post here..."
          validate={[required, maxLength15]}
        />
      </div>
      <div>
        <button className={s.button}>Add post</button>;
      </div>
    </form>
  );
};

const AddPostReduxForm = reduxForm<LoginFormValuesType, OwnPropsType>({
  form: PROFILE_ADD_POST_FORM,
})(AddPostForm);

// MyPost component --------------------------------------------
const MyPosts: React.FC<PropsType> = ({ posts, addPost }) => {
  const postsList = posts.map((post) => (
    <Post key={post.id} postText={post.text} /> //todo add post.id
  ));

  const onSubmit = (values: LoginFormValuesType) => {
    addPost(values.newPostText, PROFILE_ADD_POST_FORM);
  };

  return (
    <div className={s.posts}>
      <h2>My posts</h2>
      <AddPostReduxForm onSubmit={onSubmit} />
      {postsList}
    </div>
  );
};

export default MyPosts;
