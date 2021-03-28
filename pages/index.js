//[label /pages/index.js]
import Link from "next/link";
import React, { Component } from "react";
import makeStyles from "@material-ui/styles";

const linkStyle = {
  marginRight: 15,
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "blue",
    margin: "auto auto",
  },
});
const classes = useStyles();

export default class extends Component {
  render() {
    return (
      <div>
        <div className={classes.root}>Good Time Journal HomeScreen</div>
        <div>
          <div>
            <Link href="/SignUp">
              <button>Sign Up</button>
            </Link>

            <Link href="/Delete">
              <button>Delete</button>
            </Link>

            <Link href="/Login">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
