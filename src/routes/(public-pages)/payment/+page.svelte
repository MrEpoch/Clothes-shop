<script lang="ts">
	import PaymentForm from './PaymentForm.svelte';
	import Stepper from './Stepper.svelte';
	import CartForm from './CartForm.svelte';
	import { browser } from '$app/environment';
	import { cart } from 'lib/store';

	let currentStep = 0;

	export let form;
	let message = '';

	if (form?.success) currentStep = 3;

	if (form?.url) {
		browser && wait(2000).then(() => window.location.replace(form?.url as string));
	}

	async function wait(time: number) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(time);
			}, time);
		});
	}

	function nextStep() {
		if (currentStep === 2) return;
		if ($cart.length === 0) {
			message = 'Cart is empty';
			setTimeout(() => {
				message = '';
			}, 1000);
			return;
		}
		currentStep += 1;
	}
</script>

<div class="min-h-screen w-full relative flex flex-col dark:bg-darkmode-500 dark:text-gray-100">
	<Stepper {currentStep} />
	<div class="w-full min-h-full flex flex-col max-w-7xl mx-auto p-4">
		{#if currentStep === 0}
			<CartForm />
			<button
				type="submit"
				class="text-white
                bg-violet-700 hover:bg-violet-800 focus:ring-4
                focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5
                items-centerring-violet-800"
				on:click={nextStep}
			>
				Shipping Information
			</button>
		{:else if currentStep === 1}
			<form method="POST">
				<PaymentForm />
			</form>
		{:else}
			<div class="flex flex-col gap-[4rem] items-center justify-center w-full min-h-screen">
				<div
					class="animate-spin text-black dark:text-white rounded-full h-32 w-32 border-b-2 border-gray-red"
				/>
				<p class="text-2xl font-bold mt-4">Redirecting to Stripe</p>
			</div>
		{/if}
	</div>
	{#if form?.failed}
		<div
			id="alert-border-2"
			class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300
        bg-red-50 dark:text-red-400 dark:bg-gray-800 absolute bottom-23 right-10 dark:border-red-800"
			role="alert"
		>
			<svg
				class="flex-shrink-0 w-4 h-4"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
				/>
			</svg>
			<div class="ml-3 text-sm font-medium">
				{form?.message}
			</div>
			<button
				type="button"
				on:click={() => (form.failed = false)}
				class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
				data-dismiss-target="#alert-border-2"
				aria-label="Close"
			>
				<svg
					class="w-3 h-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
			</button>
		</div>
	{/if}
	{#if message.length > 0}
		<p
			class="fixed right-3 bottom-5 rounded-xl px-6 py-4 font-bold
            bg-red-400
            text-center text-sm text-white"
		>
			{message}
		</p>
	{/if}
</div>
