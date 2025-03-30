<!-- <script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="m@example.com" required />
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>
					<a href="##" class="ml-auto inline-block text-sm underline">
						Forgot your password?
					</a>
				</div>
				<Input id="password" type="password" required />
			</div>
			<Button type="submit" class="w-full">Login</Button>
			<Button variant="outline" class="w-full">Login with Google</Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Don't have an account?
			<a href="##" class="underline"> Sign up </a>
		</div>
	</Card.Content>
</Card.Root> -->

<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Form from "$lib/components/ui/form";
    import { superForm, defaults, setMessage, setError } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';
    import { emailSignInSchema } from '$lib/schemas';
    import { Input } from "$lib/components/ui/input";

    const form = superForm(defaults(zod(emailSignInSchema)), {
        SPA: true,
        validators: zod(emailSignInSchema),
        onUpdate({form}) {
            if (form.valid) {
                // Perform any action when the form is valid
                console.log(form)
                setMessage(form, 'Form is Valid');
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
		<Card.Description>Enter your email below to login to your account</Card.Description>
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
                <Form.Button>Submit</Form.Button>
            </Form.Field>
        </form>
    </Card.Content>
</Card.Root>
