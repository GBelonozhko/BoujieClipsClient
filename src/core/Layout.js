import React from "react";
import Menu from "./Menu";
import "../styles.css";
import bcGraphic from '../assets/images/BCgraphic.png'
import Grid from '@material-ui/core/Grid';
import { Hidden } from "@material-ui/core";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="jumbotron jumbotron-fluid">
        
        <Grid 
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        >

        <h2 className='mr-5' >{title}</h2>
        <p className="lead mb-n4 mr-5">{description}</p>
        <Hidden xsDown>
        <img src={bcGraphic} className='mt-n5 ml-5 ' />
        </Hidden>
            
        </Grid>

        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
