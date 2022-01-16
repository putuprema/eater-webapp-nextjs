import {NextPage} from "next";
import useMenuViewModel from "../features/menu/viewmodels/menu.viewmodel";
import {AppBar, Box, Container, IconButton, Toolbar, Typography} from "@mui/material";
import Image from 'next/image'
import eaterLogoFull from '../public/eater-logo-full.svg';
import MenuIcon from '@mui/icons-material/Menu'
import {MenuLoadingSkeleton} from "../features/menu/components/MenuLoadingSkeleton";
import {FeaturedMenuParent} from "../features/menu/components/FeaturedMenuParent";
import {MenuCategoryTabSkeleton} from "../features/menu/components/MenuCategoryTabSkeleton";
import {MenuCategoryTabs} from "../features/menu/components/MenuCategoryTabs";
import {CheckoutFab} from "../features/common/components/CheckoutFab";

const Menu: NextPage = () => {
    const [selectedTable, featuredMenuList, categories, loading] = useMenuViewModel();

    return (
        <div>
            {selectedTable && (
                <Box sx={{backgroundColor: 'primary.main', color: 'white'}}>
                    <Typography variant={"body2"}
                                align={"center"}>Table <strong>#{selectedTable.number}</strong></Typography>
                </Box>
            )}
            <AppBar position="sticky" sx={{background: 'white'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{zIndex: 2}}>
                        <MenuIcon color={"primary"}/>
                    </IconButton>
                    <div className={"absolute top-0 left-0 w-full h-full flex items-center justify-center"}>
                        <Image src={eaterLogoFull} alt={"Eater Logo"} height={32}/>
                    </div>
                </Toolbar>
                {!categories || loading ? (
                    <MenuCategoryTabSkeleton/>
                ) : (
                    <MenuCategoryTabs categories={categories}/>
                )}
            </AppBar>
            <Container sx={{paddingTop: '1rem', paddingBottom: '1rem'}}>
                {loading ? (
                    <MenuLoadingSkeleton/>
                ) : (
                    <div className={"grid gap-10"}>
                        {featuredMenuList?.map(featured => (
                            <FeaturedMenuParent key={featured.category.id} category={featured.category}
                                                products={featured.products}/>
                        ))}
                    </div>
                )}
                <CheckoutFab/>
            </Container>
        </div>
    )
}

export default Menu