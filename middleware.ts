import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTenantFromHost } from "./lib/tenants";

/**
 * Middleware: canonical redirect + tenant cookie setup
 *
 * 功能：
 * 1. 檢查 host 是否屬於已知 tenant；
 * 2. 若 host 不存在於 tenant 列表中 → redirect 到主白標 local.test；
 * 3. 若合法，設定 tenantId cookie；
 * 4. 回傳 NextResponse.next() 讓 Next.js 繼續 SSR。
 */

const CANONICAL_HOST = "local.test";

export function middleware(req: NextRequest) {
    const host = req.headers.get("host") ?? "";
    const hostname = host.split(":")[0];
    const url = req.nextUrl.clone();

    // 嘗試從租戶列表取得 tenant
    const tenant = getTenantFromHost(host);
    console.log('middleware-tenant', tenant, host, hostname)

    // 若 tenant 是 default → canonical redirect
    if (tenant.id === "default") {
        // 若已經是 canonical host，就不要再 redirect（避免迴圈）
        if (hostname !== CANONICAL_HOST) {
            url.hostname = CANONICAL_HOST;
            url.protocol = "http:";
            url.port = "3000"; 
            console.log("Redirecting to canonical:", url.toString());
            return NextResponse.redirect(url);
        } else {
            console.log("Already on canonical host, skip redirect");
        }
    }

    // 已知 tenant → 繼續處理
    const res = NextResponse.next();

    // 若 cookie 不存在或不同 → 設定 tenantId
    const existing = req.cookies.get("tenantId")?.value;
    if (existing !== tenant.id) {
        res.cookies.set("tenantId", tenant.id, {
            path: "/",
            maxAge: 60 * 60 * 24 * 365, // 1 year
            httpOnly: false,
            sameSite: "lax",
        });
    }
    return res;
}

/**
 * matcher: 僅攔截主要頁面與 API
 * （避免干擾靜態資源載入）
 */
export const config = {
    matcher: ["/", "/information", "/profile", "/api/:path*"],
};
