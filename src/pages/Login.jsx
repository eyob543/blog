import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useLoginStore } from "../store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
export default function Login() {
  const { setIsLoggedIn, setUser } = useLoginStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function handlePopUp() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user.displayName);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  }
  function onSubmit(data) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
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
          className=" bg-cyan-900 p-1 py-2 text-lg rounded font-semibold w-44 mx-auto hover:cursor-pointer hover:bg-cyan-600"
          type="submit"
          value="Login"
        />
      </form>
      <button
        type="button"
        onClick={handlePopUp}
        className="bg-cyan-900 py-2 rounded px-3 m-2 flex justify-center font-semibold hover:bg-cyan-600 mx-auto"
      >
        Sign in with Google
      </button>
    </>
  );
}
