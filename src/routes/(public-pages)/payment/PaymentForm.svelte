<script lang="ts">
	import { cart } from 'lib/store';
	import { countries } from './countries';

	let mockData = true;

	const full_name = 'Fake Name';
	const address = 'Fake Address';
	const phone = '123-456-789';
	const city = 'Fake City';
	const postal_code = '12345';
	const country = 'Fake Country';
	const email = 'alex@alex.alex';
</script>

{#if mockData}
	<div class="grid gap-6 mb-6 md:grid-cols-2">
		<input type="hidden" name="cart" value={JSON.stringify($cart)} />
		<div>
			<label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Full Name</label
			>
			<input
				value={full_name}
				name="full_name"
				type="text"
				id="last_name"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Anna Redwood"
				required
			/>
		</div>
		<div>
			<label for="Address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Address</label
			>
			<input
				value={address}
				name="address"
				type="text"
				id="address"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Local street 123"
				required
			/>
		</div>
		<div>
			<label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Phone number</label
			>
			<input
				value={phone}
				name="phone"
				type="tel"
				id="phone"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="123-455-678"
				pattern="/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/"
				required
			/>
		</div>
		<div>
			<label for="City" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>City</label
			>
			<input
				value={city}
				type="text"
				id="city"
				name="city"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="City"
				required
			/>
		</div>
		<div>
			<label for="postal_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Postal Code</label
			>
			<input
				value={postal_code}
				type="text"
				name="postal_code"
				id="postalcode"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Postal Code"
				required
			/>
		</div>
	</div>
	<div class="mb-6">
		<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Email address</label
		>
		<input
			value={email}
			type="email"
			id="email"
			name="email"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="john.doe@company.com"
			required
		/>
	</div>
	<div class="mb-6">
		<label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Country</label
		>
		<select
			name="country"
			id="countries"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			<option selected>Canada</option>
			{#each countries as country}
				<option value={country}>{country}</option>
			{/each}
		</select>
	</div>
	<div class="flex items-start mb-6">
		<div class="flex items-center h-5">
			<input
				id="remember"
				type="checkbox"
				checked={true}
				value=""
				class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
				required
			/>
		</div>
		<label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>I agree with the <a
				href="/legal/terms-&-condition"
				class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a
			>.</label
		>
	</div>
	<button
		type="submit"
		class="text-white
            bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
            items-centerring-blue-800"
	>
		Process Payment
	</button>
{:else}
	<div class="grid gap-6 mb-6 md:grid-cols-2">
		<input type="hidden" name="cart" value={JSON.stringify($cart)} />
		<div>
			<label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Full Name</label
			>
			<input
				value={full_name}
				name="full_name"
				type="text"
				id="last_name"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Anna Redwood"
				required
			/>
		</div>
		<div>
			<label for="Address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Address</label
			>
			<input
				value={address}
				name="address"
				type="text"
				id="address"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Local street 123"
				required
			/>
		</div>
		<div>
			<label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Phone number</label
			>
			<input
				value={phone}
				name="phone"
				type="tel"
				id="phone"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="123-455-678"
				pattern="/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/"
				required
			/>
		</div>
		<div>
			<label for="City" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>City</label
			>
			<input
				value={city}
				type="text"
				id="city"
				name="city"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="City"
				required
			/>
		</div>
		<div>
			<label for="postal_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Postal Code</label
			>
			<input
				value={postal_code}
				type="text"
				name="postal_code"
				id="postalcode"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Postal Code"
				required
			/>
		</div>
	</div>
	<div class="mb-6">
		<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Email address</label
		>
		<input
			value={email}
			type="email"
			id="email"
			name="email"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="john.doe@company.com"
			required
		/>
	</div>
	<div class="mb-6">
		<label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Country</label
		>
		<select
			name="country"
			id="countries"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			<option selected>Canada</option>
			{#each countries as country}
				<option value={country}>{country}</option>
			{/each}
		</select>
	</div>
	<div class="flex items-start mb-6">
		<div class="flex items-center h-5">
			<input
				id="remember"
				type="checkbox"
				checked={true}
				value=""
				class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
				required
			/>
		</div>
		<label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>I agree with the <a
				href="/legal/terms-&-condition"
				class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a
			>.</label
		>
	</div>
	<button
		type="submit"
		class="text-white
            bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
            items-centerring-blue-800"
	>
		Process Payment
	</button>
{/if}
