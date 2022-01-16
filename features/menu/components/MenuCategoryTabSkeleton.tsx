import {Skeleton, Tab, Tabs} from "@mui/material";

export const MenuCategoryTabSkeleton = () => (
    <Tabs value={false}>
        <Skeleton animation={"wave"} sx={{mr: 1, ml: 1}}>
            <Tab/>
        </Skeleton>
        <Skeleton animation={"wave"} sx={{mr: 1}}>
            <Tab/>
        </Skeleton>
        <Skeleton animation={"wave"} sx={{mr: 1}}>
            <Tab/>
        </Skeleton>
        <Skeleton animation={"wave"}>
            <Tab/>
        </Skeleton>
    </Tabs>
)