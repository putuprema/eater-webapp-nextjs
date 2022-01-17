import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import {Constants} from "../shared/constants";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const pageWhitelist = ['/', '/scan/[tableId]']

    if (pageWhitelist.findIndex(w => w === req.page.name) === -1) {
        const tableCookieStr = req.cookies[Constants.CurrentTableCookieKey]
        if (!tableCookieStr) {
            return NextResponse.rewrite('/_tableNotFound')
        }
    }
}