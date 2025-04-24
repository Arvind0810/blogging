// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthLayout from "@/Components/login_layout"; // safe now

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "A blogging site",
  description: "On this website we serve you the best blogs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@uiw/react-md-editor@3.18.6/dist/markdown-editor.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@uiw/react-markdown-preview@3.18.6/dist/markdown.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthLayout>{children}</AuthLayout>
      </body>
    </html>
  );
}
