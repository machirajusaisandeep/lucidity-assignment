import { Paper, Box, Typography } from "@mui/material";
import Icon from "@mui/material/Icon";

interface StatsWidgetProps {
  title: string;
  value: string | number;
  icon: string;
}

const StatsWidget = ({ title, value, icon }: StatsWidgetProps) => {
  return (
    <Paper
      sx={{
        p: 2,
        height: "100%",
        bgcolor: "rgba(35, 48, 68, 0.9)",
        borderRadius: 1,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" color="text.primary">
            {value}
          </Typography>
        </Box>
        <Icon sx={{ fontSize: 40, color: "primary.main" }}>{icon}</Icon>
      </Box>
    </Paper>
  );
};

export default StatsWidget;
