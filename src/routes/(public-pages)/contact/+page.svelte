<script lang="ts">
	import { MailIcon, PhoneIcon, MapPinIcon, GithubIcon } from 'svelte-feather-icons';
	import { clipboard } from '@skeletonlabs/skeleton';

	let message = '';
	let timer: any;

	function addedToClipboard() {
		message = '';
		clearTimeout(timer);
		message = 'Copied to clipboard';
		timer = setTimeout(() => {
			message = '';
		}, 1500);
	}

	const contacts = [
		{
			type: 'email',
			content: 'dev@stencukpage.com',
			isUrl: false,
			svg: MailIcon
		},
		{
			type: 'phone',
			content: '555-555-5555',
			isUrl: false,
			svg: PhoneIcon
		},
		{
			type: 'address',
			content: '123 Main Street',
			isUrl: false,
			svg: MapPinIcon
		},
		{
			type: 'github',
			content: 'https://github.com/MrEpoch/Clothes-shop',
			isUrl: true,
			svg: GithubIcon
		}
	];
</script>

<div class="min-h-screen dark:bg-black/10 relative dark:text-white/90">
	<div
		class="max-w-screen-xl flex flex-wrap justify-center
        mx-auto px-4 lg:p-16 gap-[2rem]"
	>
		{#each contacts as contact}
			<div class="flex items-center">
				{#if contact.isUrl}
					<a
						href={contact.content}
						target="_blank"
						rel="noreferrer"
						class="flex flex-col gap-3 items-center h-full w-full
                        justify-center min-w-[16rem] bg-gray-100 dark:bg-gray-700 aspect-video rounded-xl"
					>
						<svelte:component this={contact.svg} class="w-8 h-8" size="24" />
						<p class="text-xl font-bold">{contact.type}</p>
					</a>
				{:else}
					<button
						on:click={addedToClipboard}
						use:clipboard={contact.content}
						class="flex items-center flex-col gap-3 justify-center h-full w-full
                        dark:bg-gray-700 bg-gray-100 min-w-[16rem] aspect-video rounded-xl"
					>
						<svelte:component this={contact.svg} class="w-8 h-8" size="24" />
						<p class="text-xl font-bold">{contact.type}</p>
					</button>
				{/if}
			</div>
		{/each}
	</div>
	{#if message.length > 0}
		<p
			class="fixed right-3 bottom-5 rounded-xl px-6 py-4 font-bold
            bg-gradient-to-r from-violet-400 to-pink-400
            text-center text-sm text-white"
		>
			{message}
		</p>
	{/if}
</div>
