"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAppContext } from "contexts/app-context/AppContext";
import { fetchProfileUser, postLoginPath, type CorporateLoginUser } from "@utils/corporateRedirect";

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

    Cookies.set("token", token, { expires: 7 });
    localStorage.setItem("token", token);

    // Google only sends name + email back. Load the full profile so a
    // corporate employee lands in their shop (and the menu knows they are
    // corporate). If that call fails, sign-in still completes as before.
    let cancelled = false;
    (async () => {
      const profile = await fetchProfileUser<CorporateLoginUser & { name?: string; email?: string }>(token);
      if (cancelled) return;
      const userInfo = profile ?? { name, email };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      dispatch({ type: "LOGIN", payload: { authToken: token, userInfo } });

      router.replace(postLoginPath(profile));
    })();

    return () => { cancelled = true; };
  }, [params, dispatch, router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <p>Signing you in...</p>
    </div>
  );
}
