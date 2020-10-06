import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import Container from '@material-ui/core/Container';
import { Hidden, Grid } from '@material-ui/core';


const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Boujie Clips"
            description="By Lexi"
            className="container-fluid"
        >
        <div className='page-wrap'>
        
        <Hidden xsDown>
            <Search />
        </Hidden>
        <h2 className="mb-4">New Arrivals</h2>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
            
          
                {productsByArrival.map((product, i) => (
                    <Grid  >
                        <div key={i} className='rounded-lg ' >
                            <Card product={product}  />
                        </div>
                    </Grid>
                ))}
            
        </Grid>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
            </div>
        </Layout>
    );
};

export default Home;
