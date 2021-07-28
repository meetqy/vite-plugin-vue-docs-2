// @ts-nocheck
import { defineComponent } from "./utils";

export const methods1 = defineComponent(`methods: {
    /**
     * @vue-docs-ref
     * @description 这是一个描述
     * @param {string} p1 参数说明
     * @param {object} [options]   可选参数
     * @return $ {name: number, version: string}
     */
    say(p1: string, options?: object) {
      return {
        name: 'vue-docs',
        version: 'v0.0.6'
      }
    }
}`);

export const methods2 = defineComponent(`methods: {
    /**
     * @vue-docs-ref
     * @description 这是一个描述
     * @param {object} [options]   可选参数
     * @return $ {name: number, version: string}
     */
    say(p1: string, options?: object) {
      return {
        name: 'vue-docs',
        version: 'v0.0.6'
      }
    }
}`);

export const methods3 = defineComponent(`methods: {
    /**
     * @vue-docs-ref
     * @description 这是一个描述
     * @param {object} [options]   可选参数
     */
    say(p1: string, options?: object) {
      return {
        name: 'vue-docs',
        version: 'v0.0.6'
      }
    }
}`);

export const methods4 = defineComponent(`methods: {
    /**
     * @vue-docs-ref
     * @description 这是一个描述
     */
    say(p1: string, options?: object) {
      return {
        name: 'vue-docs',
        version: 'v0.0.6'
      }
    }
}`);

export const methods5 = defineComponent(`methods: {
    /**
     * @vue-docs-ref
     */
    say(p1: string, options?: object) {
      return {
        name: 'vue-docs',
        version: 'v0.0.6'
      }
    }
}`);

export const methods6 = defineComponent(`methods: {
    /**
     * 
     */
    say(p1: string, options?: object) {
      return {
        name: 'vue-docs',
        version: 'v0.0.6'
      }
    }
}`);

export const methods7 = defineComponent(`methods: {
    // @vue-docs-ref
    say(p1: string, options?: object) {
      return {
        name: 'vue-docs',
        version: 'v0.0.6'
      }
    }
}`);
