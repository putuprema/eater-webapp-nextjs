import {MenuItem} from "./MenuItem";
import {Grid} from "@mui/material";

export const MenuLoadingSkeleton = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}><MenuItem/></Grid>
            <Grid item xs={6}><MenuItem/></Grid>
            <Grid item xs={6}><MenuItem/></Grid>
            <Grid item xs={6}><MenuItem/></Grid>
            <Grid item xs={6}><MenuItem/></Grid>
            <Grid item xs={6}><MenuItem/></Grid>
            <Grid item xs={6}><MenuItem/></Grid>
            <Grid item xs={6}><MenuItem/></Grid>
            <Grid item xs={6}><MenuItem/></Grid>
            <Grid item xs={6}><MenuItem/></Grid>
        </Grid>
    )
}