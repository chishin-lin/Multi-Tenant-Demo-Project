import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { lang } = body as { lang: string };
        const res = NextResponse.json({ ok: true });
        res.cookies.set('lang', lang, { path: '/', maxAge: 60 * 60 * 24 * 365 });
        return res;
    } catch (err) {
        return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
    }
}
