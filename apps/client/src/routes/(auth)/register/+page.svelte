<script lang="ts">
import { authClient } from "../../../lib/auth-client";

export const handleSignUp = async () => {
    const signUpRes = await authClient.signUp.email({
        email: "sosweetham@gmail.com",
        password: "*Shit@223*",
        name: "sosweetham",
    });
    console.log(signUpRes);
};

export const handleLogout = async () => {
    const logoutRes = await authClient.signOut();
    console.log(logoutRes);
};

export const handleLogin = async () => {
    const { data, error } = await authClient.signIn.email({
        email: "sosweetham@gmail.com",
        password: "*Shit@223*",
    });
    console.log(data, error);
};

export const getSelf = async () => {
    const { data, error } = await authClient.getSession();
    console.log(data, error);
};
</script>

<button onclick={handleSignUp}>
    Sign Up
</button>

<button onclick={handleLogout}>
    Logout
</button>

<button onclick={handleLogin}>
    Login
</button>

<button onclick={getSelf}>
    Me
</button>