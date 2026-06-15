import "./globals.css";

export const metadata = {
  title: "Dragon Wok",
  description: "Dragon Wok — Kind of Chinese, also Fast Food.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
