<script setup lang="ts">
import Image from "../../components/ImagePoly/_ImagePoly.vue";
import NavDrawerWrapper from "../../components/NavDrawerWrapper/_NavDrawerWrapper.vue";
import { items } from "../../utils/variables/random";
import Routes from "../../utils/variables/routes";
import { inject } from "vue";
import type MyImage from "../../utils/types/MyImage";
import type { Router } from "vue-router";

const router = inject("router", {}) as Router;
const id = router.currentRoute.value.params.itemUUID;
const selectedItem = items.find((item) => item.itemUUID === id);

if (selectedItem === undefined) {
	void router.push(Routes._404);
}
</script>

<template>
	<NavDrawerWrapper>
		<div class="mt-3 px-6 lg:mt-0 lg:pl-0 lg:pr-3">
			<div class="h-[500px] w-full">
				<Image
					:image="selectedItem?.cover ?? {} as MyImage"
					class="h-full"
					image-class="h-full object-cover"
				/>
			</div>
		</div>
	</NavDrawerWrapper>
</template>
