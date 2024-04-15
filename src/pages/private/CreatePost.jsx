import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { CreatePostValidation } from "../../auth/PostValidation";
import JoditEditor from "jodit-react";
import { loadAllCategories } from "../../services/category_service";
import { createPost } from "../../services/post_service";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllCategories()
      .then(({data}) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  const submitPost = ({category, title, content}) => {
    const body = {title, content};
    createPost(category, body)
        .then(() => {
            toast.success('New post created');
        })
        .catch((error) => {
            console.log(error);
        });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg border shadow shadow-gray-100 p-8 m-3 w-4/5 sm:w-[400px] md:w-[500px] lg:w-[600px]">
        <h3 className="text-2xl font-medium text-center sm:mt-5 mb-3 underline">
          Create Post
        </h3>
        <div className="">
          <Formik
            initialValues={{
              title: "",
              content: "",
              category: "",
            }}
            validationSchema={CreatePostValidation}
            onSubmit={(values) => {
              submitPost(values);
            }}>
            {({ values, errors, touched }) => (
              <Form>
                <label htmlFor="title">Title</label>
                <Field
                  className="w-full py-2 px-4 rounded-xl text-sm sm:text-base border border-gray-400 mb-2"
                  id="title"
                  name="title"
                  placeholder="Title for post"
                />
                {errors.title && touched.title && (
                  <div className="text-sm text-red-600 pl-4 w-fit">
                    {errors.title}
                  </div>
                )}

                <label htmlFor="category">Category</label>
                <Field
                  className="w-full py-2 px-4 rounded-xl text-sm sm:text-base border border-gray-400 mb-2"
                  as="select"
                  id="category"
                  name="category">
                  <option className="rounded h-6" value="">
                    __Select an Option__
                  </option>
                  {
                    categories.map((category)=>(
                        <option key={category.categoryId} value={category.categoryId} >{category.categoryTitle}</option>
                    ))
                  }
                </Field>
                {errors.category && touched.category && (
                  <div className="text-sm text-red-600 pl-4 w-fit">
                    {errors.category}
                  </div>
                )}

                <label htmlFor="content">Content</label>
                <JoditEditor
                  id="content"
                  name="content"
                  value={values.content}
                  tabIndex={1}
                  onChange={(newContent) => {values.content= newContent;}}
                />
                {errors.content && touched.content && (
                  <div className="text-sm text-red-600 pl-4 w-fit">
                    {errors.content}
                  </div>
                )}

                <button
                  className="mt-2 bg-green-600 text-white hover:scale-105 hover:bg-green-500 duration-300 rounded-full px-4 py-2"
                  type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      </div>
    </>
  );
};

export default CreatePost;
