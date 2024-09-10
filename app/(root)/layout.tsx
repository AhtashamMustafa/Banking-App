import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstname: "Ahtasham", lastname: "Mustafa" ,$id:"1",email:"ahtasham@example.com",userId:"2",dwollaCustomerUrl:"example",dwollaCustomerId:"example",firstName:"example",lastName:"example",address1:"example",city:"example",state:"example",postalCode:"example",dateOfBirth:"example",ssn:"example"};

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src="./icons/logo.svg"
            width={30}
            height={30}
            alt="Menu Icon"
          />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
