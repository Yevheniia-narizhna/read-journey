import { Link, useNavigate } from "react-router-dom";
import s from "./Registration.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) });

  const passwordValue = useWatch({
    control,
    name: "password",
  });
  const passwordError = errors.password;
  const isPasswordFilled = passwordValue && passwordValue.length > 6;
  const isPasswordValid = !passwordError;
  const isValid = isPasswordFilled && isPasswordValid;

  const onSubmit = (data) => {
    // setIsSubmitted(true);
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/recommended");
    }
  }, [token, navigate]);

  return (
    <div className={s.registrCont}>
      <div className={s.contFirst}>
        <div className={s.logo}>
          <svg className={s.logoImg}>
            <use href="/src/assets/symbol-defs.svg#icon-icon-1" />
          </svg>
          <svg className={s.logoText}>
            <use href="/src/assets/symbol-defs.svg#icon-read-journey" />
          </svg>
        </div>
        <div className={s.contForm}>
          <h1 className={s.title}>
            Expand your mind, reading <span>a book</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <input placeholder="Name" {...register("name")} />
            {errors.name && (
              <p className={s.errorText}>{errors.name.message}</p>
            )}

            <input placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className={s.errorText}>{errors.email.message}</p>
            )}
            <div className={s.inputWrapp}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className={`${s.input} ${
                  passwordError && passwordValue?.length < 7
                    ? s.inputError
                    : isValid
                    ? s.inputSuccess
                    : ""
                }`}
              />
              <span className={s.iconPassw}>
                {passwordError && passwordValue?.length < 7 ? (
                  <svg className={s.logoImg}>
                    <use href="/src/assets/symbol-defs.svg#icon-pajamas_error" />
                  </svg>
                ) : isValid ? (
                  <svg className={s.logoImg}>
                    <use href="/src/assets/symbol-defs.svg#icon-gg_check-o" />
                  </svg>
                ) : showPassword ? (
                  <svg
                    className={s.logoImg}
                    onClick={() => setShowPassword(false)}
                  >
                    <use href="/src/assets/symbol-defs.svg#icon-eye-1" />
                  </svg>
                ) : (
                  <svg
                    className={s.logoImg}
                    onClick={() => setShowPassword(true)}
                  >
                    <use href="/src/assets/symbol-defs.svg#icon-eye-off-1" />
                  </svg>
                )}
              </span>
              {passwordError ? (
                <p className={s.errorText}>{passwordError.message}</p>
              ) : isValid ? (
                <p className={`${s.errorText} ${s.successMessage}`}>
                  Password is valid
                </p>
              ) : null}
            </div>
            <div className={s.formLink}>
              <button type="submit" className={s.formBtn}>
                Registration
              </button>
              <Link to="/login">Already have an account?</Link>
            </div>

            {error && <div className="notification">{error}</div>}
          </form>
        </div>
      </div>
      <div className={s.contSecond}></div>
    </div>
  );
};
export default Registration;
