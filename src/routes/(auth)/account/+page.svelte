<script lang="ts">
	export let data;
</script>

<div class="min-h-screen dark:bg-black/10 dark:text-white/90">
	<form action="?/logout" method="POST">
		<button type="submit">Logout</button>
	</form>
	<h1>{data.session.user.email}</h1>
</div>
