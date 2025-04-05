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
import { authClient } from "$lib/auth-client";
import { Checkbox } from "$lib/components/ui/checkbox";
import { goto } from "$app/navigation";
import { usernameSignInSchema } from "$lib/schemas";
import { Turnstile } from "svelte-turnstile";
import { PUBLIC_NODE_ENV, PUBLIC_TURNSTILE_SITEKEY } from "$env/static/public";
import { runtime } from "$lib/controllers/runtime.svelte";

let turnstileToken: string | null = null;

const getTurnstileToken = (
    e: CustomEvent<{ token: string; preClearanceObtained: boolean }>,
) => {
    turnstileToken = e.detail.token;
};

const form = superForm(
    defaults({ rememberMe: false }, zod(usernameSignInSchema)),
    {
        SPA: true,
        validators: zod(usernameSignInSchema),
        onUpdate: async ({ form }) => {
            if (form.valid) {
                if (!turnstileToken) {
                    setError(form, "Turnstile token is missing");
                    toast.error("Please perform the captcha!");
                    return;
                }
                setMessage(form, "Form is Valid");
                const signInRes = await authClient.signIn.username({
                    username: form.data.username,
                    password: form.data.password,
                    rememberMe: form.data.rememberMe,
                    fetchOptions: {
                        headers: {
                            "x-captcha-response": turnstileToken,
                        },
                    },
                });
                if (signInRes.error) {
                    setError(
                        form,
                        signInRes.error.message || signInRes.error.statusText,
                    );
                    toast.error(
                        signInRes.error.message || signInRes.error.statusText,
                    );
                    return;
                }
                if (signInRes.data) {
                    setMessage(form, "Login Successful");
                    toast.success(
                        `Successfully logged in as ${signInRes.data.user.email}, redirecting...`,
                    );
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    runtime.signedIn = true;
                    await goto("/"); // Not using the authClient to redirect because it hard refreshes the page
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

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Sign In</Card.Title>
		<Card.Description>Enter your details below to sign in to your Anime-API account.</Card.Description>
	</Card.Header>
	<Card.Content>
        <form method="post" use:enhance class="grid gap-4">
            <Form.Field {form} name="username" >
                <Form.Control let:attrs>
                    <Form.Label for="username">Username</Form.Label>
                    <Input {...attrs} bind:value={$formData.username} />
                </Form.Control>
                <Form.Description>
                    This is the username you used to register.
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="password" >
                <Form.Control let:attrs>
                    <Form.Label for="password">Password</Form.Label>
                    <Input type="password" {...attrs} bind:value={$formData.password} />
                </Form.Control>
                <Form.Description>
                    The password you used to register.
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Turnstile on:turnstile-callback={getTurnstileToken} siteKey={PUBLIC_NODE_ENV=="dev"?"3x00000000000000000000FF":PUBLIC_TURNSTILE_SITEKEY} theme={runtime.themeManager.computedTheme} />
            <Form.Field
                {form}
                name="rememberMe"
                class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
            >
                <Form.Control let:attrs>
                <Checkbox {...attrs} bind:checked={$formData.rememberMe} />
                <div class="space-y-1 leading-none">
                    <Form.Label>Remember Me</Form.Label>
                    <Form.Description>
                    This will keep you logged in for a while.
                    </Form.Description>
                </div>
                <input name={attrs.name} value={$formData.rememberMe} hidden />
                </Form.Control>
            </Form.Field>
            <Form.Button>Submit</Form.Button>
        </form>
    </Card.Content>
    <Card.Footer class="flex flex-col gap-4 items-start">
        <Card.Description>
            Don't have an account? <a href="/sign-up">Sign Up</a>
        </Card.Description>
        <Card.Description>
            <a href="/forgot-password">Forgot Password?</a>
        </Card.Description>
    </Card.Footer>
</Card.Root>
