import { getAccessToken } from "@/services/auth.service";
import jwtDecode from "jwt-decode";

export default async function handler(req, res) {
  try {
    const token = await getAccessToken(); // Obtén el token del servidor
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    const user = jwtDecode(token); // Decodifica el token
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
}