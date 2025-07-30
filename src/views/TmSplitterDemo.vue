<template>
  <div class="splitter-demo">
    <h2 class="demo-title">TmSplitter 组件演示</h2>

    <div class="demo-section">
      <h3 class="section-title">1. 水平布局 (默认)</h3>
      <div class="demo-container">
        <TmSplitter
          class="demo-splitter"
          :initial-sizes="['30%', '70%']"
          @resize="onResize"
        >
          <SplitterPanel>
            <div class="panel-content panel-left">
              <div class="panel-content-inner">左侧面板 (30%)</div>
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <div class="panel-content panel-right">
              <div class="panel-content-inner">右侧面板 (70%)</div>
            </div>
          </SplitterPanel>
        </TmSplitter>
      </div>
      <div class="demo-info">
        <i class="info-icon">ℹ️</i> 拖动中间的分隔条可以调整两个面板的大小
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">2. 垂直布局</h3>
      <div class="demo-container">
        <TmSplitter
          class="demo-splitter"
          layout="vertical"
          :initial-sizes="['40%', '60%']"
        >
          <SplitterPanel>
            <div class="panel-content panel-top">
              <div class="panel-content-inner">上方面板 (40%)</div>
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <div class="panel-content panel-bottom">
              <div class="panel-content-inner">下方面板 (60%)</div>
            </div>
          </SplitterPanel>
        </TmSplitter>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">3. 三个面板</h3>
      <div class="demo-container">
        <TmSplitter
          class="demo-splitter"
          :initial-sizes="['20%', '30%', '50%']"
        >
          <SplitterPanel>
            <div class="panel-content panel-left">
              <div class="panel-content-inner">左侧面板 (20%)</div>
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <div class="panel-content panel-middle">
              <div class="panel-content-inner">中间面板 (30%)</div>
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <div class="panel-content panel-right">
              <div class="panel-content-inner">右侧面板 (50%)</div>
            </div>
          </SplitterPanel>
        </TmSplitter>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">4. 面板大小限制</h3>
      <div class="demo-container">
        <TmSplitter class="demo-splitter">
          <SplitterPanel min="100px" max="300px">
            <div class="panel-content panel-left">
              <div class="panel-content-inner">
                左侧面板 (最小 100px, 最大 300px)
              </div>
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <div class="panel-content panel-right">
              <div class="panel-content-inner">右侧面板</div>
            </div>
          </SplitterPanel>
        </TmSplitter>
      </div>
      <div class="demo-info">
        <i class="info-icon">ℹ️</i> 左侧面板的大小被限制在 100px 到 300px 之间
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">5. 不可调整大小的面板</h3>
      <div class="demo-container">
        <TmSplitter class="demo-splitter" :initial-sizes="['200px', 'auto']">
          <SplitterPanel :resizable="false">
            <div class="panel-content panel-fixed">
              <div class="panel-content-inner">固定面板 (不可调整大小)</div>
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <div class="panel-content panel-right">
              <div class="panel-content-inner">可调整面板</div>
            </div>
          </SplitterPanel>
        </TmSplitter>
      </div>
      <div class="demo-info">
        <i class="info-icon">ℹ️</i> 左侧面板设置了
        resizable="false"，无法调整大小
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">6. 嵌套分隔面板</h3>
      <div class="demo-container">
        <TmSplitter class="demo-splitter" :initial-sizes="['40%', '60%']">
          <SplitterPanel>
            <div class="panel-content panel-left">
              <div class="panel-content-inner">左侧面板</div>
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <TmSplitter layout="vertical" :initial-sizes="['50%', '50%']">
              <SplitterPanel>
                <div class="panel-content panel-top">
                  <div class="panel-content-inner">右上面板</div>
                </div>
              </SplitterPanel>
              <SplitterPanel>
                <div class="panel-content panel-bottom">
                  <div class="panel-content-inner">右下面板</div>
                </div>
              </SplitterPanel>
            </TmSplitter>
          </SplitterPanel>
        </TmSplitter>
      </div>
      <div class="demo-info">
        <i class="info-icon">ℹ️</i> 右侧面板内嵌套了一个垂直布局的分隔面板
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">7. 事件监听</h3>
      <div class="demo-container">
        <TmSplitter
          class="demo-splitter"
          :initial-sizes="['30%', '70%']"
          @resize-start="onResizeStart"
          @resize="onResize"
          @resize-end="onResizeEnd"
        >
          <SplitterPanel>
            <div class="panel-content panel-left">
              <div class="panel-content-inner">左侧面板</div>
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <div class="panel-content panel-right">
              <div class="panel-content-inner">右侧面板</div>
            </div>
          </SplitterPanel>
        </TmSplitter>
      </div>
      <div class="demo-info event-log">
        <div class="log-title"><i class="info-icon">📋</i> 事件日志:</div>
        <pre class="log-content">{{
          eventLog.length ? eventLog.join("\n") : "拖动分隔条查看事件日志..."
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TmSplitter from "../components/TmSplitter/index.vue";
import SplitterPanel from "../components/TmSplitter/SplitterPanel.vue";

// 事件日志
const eventLog = ref([]);

// 记录最近的5条日志
const logEvent = (event, data) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp} - ${event}: ${JSON.stringify(data)}`);
  if (eventLog.value.length > 5) {
    eventLog.value = eventLog.value.slice(0, 5);
  }
};

// 事件处理函数
const onResizeStart = (index, sizes) => {
  logEvent("resize-start", { index, sizes });
};

const onResize = (index, sizes) => {
  logEvent("resize", { index, sizes });
};

const onResizeEnd = (index, sizes) => {
  logEvent("resize-end", { index, sizes });
};
</script>

<style lang="scss" scoped>
.splitter-demo {
  padding: 0;

  .demo-title {
    margin-bottom: 25px;
    color: var(--text-primary, #333);
    font-size: 22px;
    font-weight: 600;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-primary, #eaeaea);
  }

  .section-title {
    margin: 0 0 16px 0;
    color: var(--text-secondary, #555);
    font-size: 18px;
    font-weight: 500;
  }

  .demo-section {
    margin-bottom: 35px;
    border: 1px solid var(--border-primary, #eaeaea);
    border-radius: 8px;
    padding: 20px;
    background-color: var(--bg-card, #fff);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }

  .demo-container {
    margin: 16px 0;
    border: 1px solid var(--border-secondary, #f0f0f0);
    border-radius: 6px;
    overflow: hidden;
  }

  .demo-splitter {
    height: 300px;
  }

  .demo-info {
    margin-top: 12px;
    font-size: 14px;
    color: var(--text-secondary, #666);
    display: flex;
    align-items: flex-start;

    .info-icon {
      margin-right: 6px;
      font-style: normal;
    }

    pre {
      margin-top: 5px;
      padding: 12px;
      background-color: var(--bg-body, #f5f5f5);
      border-radius: 6px;
      max-height: 150px;
      overflow: auto;
      font-family: monospace;
      font-size: 13px;
      line-height: 1.5;
      color: var(--text-primary, #333);
    }
  }

  .event-log {
    display: block;

    .log-title {
      margin-bottom: 8px;
      font-weight: 500;
      display: flex;
      align-items: center;
    }

    .log-content {
      width: 100%;
      margin: 0;
    }
  }

  .panel-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .panel-content-inner {
      padding: 15px;
      text-align: center;
      font-weight: 500;
      border-radius: 6px;
      width: 90%;
      max-width: 300px;
    }
  }

  .panel-left .panel-content-inner {
    background-color: rgba(var(--primary-rgb, 24, 144, 255), 0.1);
    border: 1px solid rgba(var(--primary-rgb, 24, 144, 255), 0.2);
    color: var(--primary-700, #096dd9);
  }

  .panel-right .panel-content-inner {
    background-color: rgba(var(--success-rgb, 82, 196, 26), 0.1);
    border: 1px solid rgba(var(--success-rgb, 82, 196, 26), 0.2);
    color: var(--success-700, #389e0d);
  }

  .panel-middle .panel-content-inner {
    background-color: rgba(var(--warning-rgb, 250, 173, 20), 0.1);
    border: 1px solid rgba(var(--warning-rgb, 250, 173, 20), 0.2);
    color: var(--warning-700, #d48806);
  }

  .panel-top .panel-content-inner {
    background-color: rgba(var(--info-rgb, 22, 119, 255), 0.1);
    border: 1px solid rgba(var(--info-rgb, 22, 119, 255), 0.2);
    color: var(--info-700, #0050b3);
  }

  .panel-bottom .panel-content-inner {
    background-color: rgba(var(--danger-rgb, 255, 77, 79), 0.1);
    border: 1px solid rgba(var(--danger-rgb, 255, 77, 79), 0.2);
    color: var(--danger-700, #cf1322);
  }

  .panel-fixed .panel-content-inner {
    background-color: rgba(var(--secondary-rgb, 140, 140, 140), 0.1);
    border: 1px solid rgba(var(--secondary-rgb, 140, 140, 140), 0.2);
    color: var(--secondary-700, #595959);
  }
}
</style>
