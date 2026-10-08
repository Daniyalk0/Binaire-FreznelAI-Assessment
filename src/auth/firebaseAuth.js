import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

class FirebaseAuth {
  async signup(email, password) {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return result.user;
  }

  async login(email, password) {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return result.user;
  }

  async logout() {
    await signOut(auth);
  }
}

export default FirebaseAuth;