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

<div class="min-h-screen py-[5rem] dark:bg-darkmode-500 relative dark:text-gray-100">
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
                        hover:bg-gradient-to-r from-violet-500 to-pink-500
                        justify-center min-w-[12rem] sm:min-w-[16rem] bg-gray-100 dark:bg-gray-700 aspect-video rounded-xl"
					>
						<svelte:component this={contact.svg} class="sm:w-8 w-6 h-6 sm:h-8" size="24" />
						<p class="sm:text-xl text-lg font-bold">{contact.type}</p>
					</a>
				{:else}
					<button
						on:click={addedToClipboard}
						use:clipboard={contact.content}
						class="flex flex-col gap-3 items-center h-full w-full
                        hover:bg-gradient-to-r from-violet-500 to-pink-500
                        justify-center min-w-[12rem] sm:min-w-[16rem] bg-gray-100 dark:bg-gray-700 aspect-video rounded-xl"
					>
						<svelte:component this={contact.svg} class="sm:w-8 w-6 h-6 sm:h-8" size="24" />
						<p class="sm:text-xl text-lg font-bold">{contact.type}</p>
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
