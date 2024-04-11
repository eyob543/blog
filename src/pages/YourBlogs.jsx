import { useEffect } from "react";
import { useState } from "react";
import { useUser } from "../store";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import { v4 as uuid4 } from  "uuid"
export default function YourBlogs() {
  const [data, setData] = useState([]);
  const user = useUser();
  const navigate = useNavigate();
  const db = database;
  useEffect(() => {
    const blogCountRef = ref(db, "blogs");

    onValue(
      blogCountRef,
      (snapshot) => {
        const blogs = snapshot.val();
        const YourBlogs = _.filter(blogs, ["user", user]);
        setData(YourBlogs);
      },
      (error) => {
        console.log(error);
      },
    );
  }, [user, db]);
  function handleDelete(index) {
    const exactLocationInDb = ref(db, `blogs/${index}`);
    remove(exactLocationInDb);
    setData((prev) => {
      const newData = prev.filter((_, idx) => idx !== index);
      return newData;
    });
  }
  return (
    <>
      {data ? (
        <>
          <div className="flex flex-col md:flex-row flex-wrap gap-4 p-2 mx-auto">
            {data.map((blog, index) => {
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
                    <Typography sx={{ fontSize: 12 }}>{blog.user}</Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "auto",
                      gap: 1,
                      alignItems: "flex-start",
                    }}
                  >
                    <Button
                      onClick={() => navigate(`blog/${index}`)}
                      variant="contained"
                    >
                      Read more
                    </Button>
                    <Button
                      onClick={() => handleDelete(index)}
                      variant="contained"
                      sx={{
                        color: "red",
                        backgroundColor: "black",
                        ":hover": {
                          backgroundColor: "darkgray",
                        },
                      }}
                    >
                      Delete blog
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <h1>You have not posted a blog yet</h1>
        </>
      )}
    </>
  );
}
