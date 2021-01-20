<script>
  import Icon from "./Icon.svelte";
  export let expend = {
    count: 0,
    sum: 0,
    category: [],
  };
  export let expendMax = {
    count: {
      name: "",
      count: 0,
      sum: 0,
    },
    sum: {
      name: "",
      count: 0,
      sum: 0,
    },
  };
  const colorList = ["blue", "orange", "red"];
</script>

<div class="report">
  <div class="report-header">校园卡 2020 年度报告</div>
  <div class="report-expend">
    <svg
      t="1611122650060"
      class="report-bg-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4012"
      width="64"
      height="64"
      ><path
        d="M652.117333 949.973333l-498.176-2.645333 2.645334-850.602667 745.813333 2.645334v597.930666c0 139.221333-112.725333 252.757333-250.282667 252.757334v-0.085334z m29.312-614.997333c16.896 0 28.416-11.52 28.416-28.416s-11.52-28.416-28.416-28.416H298.154667c-16.938667 0-28.458667 11.52-28.458667 28.373333a26.965333 26.965333 0 0 0 28.416 28.458667h383.317333z m-12.8 204.373333v0.085334a28.458667 28.458667 0 0 0 28.416-28.458667c0-16.896-11.52-28.458667-28.416-28.458667H303.274667c-16.938667 0-28.458667 11.562667-28.458667 28.458667a26.965333 26.965333 0 0 0 28.416 28.373333h365.397333z m-112.426666 178.858667a28.458667 28.458667 0 0 0 28.458666-28.330667c0-16.938667-11.562667-28.416-28.458666-28.416H303.274667c-16.938667 0-28.458667 11.477333-28.458667 28.373334a26.965333 26.965333 0 0 0 28.416 28.373333h252.970667z"
        p-id="4013"
        fill="#ffffff"
      /></svg
    >
    <div class="report-label">共支出{expend.count}笔，合计</div>
    <div class="report-value">
      <span style="font-size:0.8em;vertical-align: text-top;">¥</span>
      {expend.sum.toFixed(2)}
    </div>
  </div>
  <div class="report-expend-category">
    <div class="report-title">支出构成</div>
    {#each expend.category as item, key (item.name)}
      <div class="report-cell {colorList[key % 3]}">
        <Icon
          color="var(--weui-{colorList[key % 3].toUpperCase()})"
          type={item.name}
        />
        <div class="report-category-label">{item.name}</div>
        <div class="weui-progress">
          <div class="weui-progress__bar">
            <div
              class="weui-progress__inner-bar js_progress"
              style="width: {item.len};"
            />
          </div>
        </div>
        <div class="report-category-value">¥{item.sum.toFixed(2)}</div>
      </div>
    {/each}
    <div class="report-max weui-article">
      <p class="report-max-p">
        - 其中我消费最多的是「<span class="value">{expendMax.sum.name}</span
        >」，共
        <span class="value">{expendMax.sum.count}</span>
        笔，合计; <span class="value">¥{expendMax.sum.sum.toFixed(2)}</span>；
      </p>
      <p class="report-max-p">
        - 最常照顾的是「<span class="value">{expendMax.count.name}</span>」，共
        <span class="value">{expendMax.count.count}</span>
        笔，合计 <span class="value">¥{expendMax.count.sum.toFixed(2)}</span>。
      </p>
    </div>
  </div>
</div>

<style>
  .report-max-p {
    color: var(--weui-FG-1);
  }
  .report-max-p .value {
    color: var(--weui-TAG-TEXT-ORANGE);
  }
  .report-max {
    margin-top: 1em;
  }
  .report-cell.blue .weui-progress__inner-bar {
    background-color: var(--weui-BLUE);
  }
  .report-cell.red .weui-progress__inner-bar {
    background-color: var(--weui-RED);
  }
  .report-cell.orange .weui-progress__inner-bar {
    background-color: var(--weui-ORANGE);
  }
  .report-cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0.3em 0;
  }
  .report-cell .weui-progress {
    width: 10em;
    padding: 0 1em;
  }
  .report-cell .weui-progress__bar {
    height: 0.5em;
    border-radius: 0.5em;
    overflow: hidden;
  }
  .report-category-label {
    min-width: 5.5em;
  }
  .report-category-value {
    text-align: right;
  }
  .report {
    background-color: var(--weui-BRAND);
    min-height: 100vh;
    color: var(--weui-WHITE);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .report-bg-icon {
    position: absolute;
    opacity: 0.1;
    transform: rotate(-45deg);
    right: -2em;
    top: 2em;
    width: 10em;
    height: 10em;
  }
  .report-expend {
    padding: 1.25em;
    overflow: hidden;
    position: relative;
  }
  .report-header {
    text-align: center;
    font-size: 1.25em;
    padding: 1em 0;
  }
  .report-label {
    color: var(--weui-FG-1);
    padding: 0.5em 0;
  }
  .report-value {
    font-size: 3em;
  }
  .report-expend-category {
    background-color: var(--weui-BG-2);
    color: var(--weui-FG-0);
    padding: 1.25em;
    border-radius: 1em 1em 0px 0px;
    flex: 1;
  }
  .report-title {
    font-size: 1.25em;
    margin-bottom: 1em;
  }
</style>
