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
import { Turnstile } from "svelte-turnstile";
    import { forgotPasswordSchema } from "$lib/schemas/forgot-password-schema";
    import { PUBLIC_NODE_ENV, PUBLIC_TURNSTILE_SITEKEY, PUBLIC_CLIENT_HOST } from "$env/static/public";

let turnstileToken: string | null = null;

const getTurnstileToken = (e: CustomEvent<{ token: string; preClearanceObtained: boolean; }>) => {
    turnstileToken = e.detail.token;
}

let submitIsDisabled = $state(false);

const form = superForm(
    defaults(zod(forgotPasswordSchema)),
    {
        SPA: true,
        validators: zod(forgotPasswordSchema),
        onUpdate: async ({ form }) => {
            if (form.valid) {
                submitIsDisabled = true;
                if (!turnstileToken) {
                        setError(form, "Turnstile token is missing");
                        toast.error("Please perform the captcha!");
                        return;
                    }
                setMessage(form, "Form is Valid");
                const forgotPasswordRes = await authClient.forgetPassword({
                    email: form.data.email,
                    redirectTo: `${PUBLIC_CLIENT_HOST}/reset-password`,
                    fetchOptions: {
                        headers: {
                            "x-captcha-response": turnstileToken
                        }
                    }
                })
                if (forgotPasswordRes.error) {
                    setError(
                        form,
                        forgotPasswordRes.error.message || forgotPasswordRes.error.statusText,
                    );
                    toast.error(
                        forgotPasswordRes.error.message || forgotPasswordRes.error.statusText,
                    );
                    submitIsDisabled=false
                    return;
                }
                if (forgotPasswordRes.data) {
                    setMessage(form, "Check your email for a reset link");
                    toast.success("Check your email for a reset link");
                    submitIsDisabled=false
                    return;
                }
                return
            }
            setError(form, "Form is not valid");
        }
    }
)

const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Forgot Password?</Card.Title>
		<Card.Description>Enter your details below to recover your Anime-API account.</Card.Description>
	</Card.Header>
	<Card.Content>
        <form method="post" use:enhance class="grid gap-4">
            <Form.Field {form} name="email" >
                <Form.Control let:attrs>
                    <Form.Label for="username">Email</Form.Label>
                    <Input {...attrs} bind:value={$formData.email} />
                </Form.Control>
                <Form.Description>
                    This is the email you used to register.
                </Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Turnstile on:turnstile-callback={getTurnstileToken} siteKey={PUBLIC_NODE_ENV=="dev"?"3x00000000000000000000FF":PUBLIC_TURNSTILE_SITEKEY} />
            <Form.Button disabled={submitIsDisabled}>Submit</Form.Button>
        </form>
    </Card.Content>
</Card.Root>
