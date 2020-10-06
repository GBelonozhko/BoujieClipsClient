import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import {Card, CardHeader, Avatar, Accordion, AccordionSummary,AccordionDetails,AccordionActions, Grid, Button, Divider, List, ListItem, ListItemIcon, Typography } from '@material-ui/core';
import bcPic from '../assets/images/bcDiamond.png'
import {MdExpandMore} from 'react-icons/md'

import { makeStyles } from '@material-ui/core/styles';

const SCard = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));


  const showViewButton = showViewProductButton => {
    
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && product.quantity>0 ?(
        <Button variant='contained' color='primary' onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
          Add to cart
        </Button>
      ):null
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  const classes = useStyles();

  return (

    <Card className='bg-primary mt-5' >
      <CardHeader title={product.name} subheader={ '$ ' + product.price} avatar={<Avatar> <img src ={bcPic}/> </Avatar>} action={showAddToCartBtn(showAddToCartButton)} /> 

      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />

        <Accordion>
          <AccordionSummary expandIcon ={<MdExpandMore/>}> <span className={classes.heading}> {showStock(product.quantity)} </span> <Typography className={classes.secondaryHeading}>More Info</Typography> </AccordionSummary>
         
            <List>
            <Divider/>
             <ListItem className="black-8">{product.description.substring(0, 100)} </ListItem>
             <Divider/>
             <ListItem className="">Price $ {product.price}</ListItem>
             <Divider/>
             <ListItem className="black-8">Category: {product.category && product.category.name}</ListItem>
             <Divider/>
             <ListItem className="">Released to the Public {moment(product.createdAt).fromNow()}</ListItem>
             <Divider/>
             </List>
             <Grid
             container
             direction="column"
             justify="space-between"
             alignItems="center"
           >
             
            
             {showAddToCartBtn(showAddToCartButton)}
           
             {showRemoveButton(showRemoveProductButton)}

             {showCartUpdateOptions(cartUpdate)}
            </Grid>
            
        </Accordion>
      </div>
    </Card>
  );
};

export default SCard;
