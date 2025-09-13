const CLIENT_ID = "api-client";
const REDIRECT_URI = "http://localhost:5173/authorized"; // React port
const AUTH_SERVER = "http://localhost:9000"; // Spring Authorization Server

// PKCE helper functions
function base64UrlEncode(str) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function generateCodeVerifier() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return base64UrlEncode(array);
}

async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return base64UrlEncode(digest);
}

export async function loginWithOidc() {
    const codeVerifier = await generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    sessionStorage.setItem("pkce_verifier", codeVerifier);

    const authUrl = `${AUTH_SERVER}/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=openid%20api.read&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    window.location.href = authUrl;
}
