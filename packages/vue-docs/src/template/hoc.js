/*eslint-disable*/
import { h } from "vue";

export default function Hoc(WrappedComponent) {
  return {
    render() {
      return h(WrappedComponent);
    },
  };
}
