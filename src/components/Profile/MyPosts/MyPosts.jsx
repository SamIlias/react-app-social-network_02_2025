import { Field, reduxForm } from "redux-form";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { maxLengthValidatorCreator, required } from "../../../utils/validators";
import { Textarea } from "../../common/FormControl/FormControl";

const PROFILE_ADD_POST_FORM = "profileAddPost";

const maxLength15 = maxLengthValidatorCreator(15);

const MyPosts = ({ posts, addPost }) => {
  const postsList = posts.map((post) => (
    <Post key={post.id} postText={post.text} /> //todo add post.id
  ));

  const onSubmit = (values) => {
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

const AddPostForm = ({ handleSubmit }) => {
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

const AddPostReduxForm = reduxForm({ form: PROFILE_ADD_POST_FORM })(
  AddPostForm,
);

export default MyPosts;
