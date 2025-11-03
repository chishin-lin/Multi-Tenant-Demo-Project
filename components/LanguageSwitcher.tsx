'use client';

export default function LanguageSwitcher() {

    async function setLang(lang: 'en' | 'zh') {
        await fetch('/api/set-lang', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ lang }) });
        window.location.reload();
    }

    return (
        <div className="flex gap-2 items-center">
            <button onClick={() => setLang('en')} className="px-3 py-1 border rounded">EN</button>
            <button onClick={() => setLang('zh')} className="px-3 py-1 border rounded">中文</button>
        </div>
    );
}
