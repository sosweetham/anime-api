<script lang="ts">
import * as Card from "$lib/components/ui/card";
import * as Form from "$lib/components/ui/form";
import {
    superForm,
    defaults,
    setMessage,
    setError,
} from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { Input } from "$lib/components/ui/input";
import { toast } from "svelte-sonner";
import { Turnstile } from "svelte-turnstile";
import { PUBLIC_TURNSTILE_SITEKEY, PUBLIC_NODE_ENV } from "$env/static/public";
import { usernameSignUpSchema } from "$lib/schemas";
import { authClient } from "$lib/auth-client";
import { goto } from "$app/navigation";
import { runtime } from "$lib/controllers/runtime.svelte";

let turnstileToken: string | null = null;

const getTurnstileToken = (
    e: CustomEvent<{ token: string; preClearanceObtained: boolean }>,
) => {
    turnstileToken = e.detail.token;
    console.log("Turnstile token: ", turnstileToken);
};

const form = superForm(
    defaults({ rememberMe: false }, zod(usernameSignUpSchema)),
    {
        SPA: true,
        validators: zod(usernameSignUpSchema),
        onUpdate: async ({ form }) => {
            if (form.valid) {
                if (form.data.password !== form.data.confirmPassword) {
                    setError(form, "Passwords do not match");
                    toast.error("Passwords do not match");
                    return;
                }
                if (!turnstileToken) {
                    setError(form, "Turnstile token is missing");
                    toast.error("Please perform the captcha!");
                    return;
                }
                setMessage(form, "Form is Valid");
                const signUpRes = await authClient.signUp.email({
                    email: form.data.email,
                    password: form.data.password,
                    username: form.data.username,
                    name: form.data.username,
                    fetchOptions: {
                        headers: {
                            "x-captcha-response": turnstileToken,
                        },
                    },
                });
                if (signUpRes.error) {
                    setError(
                        form,
                        signUpRes.error.message || signUpRes.error.statusText,
                    );
                    toast.error(
                        signUpRes.error.message || signUpRes.error.statusText,
                    );
                    return;
                }
                if (signUpRes.data) {
                    setMessage(form, "Sign Up Successful");
                    toast.success(
                        `Successfully signed up as ${signUpRes.data.user.email}, redirecting...`,
                    );
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    await goto("/sign-in"); // Not using the authClient to redirect because it hard refreshes the page
                    return;
                }
                return;
            }
            setError(form, "Form is Invalid");
        },
    },
);

const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto max-w-sm max-h-[calc(100vh-5rem)] overflow-auto">
    <Card.Header>
        <Card.Title class="text-2xl">Sign Up</Card.Title>
        <Card.Description>Enter your details below to sign up for an Anime-API account.</Card.Description>
    </Card.Header>
    <Card.Content>
        <form method="post" use:enhance class="grid gap-4">
            <Form.Field {form} name="name" >
                <Form.Control let:attrs>
                    <Form.Label for="namel">Name</Form.Label>
                    <Input {...attrs} bind:value={$formData.name} />
                </Form.Control>
                <Form.Description>
                    Your name.
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="email" >
                <Form.Control let:attrs>
                    <Form.Label for="email">Email</Form.Label>
                    <Input type="email" {...attrs} bind:value={$formData.email} />
                </Form.Control>
                <Form.Description>
                    This is the email that will be associated with your account.
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="username" >
                <Form.Control let:attrs>
                    <Form.Label for="username">Username</Form.Label>
                    <Input {...attrs} bind:value={$formData.username} />
                </Form.Control>
                <Form.Description>
                    This is the username that will be associated with your account.
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="password" >
                <Form.Control let:attrs>
                    <Form.Label for="password">Password</Form.Label>
                    <Input type="password" {...attrs} bind:value={$formData.password} />
                </Form.Control>
                <Form.Description>
                    This the password that will be used to secure your account.
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="confirmPassword" >
                <Form.Control let:attrs>
                    <Form.Label for="confirmPassword">Confirm Password</Form.Label>
                    <Input type="password" {...attrs} bind:value={$formData.confirmPassword} />
                </Form.Control>
                <Form.Description>
                    Be sure that your password is set correctly!
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Turnstile on:turnstile-callback={getTurnstileToken} siteKey={PUBLIC_NODE_ENV=="development"?"3x00000000000000000000FF":PUBLIC_TURNSTILE_SITEKEY} theme={runtime.themeManager.computedTheme} />
            <Form.Button>Submit</Form.Button>
        </form>
    </Card.Content>
    <Card.Footer class="flex flex-col gap-4 items-start">
        <Card.Description>
            Already have an account? <a href="/sign-in">Sign In</a>
        </Card.Description>
    </Card.Footer>
</Card.Root>
