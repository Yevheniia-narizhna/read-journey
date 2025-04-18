import s from "./Registration.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { loginUser } from "../../redux/auth/operations";
import { useEffect, useState } from "react";
import { clearBooks } from "../../redux/library/slice";
import { getUserBooks } from "../../redux/library/operations";

const loginSchema = Yup.object({
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const passwordValue = useWatch({
    control,
    name: "password",
  });
  const passwordError = errors.password;
  const isPasswordFilled = passwordValue && passwordValue.length > 6;
  const isPasswordValid = !passwordError;
  const isValid = isPasswordFilled && isPasswordValid;

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    console.log(token);
    console.log("Stored token:", localStorage.getItem("token"));
    console.log("Stored refreshToken:", localStorage.getItem("refreshToken"));
    if (token) {
      // localStorage.setItem("token", token);
      dispatch(clearBooks());
      dispatch(getUserBooks());
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
            <div className={`${s.formLink} ${s.formLinkLog}`}>
              <button type="submit" className={s.formBtnLog}>
                Log in
              </button>
              <Link to="/register">Don’t have an account?</Link>
            </div>

            {/* {error && <div className="notification">{error}</div>} */}
          </form>
        </div>
      </div>
      <div className={s.contSecond}></div>
    </div>
  );
};

export default Login;
