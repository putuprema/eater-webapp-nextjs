import {NextPage} from "next";
import React from "react";
import Image from 'next/image';
import eaterLogoFull from '../../public/eater-logo-full.svg';
import {LinearProgress} from "@mui/material";
import useScanTableViewModel from "../../features/table/viewmodels/scan-table.viewmodel";
import TableNotFoundPage from "../_tableNotFound";

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

    if (!selectedTable) return <TableNotFoundPage/>

    return <div/>
}

export default ScanTable