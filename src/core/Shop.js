import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import {Grid, Button, MenuItem, Menu , Hidden} from '@material-ui/core';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
//////////////////////////////////////////////////////////////
    const [anchorEl1, setAnchorEl1] = React.useState(null);

    const handleClick1 = (event) => {
      setAnchorEl1(event.currentTarget);
    };
  
    const handleClose1 = () => {
      setAnchorEl1(null);
    };
  

    return (
        <Layout
            title="Le Boutique"
            description="Perfect Boujie Clip"
            className="container-fluid"
        >
        
            <div className="page-wrap">
            <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className='sticky mt-n5 '
            >
                <Grid>
                    <Button size='large' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant='contained' color='secondary'>Filters</Button>
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                    <MenuItem><strong>Size Fiter</strong></MenuItem>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")

                            }
                            handleClose={handleClose}
                        />
                        <MenuItem><strong>Price Fiter</strong></MenuItem>
                        <RadioBox
                        prices={prices}
                        handleFilters={filters =>
                            handleFilters(filters, "price")
                        }
                        handleClose1={handleClose1}
                    />
                    </Menu>
                </Grid>
                
            </Grid>    
            

                <Grid>
                    <h2 className="mb-4">Products</h2>
                    <Grid container
                    direction="row"
                    justify="space-evenly"
                    >
                        {filteredResults.map((product, i) => (
                            <div  key={i} >
                                <Card product={product} />
                            </div>
                        ))}
                    </Grid>
                    <hr />
                    {loadMoreButton()}
                </Grid>
            </div>
        </Layout>
    );
};

export default Shop;
