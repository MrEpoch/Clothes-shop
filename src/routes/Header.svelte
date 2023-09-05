<script lang="ts">
    import Logo from "assets/logo.png";
    import LogoDark from "assets/VelvetLine-bg.png";
    import { theme } from "lib/store";

    let hidden = true;
    export let showCart: any;

    function SwitchTheme() {
        theme.set($theme === "dark" ? "light" : "dark");
    }

</script>

<nav class="dark:bg-black/10 dark:text-white/90">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center">
        <div class="sm:h-24 h-12 w-12 mr-3 sm:w-24 scale-125">
            <img src={$theme === "dark" ? LogoDark : Logo} class="h-full w-full" alt="Alexandr Stenčuk Logo" />
        </div>
    </a>
    <button on:click={() => hidden = !hidden} type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class={`${hidden ? "hidden" : ""} w-full md:block md:w-auto`} id="navbar-default">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 
            rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0
            md:dark:bg-transparent dark:border-gray-700 dark:bg-black/90 md:items-center"
        >
            <li>
                <a href="/catalog" class="block py-2 text-xl pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                ">Catalog</a>
            </li>

            <li>
              <a href="/contact" class="block py-2 text-xl pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
            </li>
            <button on:click={showCart} class="flex items-center md:justify-center w-full text-start 
                py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 
                dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <svg class="w-8 dark:text-white text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Cart</title><path fill="currentColor" d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" /></svg>
            </button>
            <button on:click={SwitchTheme} class="flex items-center md:justify-center w-full text-start 
                py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 
                dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <svg class="w-8 dark:text-white text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Dark Mode</title><path fill="currentColor" d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z" /></svg>
            </button>
        </ul>
    </div>
  </div>
</nav>

