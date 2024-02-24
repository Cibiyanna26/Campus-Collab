import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "CampusCollab",
//   description: "CampusCollab",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  );
}
