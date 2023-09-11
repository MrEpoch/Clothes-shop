<script lang="ts">
	import CartItems from 'components/CartItems.svelte';
	import { cart } from 'lib/store';
	import PaymentForm from './PaymentForm.svelte';
	import Stepper from './Stepper.svelte';
	import CartForm from './CartForm.svelte';
	import { browser } from '$app/environment';

	let currentStep = 0;

    export let form;

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
		currentStep += 1;
	}

	function prevStep() {
		if (currentStep === 0) return;
		currentStep -= 1;
	}
</script>

<div class="min-h-screen w-full flex flex-col dark:bg-black/10 dark:text-white/90">
	<Stepper {currentStep} />
	<div class="w-full min-h-full flex flex-col max-w-7xl mx-auto p-4">
		{#if currentStep === 0}
			<CartForm />
			<button
				type="submit"
				class="text-white
                bg-blue-700 hover:bg-blue-800 focus:ring-4
                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                items-centerring-blue-800"
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
</div>
