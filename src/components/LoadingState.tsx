import { Box, Grid, Skeleton } from "@mui/material";

const LoadingState = () => {
  return (
    <Box sx={{ width: "100%", bgcolor: "#121212", minHeight: "100vh", p: 3 }}>
      <Skeleton
        variant="text"
        width={300}
        height={40}
        sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", mb: 3 }}
      />

      <Grid container spacing={3} mb={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Box
              sx={{
                bgcolor: "#2F4F2F",
                borderRadius: 2,
                p: 3,
                height: "100%",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Skeleton
                    variant="text"
                    width={100}
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
                  />
                  <Skeleton
                    variant="text"
                    width={60}
                    height={40}
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
                  />
                </Box>
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ bgcolor: "#1E1E1E", borderRadius: 1, p: 2 }}>
        {[1, 2, 3, 4, 5].map((row) => (
          <Box
            key={row}
            sx={{
              display: "flex",
              gap: 2,
              mb: 2,
              p: 1,
            }}
          >
            <Skeleton
              variant="text"
              width="20%"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
            />
            <Skeleton
              variant="text"
              width="15%"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
            />
            <Skeleton
              variant="text"
              width="15%"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
            />
            <Skeleton
              variant="text"
              width="15%"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
            />
            <Skeleton
              variant="text"
              width="15%"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              {[1, 2, 3].map((action) => (
                <Skeleton
                  key={action}
                  variant="circular"
                  width={24}
                  height={24}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LoadingState;
