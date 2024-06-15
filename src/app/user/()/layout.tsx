import NavLoggedIn from "@/components/Login/NavLoggedIn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <NavLoggedIn />
        </nav>
        <div className="font-poppins mx-4 md:mx-8 lg:mx-[10%] mt-10">{children}</div>
      </body>
    </html>
  );
}
