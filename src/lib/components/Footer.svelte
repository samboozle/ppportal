<script lang="ts">
    import { sillyText } from "$lib/stores";
</script>

<footer class="py-4 bg-transparent fixed bottom-0 w-screen flex justify-center">
    <p class="text-xs text-shadow-lg hidden sm:block">
        {$sillyText("built with Svelte and daisyUI")} ==> {$sillyText("@samboozle 2023")}
    </p>
    <p class="text-xs text-shadow-lg block sm:hidden">
        {$sillyText("@samboozle 2023")}
    </p>
</footer>
