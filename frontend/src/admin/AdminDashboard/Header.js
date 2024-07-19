import { Typography, Box, useTheme } from "@mui/material";


const Header = ({ title, subtitle }) => {
 
  return (
    <Box mb="10px">
      <Typography
        variant="h3"
        color={'white'}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h8" color='whitesmoke'>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;