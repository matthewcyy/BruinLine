import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import BLineLogo from "../../images/logo_name.png";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function LandingPage() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="header" style={{ marginBottom: "10px" }}>
        Welcome to BruinLine!
      </h1>
      <span
        style={{
          display: "inline-block",
          margin: "auto auto",
          marginBottom: "20px",
        }}
      >
        <img
          src={BLineLogo}
          style={{ width: "25%" }}
          alt="The BLine Logo; a hand-drawn teddy bear wearing a BruinLine beanie, holding a bowl of honey with a buzzing bee nearby"
        />
      </span>
      <div style={{ width: "50%", margin: "auto" }}>
        <Box
          sx={{
            textAlign: "left",
            fontSize: "1.15rem",
            fontWeight: "medium",
            paddingLeft: 1.75,
            paddingRight: 1.75,
            paddingTop: 1.75,
            paddingBottom: 0.75,
          }}
        >
          This site is meant to make a more fun and personalized dining-hall
          experience at UCLA!
          <br />
          Here, users can:
          <ul>
            <li>
              Get a general estimate for the lines/number of people at each
              dining hall
            </li>
            <li>'Like' their favorite foods on different menus</li>
            <li>
              Create groups to vote on which
              dining hall to eat at together
            </li>
            <li>Write reviews for various items</li>
            <li>Track their daily nutrition</li>
          </ul>
        </Box>
      </div>
    </div>
  );
}
export default LandingPage;
