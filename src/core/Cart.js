import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import {Container, Grid} from '@material-ui/core'


const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={false}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <Layout
            title="Boujie Cart"
            description="Enjoy Fancy Life"
            className="container-fluid"
        >
        <Container>
            <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
            >

                <Grid xs={12} sm={12} md={5}>
                    <h2 className="mb-4 text-white">Your Boujie Necessities Await</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </Grid>

                <Grid >{items.length > 0 ? showItems(items) : noItemsMessage()}</Grid>

                
            </Grid>
        
        </Container>
        </Layout>
    );
};

export default Cart;
