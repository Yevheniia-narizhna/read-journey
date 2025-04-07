import { useNavigate } from "react-router-dom";
import s from "./Registration.module.css";
import * as Yup from "yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
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
        <h1>
          Expand your mind, reading <span>a book</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Name" {...register("name")} />
            {errors.name && <p>{errors.name.message}</p>}

            <input placeholder="Email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit">Registration</button>

            {error && <div className="notification">{error}</div>}
          </form>
        </h1>
      </div>
      <div className={s.contSecond}></div>
    </div>
  );
};
export default Registration;
