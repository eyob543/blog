import { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
export function loader({ params }) {
  const db = database;
  const blogCountRef = ref(db, `blogs/${params.id}`);

  return defer({
    blog: new Promise((resolve, reject) => {
      onValue(
        blogCountRef,
        (snapshot) => {
          const data = snapshot.val();
          resolve(data);
        },
        (error) => {
          reject(error);
        },
      );
    }),
  });
}
function Spinner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        mt: "18%",
      }}
    >
      <CircularProgress fontSize={200} />
    </Box>
  );
}
export default function BlogDetails() {
  const data = useLoaderData();
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Await resolve={data.blog}>
          {(loadedBlog) => {
            return (
              <>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mx="auto"
                  gap={3}
                  p={2}
                  flexDirection="column"
                  maxWidth={1000}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    {loadedBlog.title}
                  </Typography>
                  <img
                    src={loadedBlog.imageURL}
                    alt={`visual of ${loadedBlog.title}`}
                    className="w-54 w- h-48"
                  />
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: 18,
                    }}
                  >
                    {loadedBlog.description}
                  </Typography>
                  <Typography
                    sx={{
                      color: "pink",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    Written By {loadedBlog.user}
                  </Typography>
                </Box>
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
