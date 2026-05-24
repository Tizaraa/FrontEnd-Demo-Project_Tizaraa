"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAppContext } from "contexts/app-context/AppContext";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { dispatch } = useAppContext();

  useEffect(() => {
    const token = params.get("token");
    const name  = params.get("name")  ?? "";
    const email = params.get("email") ?? "";

    if (!token) {
      router.replace("/login");
      return;
    }

    const userInfo = { name, email };

    Cookies.set("token", token, { expires: 7 });
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    dispatch({ type: "LOGIN", payload: { authToken: token, userInfo } });

    const redirectPath = sessionStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      sessionStorage.removeItem("redirectAfterLogin");
      router.replace(redirectPath);
    } else {
      router.replace("/");
    }
  }, [params, dispatch, router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <p>Signing you in...</p>
    </div>
  );
}
