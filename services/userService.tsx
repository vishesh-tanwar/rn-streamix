export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`http://localhost:8081/videos/upload`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const token = await res.json();
    return token;
  } catch (error) {}
};
