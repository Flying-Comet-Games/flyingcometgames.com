import React from "react";
import Box from '@mui/material/Box';
import { Adsense } from "@ctrl/react-adsense";

const GoogleAdTopic = () => {
  return (
    <Box
      sx={{
        width: "100%",
        // height: { xs: "140px", sm: "160px" },
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginBottom: "4px",
        backgroundColor: "#d1d0c9",
        borderRadius: "16px",
        boxShadow: (theme) => `0 2px 4px ${theme.palette.grey[400]}`,
        "&:hover": {
          backgroundColor: (theme) => theme.palette.grey[200],
        },
        overflow: "hidden",
        transition: "transform 0.2s",
      }}
    >
      <Adsense
        className="topicadsbygoogle"
        client="ca-pub-1729981660160138"
        slot="7421222880"
        format="fluid"
        layoutKey="-ge+5+1+2-3"
        style={{
          width: "100%",
          overflowX: "hidden",
          maxHeight: "350px",
          display: "block",
        }}
      />
    </Box>
  );
};

export default GoogleAdTopic;
