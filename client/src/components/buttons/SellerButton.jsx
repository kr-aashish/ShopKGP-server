import { Button } from "@mui/material";
import React from "react";

const SellerButton = ({ onClick, text }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        marginTop: "5px",
        textTransform: "capitalize",
        maxWidth: "60%",
        padding: "10px 40px",
        backgroundColor: "var(--orange)",
        color: "#fff",
        fontWeight: 700,
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
        flex: 1,
        transition: "0.3s",
        boxShadow: "0px 10px 20px -8px var(--pale-orange)",
        "&:hover": {
          backgroundColor: "var(--orange-hover)",
          boxShadow: "0px 15px 25px -10px var(--pale-orange-hover)",
        },
      }}
    >
      Seller Tool
    </Button>
  );
};

export default SellerButton;
