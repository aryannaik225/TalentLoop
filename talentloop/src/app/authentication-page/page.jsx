import LoginBox from "@/components/authentication-page/LoginBox";
import Navbar from "@/components/authentication-page/Navbar";

export default function Home () {
  return (
    <div className="w-screen h-screen authen-bg">
      <Navbar />
      <div className="flex w-screen h-full">
        <div className="w-6/12 h-10/12">
          <LoginBox />
        </div>
      </div>
    </div>
  );
}