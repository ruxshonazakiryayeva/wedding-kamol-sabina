import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { htmlLang, t as tr, wedding, type Lang } from "@/config/wedding";

// Detect language from <html lang> at mount; default to configured locale.
function useBoundaryLang(): Lang {
  const [lang, setLang] = useState<Lang>(wedding.language.default);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const code = document.documentElement.lang;
    const match = (Object.entries(htmlLang) as [Lang, string][]).find(
      ([, v]) => v === code,
    );
    if (match) setLang(match[0]);
  }, []);
  return lang;
}

function NotFoundComponent() {
  const lang = useBoundaryLang();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{tr(lang, "notFoundTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {tr(lang, "notFoundBody")}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {tr(lang, "goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const lang = useBoundaryLang();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {tr(lang, "errorTitle")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {tr(lang, "errorBody")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {tr(lang, "tryAgain")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {tr(lang, "goHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kamol & Sabina" },
      { name: "description", content: "Ikki qalb birlashayotgan unitilmas lahzaga guvoh bo'ling. To'y oqshomiga sizlarni lutfan taklif etamiz" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Kamol & Sabina" },
      { property: "og:description", content: "Ikki qalb birlashayotgan unitilmas lahzaga guvoh bo'ling. To'y oqshomiga sizlarni lutfan taklif etamiz" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Kamol & Sabina" },
      { name: "twitter:description", content: "Ikki qalb birlashayotgan unitilmas lahzaga guvoh bo'ling. To'y oqshomiga sizlarni lutfan taklif etamiz" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c29b4278-22aa-4f5e-821f-3f77eec6ebc5/id-preview-6221937e--8ee7e74f-5bd6-41fb-b6f7-cb1f4227fac9.lovable.app-1783482725163.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c29b4278-22aa-4f5e-821f-3f77eec6ebc5/id-preview-6221937e--8ee7e74f-5bd6-41fb-b6f7-cb1f4227fac9.lovable.app-1783482725163.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang={htmlLang[wedding.language.default]}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
