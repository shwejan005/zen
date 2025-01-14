import { Geist, Geist_Mono, Fugaz_One, Open_Sans, League_Spartan } from "next/font/google"; // Import Fugaz_One
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const openSans = Open_Sans({
  subsets: ["latin"]
})

const leagueSpartan = League_Spartan({
  subsets: ["latin"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"], 
});

export const metadata = {
  title: "Zen",
  description: "Track Your Mood Daily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${openSans.className} bg-[#dffdd1] text-black antialiased w-full max-w-[1600px] mx-auto text-sm sm:text-base min-h-screen flex flex-col`}
        >
          <Header />
            {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
