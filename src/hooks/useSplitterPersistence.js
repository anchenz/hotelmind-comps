/**
 * 分隔面板持久化 Hook
 * 提供分隔面板状态的持久化存储、主题兼容和事件处理功能
 *
 * @author TourMind AI
 * @version 1.0.0
 */

import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import useThemeStore from '@/stores/theme'

/**
 * 分隔面板持久化配置选项
 * @typedef {Object} SplitterPersistenceOptions
 * @property {string} storageKey - localStorage存储键值 (必需)
 * @property {string[]} [defaultSizes=['50%', '50%']] - 默认面板尺寸
 * @property {number} [debounceDelay=300] - 防抖延迟时间(ms)
 * @property {'horizontal'|'vertical'} [layout='horizontal'] - 布局方向
 * @property {boolean} [enableThemeWatch=true] - 是否启用主题变化监听
 * @property {boolean} [enableConsoleLog=true] - 是否启用控制台日志
 * @property {boolean} [forceReapplyOnTheme=false] - 主题切换时是否强制重新应用尺寸
 */

/**
 * 分隔面板持久化 Hook
 * @param {SplitterPersistenceOptions} options - 配置选项
 * @returns {Object} Hook返回对象
 */
export function useSplitterPersistence(options = {}) {
  // 解构配置选项，设置默认值
  const { storageKey, defaultSizes = ['50%', '50%'], debounceDelay = 300, layout = 'horizontal', enableThemeWatch = true, enableConsoleLog = true, forceReapplyOnTheme = false } = options

  // 验证必需参数
  if (!storageKey) {
    throw new Error('useSplitterPersistence: storageKey is required')
  }

  // 状态管理
  const splitterSizes = ref([...defaultSizes])
  const themeStore = enableThemeWatch ? useThemeStore() : null

  // 防抖计时器
  let debounceTimer = null

  /**
   * 日志输出辅助函数
   * @param {string} message - 日志消息
   * @param {...any} args - 额外参数
   */
  function log(message, ...args) {
    if (enableConsoleLog) {
      // console.log(`[useSplitterPersistence:${storageKey}] ${message}`, ...args)
    }
  }

  /**
   * 警告输出辅助函数
   * @param {string} message - 警告消息
   * @param {...any} args - 额外参数
   */
  function warn(message, ...args) {
    if (enableConsoleLog) {
      // console.warn(`[useSplitterPersistence:${storageKey}] ${message}`, ...args)
    }
  }

  /**
   * 从localStorage加载保存的尺寸
   * @returns {boolean} 是否成功加载
   */
  function loadSizes() {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsedSizes = JSON.parse(saved)

        // 验证数据格式
        if (Array.isArray(parsedSizes) && parsedSizes.length === defaultSizes.length) {
          // 验证每个尺寸值是否有效
          const isValid = parsedSizes.every((size) => typeof size === 'string' && (size.endsWith('%') || size.endsWith('px') || !isNaN(parseFloat(size))))

          if (isValid) {
            splitterSizes.value = parsedSizes
            log('成功加载保存的尺寸:', parsedSizes)
            return true
          } else {
            warn('保存的尺寸数据格式无效:', parsedSizes)
          }
        } else {
          warn('保存的尺寸数组长度不匹配:', parsedSizes, '期望长度:', defaultSizes.length)
        }
      } else {
        log('未找到保存的尺寸，使用默认值:', defaultSizes)
      }
    } catch (error) {
      warn('加载尺寸失败:', error)
    }

    // 如果加载失败，使用默认尺寸
    splitterSizes.value = [...defaultSizes]
    return false
  }

  /**
   * 保存尺寸到localStorage
   * @param {string[]} sizes - 要保存的尺寸数组
   * @returns {boolean} 是否保存成功
   */
  function saveSizes(sizes) {
    try {
      // 验证输入参数
      if (!Array.isArray(sizes) || sizes.length !== defaultSizes.length) {
        warn('保存尺寸失败: 无效的尺寸数组', sizes)
        return false
      }

      const sizesToSave = sizes.map((size) => String(size))
      localStorage.setItem(storageKey, JSON.stringify(sizesToSave))
      log('成功保存尺寸:', sizesToSave)
      return true
    } catch (error) {
      warn('保存尺寸失败:', error)
      return false
    }
  }

  /**
   * 重置为默认尺寸
   */
  function resetSizes() {
    splitterSizes.value = [...defaultSizes]
    saveSizes(defaultSizes)
    log('重置为默认尺寸:', defaultSizes)
  }

  /**
   * 将像素尺寸转换为百分比
   * @param {number[]} sizes - 像素尺寸数组
   * @param {number} containerSize - 容器总尺寸
   * @returns {string[]} 百分比尺寸数组
   */
  function convertToPercentage(sizes, containerSize) {
    console.log('convertToPercentage', sizes, containerSize)
    if (!Array.isArray(sizes) || !containerSize || containerSize <= 0) {
      warn('转换百分比失败: 无效的参数', { sizes, containerSize })
      return [...defaultSizes]
    }

    return sizes.map((size) => {
      if (typeof size === 'number' && size >= 0) {
        const percentage = ((size / containerSize) * 100).toFixed(2)
        return `${percentage}%`
      }
      return String(size)
    })
  }

  /**
   * 获取分隔器容器元素
   * @returns {HTMLElement|null} 容器元素
   */
  function getSplitterContainer() {
    const container = document.querySelector('.tm-splitter')
    if (!container) {
      warn('未找到分隔器容器元素 (.tm-splitter)')
    }
    return container
  }

  /**
   * 处理分隔面板尺寸变化
   * @param {number} index - 变化的面板索引
   * @param {number[]} sizes - 新的尺寸数组(像素值)
   */
  function handleResize(index, sizes) {
    log('面板尺寸变化:', { index, sizes })

    const container = getSplitterContainer()
    if (!container) {
      return
    }

    // 获取容器尺寸
    const containerSize = layout === 'horizontal' ? container.offsetWidth : container.offsetHeight
    if (containerSize <= 0) {
      warn('容器尺寸无效:', containerSize)
      return
    }

    // 转换为百分比
    const percentageSizes = convertToPercentage(sizes, containerSize)

    // 更新状态
    splitterSizes.value = percentageSizes
    log('更新面板尺寸:', percentageSizes)

    // 防抖保存到localStorage
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      saveSizes(percentageSizes)
    }, debounceDelay)
  }

  /**
   * 强制重新应用当前尺寸
   * 用于主题切换后恢复尺寸状态
   */
  async function reapplySizes() {
    const currentSizes = [...splitterSizes.value]

    // 临时重置为默认值，然后立即恢复
    splitterSizes.value = [...defaultSizes]

    // 使用 nextTick 确保DOM更新后立即恢复，避免视觉闪烁
    await nextTick()
    splitterSizes.value = currentSizes
    log('重新应用尺寸:', currentSizes)
  }

  // 监听splitterSizes变化，用于调试
  watch(
    splitterSizes,
    (newSizes) => {
      log('尺寸状态更新:', newSizes)
    },
    { deep: true },
  )

  // 监听主题变化
  if (enableThemeWatch && themeStore) {
    watch(
      () => themeStore.theme,
      async (newTheme, oldTheme) => {
        if (oldTheme) {
          log('主题切换:', oldTheme, '->', newTheme, '当前面板尺寸:', splitterSizes.value)

          if (forceReapplyOnTheme) {
            // 只在需要时强制重新应用尺寸
            await nextTick()
            setTimeout(() => {
              reapplySizes()
            }, 50)
          } else {
            // 简单监听，不做额外操作，避免抖动
            await nextTick()
            log('主题切换完成，保持面板尺寸:', splitterSizes.value)
          }
        }
      },
    )
  }

  // 组件挂载时自动加载尺寸
  onMounted(() => {
    log('Hook 初始化, 布局:', layout, '默认尺寸:', defaultSizes)
    loadSizes()
  })

  // 组件卸载时清理定时器
  onUnmounted(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
    log('Hook 清理完成')
  })

  // 返回Hook接口
  return {
    // 响应式状态
    splitterSizes,

    // 核心方法
    handleResize,
    loadSizes,
    saveSizes,
    resetSizes,
    reapplySizes,

    // 工具方法
    convertToPercentage,
    getSplitterContainer,

    // 配置信息
    config: {
      storageKey,
      defaultSizes: [...defaultSizes],
      debounceDelay,
      layout,
      enableThemeWatch,
      enableConsoleLog,
      forceReapplyOnTheme,
    },
  }
}

export default useSplitterPersistence
