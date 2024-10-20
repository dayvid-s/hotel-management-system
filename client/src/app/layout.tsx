"use client"
import { store } from "@/store";
import { Provider } from "react-redux";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="pt-BR">
        <body >
          <Providers>{children}</Providers>
        </body>
      </html >
    </Provider>
  );
}
