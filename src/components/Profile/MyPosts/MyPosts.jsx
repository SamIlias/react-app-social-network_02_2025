import { Field, reduxForm } from "redux-form";
import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";
import {
  maxLengthValidatorCrerator,
  requared,
} from "../../../utils/validators.js";
import { Textarea } from "../../common/FormControl/FormControl.js";

const maxLength15 = maxLengthValidatorCrerator(15);

const MyPosts = (props) => {
  const posts = props.posts.map((post) => <Post postText={post.text} />);

  const addPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.posts}>
      <h2>My posts</h2>
      <AddPostReduxForm onSubmit={addPost} />
      {posts}
    </div>
  );
};

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newPostText"
          className={s.textarea}
          placeholder="Write your post here..."
          validate={[requared, maxLength15]}
        />
      </div>
      <div>
        <button className={s.button}>Add post</button>;
      </div>
    </form>
  );
};

const AddPostReduxForm = reduxForm({ form: "ProfileAddPost" })(AddPostForm);

export default MyPosts;
