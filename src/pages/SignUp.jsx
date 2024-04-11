import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useLoginStore } from "../store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
export default function SignUp() {
  const { setIsLoggedIn, setUser } = useLoginStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        userCredential.user.displayName = data.userName;
        setUser(userCredential.user.displayName);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  }

  return (
    <>
      <form
        className="flex flex-col max-w-64 gap-3 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          name="email"
          placeholder="email"
          {...register("email", { required: true })}
          className="rounded p-2 text-white bg-gray-600 placeholder:text-white"
        />
        {errors.email?.type === "required" && (
          <Typography
            sx={{
              color: "red",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
            }}
            role="alert"
          >
            Email is required
          </Typography>
        )}
        <input
          type="password"
          name="current-password"
          placeholder="password"
          {...register("password", { required: true })}
          className="rounded p-2 text-white bg-gray-600 placeholder:text-white"
        />
        {errors.password?.type === "required" && (
          <Typography
            sx={{
              color: "red",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
            }}
            role="alert"
          >
            Password is required
          </Typography>
        )}
        <input
          type="text"
          placeholder="User name"
          {...register("userName", { required: true })}
          className="rounded p-2 text-white bg-gray-600 placeholder:text-white"
        />
        {errors.userName?.type === "required" && (
          <Typography
            sx={{
              color: "red",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
            }}
            role="alert"
          >
            User name is required
          </Typography>
        )}
        <input
          className=" bg-cyan-900 p-1 py-2 text-lg rounded font-semibold w-44 mx-auto hover:cursor-pointer hover:bg-cyan-600"
          type="submit"
          value="Create an account"
        />
      </form>
    </>
  );
}
