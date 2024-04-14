import React from "react";
import { Formik, Form, Field } from "formik";
import { LoginValidation } from "../../auth/LoginValidation";
import image from "../../assets/images/kelly-sikkema-IkHwu5xLXxs-unsplash.jpg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/user_service";
import { toast } from "react-toastify";
import { doLogin } from "../../auth";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    loginUser(values)
      .then((resp) => {
        doLogin(resp,()=>{
            navigate("/feed");
        });
        toast.success("login successfully");
      })
      .catch((error) => {
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
  };
  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-center items-center w-full bg-cover"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPositionY: "17%",
        }}>
        <div className="my-3 w-[90%] sm:w-[400px] md:[500px] px-4 py-6 bg-gray-200 rounded-lg shadow-md">
          <h1 className="text-red-600 text-xl text-center mb-6">
            Log In Here!
          </h1>
          {/* form section */}
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginValidation}
            onSubmit={(values) => handleSubmit(values)}>
            {({ errors, touched }) => (
              <Form>
                <label className="pl-2" htmlFor="email">
                  Email
                </label>
                <Field
                  className="w-full py-2 px-4 rounded-xl text-sm sm:text-base border border-gray-400 mb-2"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                />
                {errors.email && touched.email ? (
                  <div className="text-sm text-red-600 pl-4">
                    {errors.email}
                  </div>
                ) : null}
                <label className="pl-2" htmlFor="password">
                  Password
                </label>
                <Field
                  className="w-full py-2 px-4 rounded-xl text-sm sm:text-base border border-gray-400 mb-2"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                />
                {errors.password && touched.password ? (
                  <div className="text-sm text-red-600 pl-4">
                    {errors.password}
                  </div>
                ) : null}

                <div className="text-center">
                  <button
                    className="bg-green-600 text-white hover:scale-105 hover:bg-green-500 duration-300 rounded-full px-4 py-2"
                    type="submit">
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-3">
            <p className="text-sm">
              Not an account?{" "}
              <Link className="text-blue-700 font-medium" to="/signup">
                Create Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
