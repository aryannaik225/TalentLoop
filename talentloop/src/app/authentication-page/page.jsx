import LoginBox from "@/components/authentication-page/LoginBox";
import LoginBox2 from "@/components/authentication-page/LoginBox2";
import Navbar from "@/components/authentication-page/Navbar";

export default function Home () {
  return (
    <div className="w-screen h-auto min-h-screen md:h-screen authen-bg">
      <Navbar />
      <div className="flex flex-col md:flex-row w-screen h-full items-center justify-center">
        <div className="w-6/12 py-10">
          <LoginBox />
        </div>
        <div className="w-6/12 py-10">
          <LoginBox2 />
        </div>
      </div>
    </div>
  );
}