<template>
  <div class="van-doc">
    <div class="van-doc-container van-doc-row" style="padding: 0; width: 100%">
      <div
        class="van-doc-content van-doc-content--common"
        style="margin-top: 0"
      >
        <section>
          <h1>Props</h1>
          <div class="card">
            <h3 id="props">Props</h3>
            <table>
              <thead>
                <tr>
                  <th>参数1</th>
                  <th>参数2</th>
                  <th>参数3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>参数1</td>
                  <td>参数1</td>
                  <td>参数1</td>
                </tr>
                <tr>
                  <td>参数3</td>
                  <td>参数3</td>
                  <td>参数3</td>
                </tr>
                <tr>
                  <td>参数2</td>
                  <td>参数2</td>
                  <td>参数2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
