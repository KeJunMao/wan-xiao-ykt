<script>
  import Report from "./components/Report.svelte";

  let phone = "";
  let password = "";
  let disabled = true;
  let login = false;
  $: if (phone && String(phone).length === 11 && password) {
    disabled = false;
  }
  let reportData = {};
  let expend = {};
  let expendMax = {};
  let toast, loadingToast;

  function Login() {
    loadingToast.style.display = "block";
    fetch("/api/get", {
      method: "post",
      body: JSON.stringify({
        phone,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        loadingToast.style.display = "none";
        if (json.data) {
          reportData = json.data;
          expend = reportData.expend;
          expendMax = reportData.expendMax;
          expend.category.map((item) => {
            item.len = `${(item.count / expend.count) * 100}%`;
            return item;
          });
          login = true;
        } else {
          toast.style.display = "block";
          setTimeout(function () {
            toast.style.display = "none";
          }, 2000);
        }
      });
  }
</script>

<main>
  <div bind:this={toast} style="display: none;">
    <div class="weui-mask_transparent" />
    <div class="weui-toast">
      <i class="weui-icon-warn weui-icon_toast" />
      <p class="weui-toast__content">登陆失败！</p>
    </div>
  </div>
  <div bind:this={loadingToast} style="display: none;">
    <div class="weui-mask_transparent" />
    <div class="weui-toast">
      <span
        class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
        <span class="weui-primary-loading__dot" />
      </span>
      <p class="weui-toast__content">加载中</p>
    </div>
  </div>
  {#if !login}
    <div class="page">
      <div class="weui-form">
        <div class="weui-form__text-area">
          <h2 class="weui-form__title">校园卡 2020 年度报告</h2>
          <div class="weui-form__desc">
            使用你的「完美校园」手机号和密码登陆
          </div>
        </div>
        <div class="weui-form__control-area">
          <div class="weui-cells__group weui-cells__group_form">
            <div class="weui-cells__title">完美校园登陆</div>
            <div class="weui-cells weui-cells_form">
              <div class="weui-cell weui-cell_active">
                <div class="weui-cell__hd">
                  <label class="weui-label" for="phone">手机号</label>
                </div>
                <div class="weui-cell__bd">
                  <input
                    id="phone"
                    class="weui-input"
                    placeholder="填写完美校园绑定的手机号"
                    type="number"
                    pattern="[0-9]*"
                    bind:value={phone}
                  />
                </div>
              </div>
              <div class="weui-cell weui-cell_active">
                <div class="weui-cell__hd">
                  <label class="weui-label" for="password">密码</label>
                </div>
                <div class="weui-cell__bd">
                  <input
                    id="password"
                    type="password"
                    class="weui-input"
                    placeholder="请输入密码"
                    bind:value={password}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-form__opr-area">
          <button
            class={`weui-btn weui-btn_primary ${
              disabled ? "weui-btn_disabled" : ""
            }`}
            {disabled}
            on:click={Login}>登陆</button
          >
        </div>
        <div class="weui-form__extra-area">
          <div class="weui-footer">
            <p class="weui-footer__links">
              <span class="weui-footer__link">Powered by Svelte</span>
            </p>
            <p class="weui-footer__text">
              Copyright © 2020-2021
              <a href="https://github.com/KeJunMao">KeJun</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <Report {expend} {expendMax} />
  {/if}
</main>

<style>
  .weui-form {
    min-height: 100vh;
  }
</style>
