export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    // Redirige vers Discord pour login
    return res.redirect("https://discord.com/api/oauth2/authorize?client_id=TON_CLIENT_ID&redirect_uri=https://TON_BACKEND.vercel.app/api/auth&response_type=code&scope=identify");
  }

  const params = new URLSearchParams();
  params.append("client_id", "1385353384147685567");
  params.append("client_secret", "IHsSY1EFJw4ximuQ5sR-skHFYAord5qn");
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "https://TON_BACKEND.vercel.app/api/auth");
  params.append("scope", "identify");

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const token = await tokenRes.json();

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  const user = await userRes.json();

  // Redirige vers ton site avec les infos du user
  return res.redirect(`https://oneworldvirtual.github.io/main/?username=${encodeURIComponent(user.username)}&avatar=${user.avatar}&id=${user.id}`);
}
