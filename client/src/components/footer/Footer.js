import React from "react";
import "./Footer.css";
import { Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

function Footer() {
return (
<Box className="footer-container">
<Grid container spacing={2}>
<Grid item xs={12} md={3}>
<Typography variant="h6">ShopKGP</Typography>
<Typography variant="body1" className="footer-about">
ShopKGP is an ecommerce platform that allows buyers and sellers to
connect with each other.
</Typography>
</Grid>
<Grid item xs={12} md={3}>
<Typography variant="h6">Quick Links</Typography>
<ul className="footer-links">
<li>
<Link to="/">Home</Link>
</li>
<li>
<Link to="/shop">Shop</Link>
</li>
<li>
<Link to="/about">About Us</Link>
</li>
<li>
<Link to="/contact">Contact Us</Link>
</li>
</ul>
</Grid>
<Grid item xs={12} md={3}>
<Typography variant="h6">Follow Us</Typography>
<ul className="footer-social-links">
<li>
<a href="https://www.facebook.com">
<Facebook />
</a>
</li>
<li>
<a href="https://www.instagram.com">
<Instagram />
</a>
</li>
<li>
<a href="https://www.twitter.com">
<Twitter />
</a>
</li>
<li>
<a href="https://www.youtube.com">
<YouTube />
</a>
</li>
</ul>
</Grid>
<Grid item xs={12} md={3}>
<Typography variant="h6">Contact Us</Typography>
<ul className="footer-contact">
<li>
<Typography variant="body1">Email: contact@shopkgp.com</Typography>
</li>
<li>
<Typography variant="body1">
Phone: +91-XXXXXXXXXX
</Typography>
</li>
<li>
<Typography variant="body1">
Address: XYZ, Kharagpur, West Bengal, India
</Typography>
</li>
</ul>
</Grid>
</Grid>
<Typography variant="body1" className="footer-legal">
© 2023 ShopKGP. All rights reserved.
</Typography>
</Box>
);
}

export default Footer;