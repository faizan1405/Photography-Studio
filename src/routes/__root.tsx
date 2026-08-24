import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IntroLoader } from "@/components/IntroLoader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-wine">404</h1>
        <h2 className="mt-4 text-xl text-foreground">This page has left the frame</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-wine px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-cream transition-colors hover:bg-gold hover:text-wine"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-wine">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-wine px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-wine/30 px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-wine"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SPLASH_PHOTOS = [
  "/assets/haldi-mehendi/DSC00187.webp",
  "/assets/haldi-mehendi/DSC00213.webp",
  "/assets/haldi-mehendi/DSC00218.webp",
  "/assets/haldi-mehendi/DSC00430.webp",
  "/assets/haldi-mehendi/DSC00451.webp",
  "/assets/haldi-mehendi/DSC00469.webp",
  "/assets/haldi-mehendi/DSC00660.webp",
  "/assets/haldi-mehendi/DSC00664.webp",
  "/assets/haldi-mehendi/DSC01146.webp",
  "/assets/haldi-mehendi/DSC01156.webp",
  "/assets/haldi-mehendi/DSC01158.webp",
  "/assets/haldi-mehendi/DSC01257.webp",
  "/assets/haldi-mehendi/DSC01283.webp",
  "/assets/haldi-mehendi/DSC01305.webp",
  "/assets/haldi-mehendi/DSC01351.webp",
  "/assets/haldi-mehendi/DSC01361.webp",
  "/assets/haldi-mehendi/DSC01375.webp",
  "/assets/haldi-mehendi/DSC01433.webp",
  "/assets/haldi-mehendi/DSC01434.webp",
  "/assets/haldi-mehendi/DSC01548.webp",
  "/assets/haldi-mehendi/DSC01562.webp",
  "/assets/haldi-mehendi/DSC01574.webp",
  "/assets/haldi-mehendi/DSC01577.webp",
  "/assets/haldi-mehendi/DSC01578.webp",
  "/assets/haldi-mehendi/DSC01621.webp",
  "/assets/haldi-mehendi/DSC01789.webp",
  "/assets/haldi-mehendi/DSC01875.webp",
  "/assets/haldi-mehendi/DSC01905.webp",
  "/assets/haldi-mehendi/IMG_7303.webp",
  "/assets/haldi-mehendi/IMG_7318.webp",
  "/assets/haldi-mehendi/IMG_7340.webp",
  "/assets/haldi-mehendi/IMG_7419.webp",
  "/assets/haldi-mehendi/IMG_7425.webp",
  "/assets/haldi-mehendi/IMG_7431.webp",
  "/assets/haldi-mehendi/IMG_7433.webp",
];

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Clickographers Wedding Films | Indian Wedding Photography" },
      {
        name: "description",
        content:
          "Clickographers Wedding Films — cinematic Indian wedding photography and films from Noida. Pre wedding, sangeet, mehndi and wedding day storytelling.",
      },
      { name: "author", content: "Clickographers Wedding Films" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      // DNS prefetch for the R2 image CDN so the first image request fires
      // before the user scrolls/renders and starts the connection early.
      { rel: "preconnect", href: "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev" },
      { rel: "preload", as: "image", href: "/assets/logo.png", fetchPriority: "high" as const },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
  const [showLoader, setShowLoader] = useState(true);
  const loaderDoneRef = useRef(false);

  // Safety net: if IntroLoader never calls onDone, force-remove the splash
  // after SAFETY_TIMEOUT_MS (8 s) so the homepage is always accessible.
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!loaderDoneRef.current) {
        loaderDoneRef.current = true;
        setShowLoader(false);
      }
    }, 9000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Homepage always renders underneath the splash overlay */}
      <Outlet />
      <WhatsAppButton />

      {/* Splash is an overlay — hidden from DOM entirely after onDone fires */}
      {showLoader && !loaderDoneRef.current && (
        <IntroLoader
          onDone={() => {
            loaderDoneRef.current = true;
            setShowLoader(false);
          }}
        />
      )}
    </QueryClientProvider>
  );
}
