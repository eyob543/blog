import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { database } from "../firebase";
import { set, ref, onValue } from "firebase/database";
import _ from "lodash";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useUser } from "../store";
export default function AddBlog() {
  const [successMessage, setSuccessMessage] = useState("");
  const [isPosted, setIsPosted] = useState(false);
  const user = useUser();
  useEffect(() => {
    if (isPosted) {
      setSuccessMessage("Your Blog Has Been posted successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [isPosted]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const db = database;

  const onSubmit = (data) => {
    let numberOfBlogsPosted;
    const blogCountRef = ref(db, "blogs");
    onValue(
      blogCountRef,
      (snapshot) => {
        const data = snapshot.val();
        numberOfBlogsPosted = _.toArray(data).length;
      },
      (error) => {
        console.log(error);
      },
    );
    set(ref(db, `blogs/${numberOfBlogsPosted}`), {
      title: data.title,
      imageURL: data.imageURL,
      description: data.description,
      user,
    });
    setIsPosted(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 mt-12"
      >
        <label className="flex gap-x-3">
          <Typography variant="h5">Blog Title:</Typography>
          <input
            className="text-white bg-gray-500 rounded md:w-56 p-2 placeholder:text-gray-100"
            type="text"
            placeholder="Blog title"
            {...register("title", { required: true, minLength: 5 })}
          />
        </label>
        {errors.title?.type === "required" && (
          <Typography
            sx={{
              color: "red",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
            }}
            role="alert"
          >
            Blog title is required
          </Typography>
        )}
        {errors.title?.type === "minLength" && (
          <Typography
            sx={{
              color: "red",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
            }}
            role="alert"
          >
            Blog title should be longer than 5 letters
          </Typography>
        )}
        <label className="flex gap-x-3">
          <Typography variant="h5">Image URL: </Typography>
          <input
            className="text-white bg-gray-500 rounded md:w-56 p-2 placeholder:text-gray-100"
            type="text"
            placeholder="imageURL"
            {...register("imageURL")}
          />
        </label>
        <label className="flex gap-x-3">
          <Typography variant="h5">Blog Description:</Typography>
          <textarea
            className="text-white bg-gray-500 rounded md:w-56 p-2 placeholder:text-gray-100"
            type="text"
            placeholder="Start writing your blog..."
            {...register("description", { required: true })}
          />
        </label>
        {errors.description?.type === "required" && (
          <Typography
            sx={{
              color: "red",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
            }}
            role="alert"
          >
            Blog description is required
          </Typography>
        )}

        {successMessage && (
          <Typography variant="h5" sx={{ color: "green" }}>
            {successMessage}
          </Typography>
        )}

        <input
          className="bg-blue-500 p-1 py-2 text-lg rounded font-semibold w-44 mx-auto hover:cursor-pointer hover:bg-blue-600"
          type="submit"
          value="Submit Blog"
        />
      </form>
    </Box>
  );
}
