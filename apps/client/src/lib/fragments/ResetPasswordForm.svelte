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
import { resetPasswordSchema } from "$lib/schemas/reset-password-schema";
import { page } from "$app/state";
import { goto } from "$app/navigation";

let submitIsDisabled = $state(false);

const form = superForm(defaults(zod(resetPasswordSchema)), {
    SPA: true,
    validators: zod(resetPasswordSchema),
    onUpdate: async ({ form }) => {
        if (form.valid) {
            submitIsDisabled = true;
            setMessage(form, "Form is Valid");
            const token = page.url.searchParams.get("token");
            if (!token) {
                setError(form, "Token is missing");
                toast.error("Token is missing");
                submitIsDisabled = false;
                return;
            }
            if (form.data.password !== form.data.confirmPassword) {
                setError(form, "Passwords do not match");
                toast.error("Passwords do not match");
                submitIsDisabled = false;
                return;
            }

            const resetPasswordRes = await authClient.resetPassword({
                newPassword: form.data.password,
                token,
            });
            console.log("resetPasswordRes", resetPasswordRes);
            if (resetPasswordRes.error) {
                setError(
                    form,
                    resetPasswordRes.error.message ||
                        resetPasswordRes.error.statusText,
                );
                toast.error(
                    resetPasswordRes.error.message ||
                        resetPasswordRes.error.statusText,
                );
                submitIsDisabled = false;
                return;
            }
            if (resetPasswordRes.data) {
                setMessage(form, "Password reset successfully");
                toast.success(
                    "Password reset successfully, you can now sign in.",
                );
                await new Promise((resolve) => setTimeout(resolve, 500));
                await goto("/sign-in");
                return;
            }
            return;
        }
        setError(form, "Form is not valid");
    },
});

const { form: formData, enhance } = form;
</script>

    <Card.Root class="mx-auto max-w-sm">
        <Card.Header>
            <Card.Title class="text-2xl">Reset Password</Card.Title>
            <Card.Description>Enter your details below to recover your Anime-API account.</Card.Description>
        </Card.Header>
        <Card.Content>
            <form method="post" use:enhance class="grid gap-4">
                <Form.Field {form} name="password" >
                    <Form.Control let:attrs>
                        <Form.Label for="password">Password</Form.Label>
                        <Input type="password" {...attrs} bind:value={$formData.password} />
                    </Form.Control>
                    <Form.Description>
                        This will be your new password.
                    </Form.Description>
                    <Form.FieldErrors />
                </Form.Field>
                <Form.Field {form} name="confirmPassword" >
                    <Form.Control let:attrs>
                        <Form.Label for="confirmPassword">Confirm Password</Form.Label>
                        <Input type="password" {...attrs} bind:value={$formData.confirmPassword} />
                    </Form.Control>
                    <Form.Description>
                        Confirm your new password.
                    </Form.Description>
                    <Form.FieldErrors />
                </Form.Field>
                <Form.Button>Submit</Form.Button>
            </form>
        </Card.Content>
    </Card.Root>
