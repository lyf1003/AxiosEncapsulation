<template>
  <div class="about">
    <h1>{{ msg }}</h1>
    {{ initVar }}
    {{store.state.sum}}
    <button @click="b">测试</button>
    <HelloWorld :msg="msg"></HelloWorld>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "../components/HelloWorld.vue";
import {useStore} from "vuex"

@Options({
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: "This is an about page1",
    };
  },
  methods: {
    a() {
      console.log(1);
    },
  },
})
export default class About extends Vue {
  msg!: string
  public initVar!: string
  public store = useStore()
  public mounted(): void {
    this.initVar = "测试"
  }
  public b() {
    let anyThing: any = "hello"
    this.store.dispatch("setSum",1)
  }
}
</script>
<style lang="sass">
</style>
