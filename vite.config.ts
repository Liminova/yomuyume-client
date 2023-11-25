import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(
		{
			template: {
				compilerOptions: {
					isCustomElement: tag => {
						const customElements = ['md-', 'swiper-'];
						return customElements.some((customElement) => tag.startsWith(customElement));
					}
				}
			}
		}
	)]
});
