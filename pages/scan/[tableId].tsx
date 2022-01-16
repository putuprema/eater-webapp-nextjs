import {NextPage} from "next";
import React from "react";
import Image from 'next/image';
import eaterLogoSmall from '../../public/eater-logo-small.svg';
import eaterLogoFull from '../../public/eater-logo-full.svg';
import {LinearProgress, Typography} from "@mui/material";
import useScanTableViewModel from "../../features/table/viewmodels/scan-table.viewmodel";

const ScanTable: NextPage = () => {
    const [selectedTable, loading] = useScanTableViewModel();

    if (loading) return (
        <div className="w-screen h-screen flex flex-col items-center justify-center p-4">
            <div className={"grid gap-10"} style={{width: '200px'}}>
                <Image src={eaterLogoFull} alt={"Eater"} priority/>
                <LinearProgress/>
            </div>
        </div>
    )

    if (!selectedTable) return (
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

    return <div/>
}

export default ScanTable