import { useLoaderData, defer, Await, useNavigate } from "react-router-dom";
import _ from "lodash";
import { Suspense } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import HomeSkeleton from "../components/HomeSkeleton";
import Skeleton from "@mui/material/Skeleton";
import { v4 as uuid4 } from "uuid";
export function loader() {
  const db = database;
  const blogCountRef = ref(db, "blogs");

  return defer({
    blogs: new Promise((resolve, reject) => {
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

export default function Home() {
  const data = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <Suspense fallback={<HomeSkeleton items={10} />}>
        <Await resolve={data.blogs}>
          {(loadedBlogs) => {
            return (
              <div className="flex flex-col md:flex-row flex-wrap gap-4 p-2 mx-auto">
                {_.toArray(loadedBlogs)?.map((blog, index) => {
                  return (
                    <Card
                      key={uuid4}
                      sx={{
                        p: 1,
                        height: 350,
                        width: 250,
                        borderRadius: 2,
                        mx: "auto",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 600,
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                          }}
                        >
                          {blog.title}
                        </Typography>
                        {blog.imageURL ? (
                          <CardMedia
                            component="img"
                            image={blog.imageURL}
                            alt={`${blog.title} thumbnail`}
                          />
                        ) : (
                          <Skeleton
                            variant="rectangular"
                            height={100}
                            width={200}
                          />
                        )}
                        <Typography sx={{ fontSize: 14 }}>
                          {_.truncate(blog.description)}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          {blog.user}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          onClick={() => navigate(`blog/${index}`)}
                          variant="contained"
                        >
                          Read more
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
