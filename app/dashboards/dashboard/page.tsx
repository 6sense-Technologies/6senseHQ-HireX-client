"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);
  const auth = useSelector((state: RootState) => state.auth.auth);

  const checkToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
    }
  };

  useEffect(() => {
    checkToken();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "accessToken") {
        checkToken();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    router.push("/login");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  console.log(user);

  return (
    <div className="dashboard-area w-full bg-white px-4">
      <div className="upper-area mt-0 flex justify-between">
        <h1 className="text-3xl font-bold mt-1 lg:mt-1 lg:ml-5">
          Dashboard Details
        </h1>
      </div>
    </div>
  );
};

export default Page;