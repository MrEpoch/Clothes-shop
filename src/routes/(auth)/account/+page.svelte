<script lang="ts">
	export let data;
</script>

<div class="min-h-screen w-full flex items-center justify-center flex-col gap-[2rem] relative dark:bg-black/10 dark:text-white/90">
	<form action="?/logout" method="POST">
        <button class="text-white bg-blue-700 py-3 px-3 rounded-full absolute top-1 right-5" type="submit">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>exit-to-app</title><path fill="currentColor"
                d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3
                19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z" /></svg>
        </button>
	</form>
    <div class="flex items-center gap-[1rem] border border-black dark:border-white rounded-xl justify-center p-5">
        <svg class="w-6 h-6 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>email-outline</title><path fill="currentColor"
        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" /></svg>
        <h1>{data.session.user.email}</h1>
    </div>
</div>
