export type TenantTheme = {
    brand: string;
    accent: string;
    text: string;
};

export type TenantHomeLayout = 'sports' | 'slots' | 'default';

export type TenantConfig = {
    id: string;
    name: string;
    hostnames: string[];
    theme: TenantTheme;
    routes: string[]; // allowed routes
    titleSuffix: string;
    homeLayout: TenantHomeLayout;
    layout: {
        mobileColumns: number;
        desktopColumns: number;
    };
};


