import Box from "@mui/material/Box";

const KofiButton = () => {
  const handleKofiClick = () => {
    window.open("https://ko-fi.com/V7V2162LVY", "_blank");
  };

  return (
    <Box
      onClick={handleKofiClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mt: 4,
        backgroundColor: "black",
        maxWidth: "240px",
        mx: "auto",
        color: "white",
        padding: "12px 24px",
        borderRadius: 20,
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "scale(1.02)",
          opacity: 0.9,
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      <img
        src={`https://storage.ko-fi.com/cdn/logomarkLogo.png`}
        alt="Ko-fi"
        style={{
          height: "20px",
          width: "auto",
        }}
      />
      <span
        style={{
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "20px",
        }}
      >
        Support our games!
      </span>
    </Box>
  );
};

export default KofiButton;
