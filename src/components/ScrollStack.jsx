import { useLayoutEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import './ScrollStack.css'

export const ScrollStackItem = ({ children, itemClassName = '', ...rest }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} {...rest}>
    {children}
  </div>
)

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef(null)
  const scrollFrameRef = useRef(null)
  const lenisRef = useRef(null)
  const cardsRef = useRef([])
  const lastTransformsRef = useRef(new Map())
  const isUpdatingRef = useRef(false)
  const metricsRef = useRef([])
  const pinEndRef = useRef(0)

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0
    if (scrollTop > end) return 1
    return (scrollTop - start) / (end - start)
  }, [])

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return parseFloat(value)
  }, [])

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement,
      }
    }

    const scroller = scrollerRef.current
    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
      scrollContainer: scroller,
    }
  }, [useWindowScroll])

  const getElementOffset = useCallback(
    (element) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect()
        return rect.top + window.scrollY
      }
      return element.offsetTop
    },
    [useWindowScroll],
  )

  const measureLayout = useCallback(() => {
    if (!cardsRef.current.length) return

    const { containerHeight } = getScrollData()
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end')

    const endElementTop = endElement ? getElementOffset(endElement) : 0
    pinEndRef.current = endElementTop - containerHeight / 2

    metricsRef.current = cardsRef.current.map((card, index) => {
      const cardTop = getElementOffset(card)
      const pinStart = cardTop - stackPositionPx - itemStackDistance * index

      return {
        cardTop,
        stackPositionPx,
        triggerStart: pinStart,
        triggerEnd: cardTop - scaleEndPositionPx,
        pinStart,
      }
    })
  }, [
    getElementOffset,
    getScrollData,
    itemStackDistance,
    parsePercentage,
    scaleEndPosition,
    stackPosition,
    useWindowScroll,
  ])

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return

    isUpdatingRef.current = true

    if (metricsRef.current.length !== cardsRef.current.length) {
      measureLayout()
    }

    const { scrollTop } = getScrollData()
    const pinEnd = pinEndRef.current

    cardsRef.current.forEach((card, index) => {
      if (!card) return

      const metric = metricsRef.current[index]
      if (!metric) return

      const { cardTop, stackPositionPx, triggerStart, triggerEnd, pinStart } = metric

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + index * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? index * rotationAmount * scaleProgress : 0

      let blur = 0
      if (blurAmount) {
        let topCardIndex = 0
        for (let cardIndex = 0; cardIndex < metricsRef.current.length; cardIndex += 1) {
          const nextMetric = metricsRef.current[cardIndex]
          if (nextMetric && scrollTop >= nextMetric.triggerStart) {
            topCardIndex = cardIndex
          }
        }

        if (index < topCardIndex) {
          const depthInStack = topCardIndex - index
          blur = Math.max(0, depthInStack * blurAmount)
        }
      }

      let translateY = 0
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * index
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      }

      const lastTransform = lastTransformsRef.current.get(index)
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : ''

        card.style.transform = transform
        card.style.filter = filter

        lastTransformsRef.current.set(index, newTransform)
      }

      if (index === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    })

    isUpdatingRef.current = false
  }, [
    itemScale,
    itemStackDistance,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    getScrollData,
    measureLayout,
  ])

  const handleScroll = useCallback(() => {
    updateCardTransforms()
  }, [updateCardTransforms])

  const setupLenis = useCallback(() => {
    if (useWindowScroll) return undefined

    const scroller = scrollerRef.current
    if (!scroller) return undefined

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner'),
      duration: 1.2,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientationHandler: true,
      normalizeWheel: true,
      wheelMultiplier: 1,
      touchInertiaMultiplier: 35,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertia: 0.6,
    })

    lenis.on('scroll', handleScroll)

    const raf = (time) => {
      lenis.raf(time)
      animationFrameRef.current = requestAnimationFrame(raf)
    }
    animationFrameRef.current = requestAnimationFrame(raf)

    lenisRef.current = lenis
    return lenis
  }, [handleScroll, useWindowScroll])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return undefined

    const cards = Array.from(
      useWindowScroll ? document.querySelectorAll('.scroll-stack-card') : scroller.querySelectorAll('.scroll-stack-card'),
    )

    cardsRef.current = cards
    const transformsCache = lastTransformsRef.current

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = blurAmount ? 'transform, filter' : 'transform'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.transform = 'translate3d(0, 0, 0)'
      card.style.webkitTransform = 'translate3d(0, 0, 0)'
      card.style.contain = 'paint'
    })

    let removeWindowListeners = () => {}

    if (useWindowScroll) {
      const scheduleUpdate = () => {
        if (scrollFrameRef.current) return

        scrollFrameRef.current = requestAnimationFrame(() => {
          scrollFrameRef.current = null
          updateCardTransforms()
        })
      }

      const scheduleMeasure = () => {
        if (scrollFrameRef.current) return

        scrollFrameRef.current = requestAnimationFrame(() => {
          scrollFrameRef.current = null
          measureLayout()
          updateCardTransforms()
        })
      }

      window.addEventListener('scroll', scheduleUpdate, { passive: true })
      window.addEventListener('resize', scheduleMeasure)
      window.addEventListener('load', scheduleMeasure)

      removeWindowListeners = () => {
        window.removeEventListener('scroll', scheduleUpdate)
        window.removeEventListener('resize', scheduleMeasure)
        window.removeEventListener('load', scheduleMeasure)
      }
    } else {
      setupLenis()
    }

    measureLayout()
    updateCardTransforms()

    return () => {
      removeWindowListeners()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current)
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
      stackCompletedRef.current = false
      cardsRef.current = []
      metricsRef.current = []
      pinEndRef.current = 0
      transformsCache.clear()
      isUpdatingRef.current = false
    }
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    measureLayout,
    setupLenis,
    updateCardTransforms,
  ])

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  )
}

export default ScrollStack
