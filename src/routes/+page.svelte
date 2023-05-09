<script lang="ts">
    import { images } from "$lib";

    let image: "sam" | "samboozle" = "sam";

    $: src = images[image];

    const switchAvatar = () => {
        switch (image) {
            case "sam":
                image = "samboozle";
                break;
            case "samboozle":
                image = "sam";
                break;
        }
    };
</script>

<div class="hero">
    <img class="h-80 w-80" {src} alt="Samuel's avatar" />
    <button class="btn" on:click={switchAvatar}> switch </button>
    <!-- git commit chart -->
</div>
