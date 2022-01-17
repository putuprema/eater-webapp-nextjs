import Image from "next/image";
import eaterLogoSmall from "../public/eater-logo-small.svg";
import {Typography} from "@mui/material";
import React from "react";

const TableNotFoundPage = () => (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-4">
        <div className={"grid gap-10 text-center"} style={{width: '300px'}}>
            <Image src={eaterLogoSmall} alt={"Eater"} width={90} height={90}/>
            <div className={"grid gap-3"}>
                <Typography variant={"h4"} fontWeight={"bolder"}>Error</Typography>
                <Typography variant={"body1"}>Table not found.<br/> Please scan valid QR code and try
                    again.</Typography>
            </div>
        </div>
    </div>
)

export default TableNotFoundPage