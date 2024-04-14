import React from "react";
import { Formik, Form, Field } from "formik";
import { SignUpValidation } from "../../auth/SignUpValidation";
import image from "../../assets/images/kelly-sikkema-IkHwu5xLXxs-unsplash.jpg";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/user_service";
import { toast } from "react-toastify";
const SignUp = () => {
  const navigate = useNavigate();
  const submitForm = (values) => {
    // call server api and send data
    registerUser(values)
      .then((resp) => {
        toast.success("Registered Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      {/* image section */}
      <div
        className="min-h-screen flex flex-col justify-center items-center w-full bg-cover"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPositionY: "17%",
        }}>
        <div className="my-3 w-[90%] sm:w-[400px] md:[500px] px-4 py-6 bg-gray-200 rounded-lg shadow-md">
          <h1 className="text-red-600 text-xl text-center mb-6">
            Register Here!
          </h1>
          {/* form section */}
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              about: "",
              phone: "",
              city: "",
            }}
            validationSchema={SignUpValidation}
            onSubmit={(values) => submitForm(values)}>
            {({ errors, touched }) => (
              <Form>
                <label className="pl-2" htmlFor="name">
                  Name
                </label>
                <Field
                  className="w-full py-2 px-4 rounded-xl text-sm sm:text-base border border-gray-400 mb-2"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
                {errors.name && touched.name ? (
                  <div className="text-sm text-red-600 pl-4">{errors.name}</div>
                ) : null}
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
                <label className="pl-2" htmlFor="about">
                  About
                </label>
                <Field
                  className="w-full py-2 px-4 rounded-xl text-sm sm:text-base border border-gray-400 mb-2"
                  id="about"
                  placeholder="About"
                  name="about"
                />
                {errors.about && touched.about ? (
                  <div className="text-sm text-red-600 pl-4">
                    {errors.about}
                  </div>
                ) : null}
                <label className="pl-2" htmlFor="phone">
                  Phone
                </label>
                <Field
                  className="w-full py-2 px-4 rounded-xl text-sm sm:text-base border border-gray-400 mb-2"
                  id="phone"
                  placeholder="Enter Phone"
                  name="phone"
                />
                {errors.phone && touched.phone ? (
                  <div className="text-sm text-red-600 pl-4">
                    {errors.phone}
                  </div>
                ) : null}
                <label className="pl-2" htmlFor="city">
                  City
                </label>
                <Field
                  className="w-full py-2 px-4 rounded-xl text-sm sm:text-base border border-gray-400 mb-2"
                  id="city"
                  placeholder="City"
                  name="city"
                />
                {errors.city && touched.city ? (
                  <div className="text-sm text-red-600 pl-4">{errors.city}</div>
                ) : null}
                <div className="text-center">
                  <button
                    className="bg-green-600 text-white hover:scale-105 hover:bg-green-500 duration-300 rounded-full px-4 py-2"
                    type="submit">
                    Register
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-3">
            <p className="text-sm">
              Already an account{" "}
              <Link className="text-blue-700 font-medium" to="/">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
