import { useEffect } from "react";

export default function Authorized() {
    useEffect(() => {
        console.log("Authorized component mounted");

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const codeVerifier = sessionStorage.getItem("pkce_verifier");

        if (code && codeVerifier) {
            // Call backend endpoint instead of /oauth2/token directly
            fetch("http://localhost:9000/auth/exchange", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, code_verifier: codeVerifier }),
            })
                .then(async (res) => {
                    if (!res.ok) {
                        const text = await res.text();
                        console.error("Token exchange failed:", res.status, text);
                        return;
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data) {
                        console.log("Tokens received:", data);
                        // Store tokens in sessionStorage or state
                        sessionStorage.setItem("access_token", data.access_token);
                        if (data.id_token) sessionStorage.setItem("id_token", data.id_token);
                        // Redirect to your app home or dashboard
                        window.location.href = "/";
                    }
                })
                .catch((err) => console.error("Fetch error:", err));
        } else {
            console.error("Authorization code or PKCE verifier missing");
        }
    }, []);

    return <div>Authorizing...</div>;
}
