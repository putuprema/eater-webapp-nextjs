import {Product, ProductCategory} from "../menu.model";
import React from "react";
import {Grid, Typography} from "@mui/material";
import {MenuItem} from "./MenuItem";

interface FeaturedMenuParentProps {
    category: ProductCategory
    products: Product[]
}

export const FeaturedMenuParent: React.FC<FeaturedMenuParentProps> = ({category, products}) => {
    return (
        <div id={category.id}>
            <Typography variant={"h6"} fontWeight={800} sx={{marginBottom: '0.6rem'}}>{category.name}</Typography>
            <Grid container spacing={2}>
                {products.map(p => (
                    <Grid key={p.id} item xs={6}>
                        <MenuItem data={p}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}