import {ProductCategory} from "../menu.model";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Tab, Tabs} from "@mui/material";

interface MenuCategoryTabsProps {
    categories: ProductCategory[]
}

export const MenuCategoryTabs: React.FC<MenuCategoryTabsProps> = ({categories}) => {
    const [activeTabId, setActiveTabId] = useState<string | false>(categories[0].id)
    const [ticking, setTicking] = useState(false)
    const [tabClicked, setTabClicked] = useState(false)
    const unsetTabClickedRef = useRef<number | undefined>()

    const findActiveTab = useCallback(() => {
        setTicking(false)
        if (tabClicked) return;

        let foundActiveId: string | undefined

        for (const category of categories) {
            const documentEl = document.documentElement;
            const node = document.getElementById(category.id)

            // No hash if we're near the top of the page
            if (documentEl.scrollTop < 0) {
                foundActiveId = undefined
                break
            }

            if (node && Math.abs(node.offsetTop - documentEl.scrollTop) < 140) {
                foundActiveId = category.id
                console.log(foundActiveId)
                break
            }
        }

        if (foundActiveId && activeTabId !== foundActiveId) {
            setActiveTabId(foundActiveId)
        }
    }, [activeTabId, categories, tabClicked])

    const onScroll = useCallback(() => {
        if (!ticking) {
            requestAnimationFrame(findActiveTab)
        }
        setTicking(true)
    }, [findActiveTab, ticking])

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [onScroll])

    useEffect(() => () => {
        clearTimeout(unsetTabClickedRef.current)
    }, [])

    const handleClicked = (tabId: string) => {
        setTabClicked(true)

        clearTimeout(unsetTabClickedRef.current)
        unsetTabClickedRef.current = window.setTimeout(() => {
            setTabClicked(false)
        }, 1000)

        setActiveTabId(tabId)

        const featuredMenuParentNode = document.getElementById(tabId)
        if (featuredMenuParentNode) {
            window.scrollTo({
                top: featuredMenuParentNode.getBoundingClientRect().top + window.scrollY - 120,
                behavior: "smooth"
            })
        }
    }

    return (
        <Tabs variant={"scrollable"} value={activeTabId}>
            {categories.map(c => <Tab key={c.id} label={c.name} value={c.id} onClick={() => handleClicked(c.id)}/>)}
        </Tabs>
    )
}