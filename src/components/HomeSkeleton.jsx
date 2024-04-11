import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// eslint-disable-next-line react/prop-types
export default function HomeSkeleton({ items }) {
  const arr = [];
  for (let i = 0; i < items; i++) {
    arr[i] = i;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {arr?.map((value) => {
          return (
            <Card
              key={value}
              variant="outlined"
              sx={{
                bgcolor: "gray",
                borderRadius: 2,
                height: 300,
                width: 250,
                mx: "auto",
                mt: 2,
              }}
            >
              <CardContent>
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "3rem", width: 120 }}
                />
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={190}
                  height={100}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={150}
                  height={60}
                />
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </>
  );
}
