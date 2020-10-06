import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import {RiShoppingBagLine} from 'react-icons/ri';
import {MdAccountCircle} from 'react-icons/md';
import {GoSignOut} from 'react-icons/go';
import homeButton from '../assets/images/BCName.png';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#000000' };
    } else {
        return { color: "#ffffff" };
    }
};



const Menu = ({ history }) => (

    
    <div>
    <Container>
    <AppBar color='primary'>
     <Toolbar >
        
            <Hidden only = 'xs'>
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    <img src={homeButton}/>
                </Link>
            </Hidden>

            <Hidden smUp>
            <Button 
                href='/'
                className="nav-link"
                style={isActive(history, "/")}
            >
            Home
            </Button>
            </Hidden>
            <div className='flex-grow-1'/>
            <Button className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </Button>

           
               
                
            

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                
                    <IconButton
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        href="/user/dashboard"
                    >
                    <MdAccountCircle/>
                    </IconButton>
                
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                
                    <IconButton
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        href="/admin/dashboard"
                    >
                    <MdAccountCircle/>
                    </IconButton>
                
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <Button className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Login
                        </Link>
                    </Button>

                    <Button className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Create Account
                        </Link>
                    </Button>
                </Fragment>
            )}

            {isAuthenticated() && (
                <IconButton  className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                    signout(() => {
                        history.push("/");
                    })
                }>
                    
                        
                    
                    <GoSignOut/>
                    
                </IconButton>
            )}
        
            <IconButton
            className="nav-link mr-02"
            style={isActive(history, "/cart")}
            href="/cart"
        >
        <RiShoppingBagLine/>
            
            <sup>
                <Badge color='secondary' badgeContent={itemTotal()} > </Badge>
            </sup>
            </IconButton>
      </Toolbar>
     </AppBar>
     </Container>
     </div>
);

export default withRouter(Menu);
