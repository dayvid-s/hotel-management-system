"use client"
import { searchUser } from "@/features/authSlice";
import { dispatch, store } from "@/store";
import { Manrope } from "next/font/google";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { Providers } from "./providers";

const manrope = Manrope({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    dispatch(searchUser());
  }, []);

  return (
    <Provider store={store}>
      <html lang="pt-BR" >
        <body className={manrope.className} >
          <Providers>{children}</Providers>
        </body>
      </html >
    </Provider>
  );
}
