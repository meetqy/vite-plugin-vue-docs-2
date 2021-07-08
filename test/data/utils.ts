// @ts-nocheck

export function defineComponent(content) {
  return `<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  ${content}
})
</script>`;
}

export function exportDefault(content) {
  return `<script lang="ts">
export default {
  name: 'HelloWorld',
  ${content}
}
</script>`;
}
