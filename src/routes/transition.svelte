<script lang="ts">
    import { fade } from 'svelte/transition';

    export let url: string;
</script>

{#key url}
    <div in:fade class="h-full">
        <slot />
    </div>
{/key}
