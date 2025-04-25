import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../../redux/users-reducer";
import { getUsersFilter } from "../../redux/users-selectors";
import { useSelector } from "react-redux";

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FriendFormType = "true" | "false" | "null";

type FormType = {
  term: string | null;
  friend: FriendFormType;
};

export const SearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
  const filter = useSelector(getUsersFilter);

  const searchFormValidate = (values: FormType) => {
    const errors = {};
    return errors;
  };

  const onSubmit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const filter: FilterType = {
      term: values.term,
      friend:
        values.friend === "null"
          ? null
          : values.friend === "true"
            ? true
            : false,
    };

    onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{
          term: filter.term,
          friend: String(filter.friend) as FriendFormType,
        }}
        validate={searchFormValidate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only friends</option>
              <option value="false">Only not subscribed users</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      ;
    </div>
  );
};
