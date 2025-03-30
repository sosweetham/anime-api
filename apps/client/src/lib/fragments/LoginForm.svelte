<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Form from "$lib/components/ui/form";
    import { superForm, defaults, setMessage, setError } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';
    import { emailSignInSchema } from '$lib/schemas';
    import { Input } from "$lib/components/ui/input";
    import { toast } from "svelte-sonner";
    import { authClient } from "$lib/auth-client";
    import { Checkbox } from "$lib/components/ui/checkbox";

    const form = superForm(defaults({rememberMe: false},zod(emailSignInSchema)), {
        SPA: true,
        validators: zod(emailSignInSchema),
        onUpdate: async ({form}) => {
            if (form.valid) {
                console.log(form)
                setMessage(form, 'Form is Valid');
                const signInRes = await authClient.signIn.email({
                    email: form.data.email,
                    password: form.data.password,
                    rememberMe: form.data.rememberMe,
                    callbackURL: '/'
                })
                if (signInRes.error) {
                    setError(form, signInRes.error.message || signInRes.error.statusText);
                    toast.error(signInRes.error.message || signInRes.error.statusText);
                    return;
                }
                if (signInRes.data) {
                    setMessage(form, 'Login Successful');
                    toast.success(`Successfully logged in as ${signInRes.data.user.email}`);
                    return;
                }
                return;
            }
            setError(form, 'Form is Invalid');
        }
    })

    const  {form: formData, enhance} = form
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your details below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
        <form method="post" use:enhance class="grid gap-4">
            <Form.Field {form} name="email" >
                <Form.Control let:attrs>
                    <Form.Label for="email">Email</Form.Label>
                    <Input {...attrs} bind:value={$formData.email} />
                </Form.Control>
                <Form.Description>
                    This is the email you used to register.
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
                    <!-- You can manage your mobile notifications in the <a
                        href="/examples/forms">mobile settings</a
                    > page. -->
                    This will keep you logged in for a while.
                    </Form.Description>
                </div>
                <input name={attrs.name} value={$formData.rememberMe} hidden />
                </Form.Control>
            </Form.Field>
            <Form.Button>Submit</Form.Button>
        </form>
    </Card.Content>
</Card.Root>
