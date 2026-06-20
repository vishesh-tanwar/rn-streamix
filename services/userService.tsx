import { url } from "@/utils/strings";

export const login = async (email: string, password: string) => {
  try {
    const json = JSON.stringify({
      email: email,
      password: password,
    });

    const res = await fetch(`${url}:8080/user/login`, {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data && data.token) {
      return data.token;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    return undefined; // Return undefined in case of an error
  }
};
export const validateToken = async (token: string): Promise<Boolean> => {
  try {
    const res = await fetch(`${url}:8080/user/validateToken`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data["isValid"] as Boolean;
  } catch (error) {
    console.log(error);
    return false;
  }
};
