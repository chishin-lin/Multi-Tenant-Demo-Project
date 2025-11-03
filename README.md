# Multi-Tenant Demo Project

This is a simple multi-tenant website demo project built to display different website layouts and themes based on the domain name.

For example:

client1.local.test → shows Client 1’s site

client2.local.test → shows Client 2’s site

local.test / localhost → shows the default site

The purpose of this project is to explore how to structure and configure a front-end app with multiple tenants (domains) using Next.js App Router.

# Tech Stack

Next.js (App Router)

React

TypeScript

Tailwind CSS

Node.js v18+

# Project Structure
.
├── app/
│   ├── (default)/
│   │   ├── page.tsx                # Default home page (local.test / localhost)
│   │   ├── information/page.tsx    # Default information page
│   │   ├── profile/page.tsx        # Default profile page
│   ├── layout.tsx                  # Global layout
│   ├── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── TenantLayout.tsx        # Layout that dynamically loads tenant styles
│   │
│   ├── common/                     # Shared reusable components
│   │   ├── Button.tsx
│   │   ├── Logo.tsx
│   │   └── Card.tsx
│   │
│   ├── HomePage/
│   │   ├── Client1Home.tsx         # Homepage style for Client 1
│   │   ├── Client2Home.tsx         # Homepage style for Client 2
│   │   └── DefaultHome.tsx         # Default homepage style
│
├── lib/
│   ├── tenantConfig.ts             # Tenant configuration file
│
├── package.json
├── README.md
└── tsconfig.json

# Tenant Configuration Setup
## Add Local Domain Entries

Edit your local hosts file:

sudo nano /etc/hosts


Add the following lines at the end:

127.0.0.1   local.test
127.0.0.1   client1.local.test
127.0.0.1   client2.local.test
127.0.0.1   localhost


## For Windows users, edit the file at
C:\Windows\System32\drivers\etc\hosts.

# Run the Project
npm install
npm run dev


Then visit the following URLs in your browser:

http://local.test:3000
 → Default home page

http://client1.local.test:3000
 → Client 1’s home page

http://client2.local.test:3000
 → Client 2’s home page

# Tenant Configuration Example

/lib/tenantConfig.ts

export const tenantConfig = {
    default: {
            id: 'default',
            name: 'Public',
            hostnames: ['local.test', '127.0.0.1', 'localhost'],
            theme: {
                brand: '#6b7280',
                accent: '#374151',
                text: '#0f172a',
            },
            routes: ['/', '/information', '/profile'],
            titleSuffix: '— Public',
            homeLayout: 'default',
            layout: { mobileColumns: 1, desktopColumns: 3 },
        },
    client1: {
            id: 'client1',
            name: 'Client One',
            hostnames: ['client1.local.test'],
            theme: {
                brand: '#0ea5e9',
                accent: '#0369a1',
                text: '#0f172a',
            },
            routes: ['/', '/information'],
            titleSuffix: '— Client One',
            homeLayout: 'sports',
            layout: { mobileColumns: 2, desktopColumns: 6 },
        },
    client2: {
            id: 'client2',
            name: 'Client Two',
            hostnames: ['client2.local.test'],
            theme: {
                brand: '#ef4444',
                accent: '#b91c1c',
                text: '#111827',
            },
            routes: ['/', '/profile'],
            titleSuffix: '— Client Two',
            homeLayout: 'slots',
            layout: { mobileColumns: 1, desktopColumns: 4 },
        },
};


The active tenant is detected based on the current hostname, and TenantLayout.tsx dynamically applies the corresponding theme and style.

# Tenant Theme Overview
Tenant Domain	Primary Color	Theme	Homepage Component
local.test / localhost	Blue (#2563EB)	Light	DefaultHome
client1.local.test	Orange (#F97316)	Light	Client1Home
client2.local.test	Green (#16A34A)	Dark	Client2Home
## Usage

Start the development server.

Visit the corresponding tenant domain in your browser.

The app automatically loads tenant-specific colors, layouts, and content.

Add more tenants by updating /lib/tenantConfig.ts.


# 👩‍💻 Author
This project was built as a personal side project to explore multi-tenant architecture and dynamic theming using Next.js.