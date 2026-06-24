import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BorderGlow from './components/BorderGlow'
import ScrollStack, { ScrollStackItem } from './components/ScrollStack'
import TubelightNav from './components/TubelightNav'
import './App.css'

const LazyLiquidEther = lazy(() => import('./components/LiquidEther'))

const navItems = [
  { label: '简介', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '优势', href: '#strengths' },
  { label: '联系', href: '#contact' },
]

const stats = [
  { value: '4年', label: '视觉与三维设计经验' },
  { value: '4人', label: '小团队协作与项目带领' },
  { value: '211', label: '江南大学本科背景' },
  { value: 'AI', label: '工作流落地与内部培训' },
]

const timeline = [
  {
    period: '2025.04 - 2026.03',
    company: '杭州小矮人品牌管理有限公司',
    role: '三维设计师 / AI流程推动',
    details: [
      '负责美的、追觅等品牌的视觉与三维设计需求。',
      '独立推进 Mova 产品动画项目，覆盖概念到交付。',
      '搭建内部 AI 工作流程，并开展团队培训。',
    ],
  },
  {
    period: '2024.03 - 2024.11',
    company: '励盛家居科技（无锡）有限公司',
    role: '渲染师',
    details: [
      '输出高质量产品渲染图与活动视觉素材。',
      '为系列化产品制定统一的视觉风格与表达逻辑。',
    ],
  },
  {
    period: '2022.07 - 2024.03',
    company: '波司登国际服饰（中国）有限公司',
    role: '3D设计师',
    details: [
      '完成服装 3D 制版、布料模拟、Octane 材质渲染。',
      '联动陈列与运营团队完成场景氛围、后期与落地优化。',
    ],
  },
  {
    period: '2021.06 - 2022.03',
    company: '珠海西山居数字科技有限公司',
    role: '3D设计师',
    details: [
      '参与游戏资产建模、贴图绘制与场景搭建支持。',
      '处理模型、蓝图和场景资源整理，提升制作协同效率。',
    ],
  },
]

const featuredProjects = [
  {
    title: '美的项目',
    label: 'BRAND / CGI',
    id: 'midea',
    image: '/media/project-midea.png',
    gallery: [
      {
        src: '/media/midea/midea-dishwasher-v6-pro.png',
        title: 'Dishwasher V6 Pro',
        subtitle: '洗碗机项目',
      },
      {
        src: '/media/midea/midea-steam-oven-cqoc50-t2.jpg',
        title: 'CQOC50-T2',
        subtitle: '蒸汽烤箱项目',
      },
      {
        src: '/media/midea/midea-blender-v1-01.jpg',
        title: 'Blender',
        subtitle: '破壁机项目',
      },
      {
        src: '/media/midea/midea-coffee-machine-v2.jpg',
        title: 'Coffee Machine V2',
        subtitle: '咖啡机项目',
      },
      {
        src: '/media/midea/midea-juicer.png',
        title: 'Juicer',
        subtitle: '原汁机项目',
      },
      {
        src: '/media/midea/midea-steam-box-cqst50-t2.jpg',
        title: 'CQST50-T2',
        subtitle: '活水蒸箱项目',
      },
      {
        src: '/media/midea/midea-sterilizer-132g01.jpg',
        title: '132G01',
        subtitle: '消毒柜项目',
      },
      {
        src: '/media/midea/midea-car-vacuum-tk5c-790.jpg',
        title: 'TK5C',
        subtitle: '车载吸尘器项目',
      },
      {
        src: '/media/midea/midea-warming-tray-790.jpg',
        title: 'Warming Tray',
        subtitle: '暖菜板项目',
      },
      {
        src: '/media/midea/midea-rice-cooker-mb-rc211-790.jpg',
        title: 'MB-RC211',
        subtitle: '珍珠煲项目',
      },
      {
        src: '/media/midea/midea-electric-hotpot-final.jpg',
        title: 'Electric Hotpot',
        subtitle: '电火锅项目',
      },
      {
        src: '/media/midea/midea-induction-cooker-mc-clc2215-790.jpg',
        title: 'MC-CLC2215',
        subtitle: '电磁炉项目',
      },
      {
        src: '/media/midea/midea-garment-steamer-ydb18dm.jpg',
        title: 'YDB18DM',
        subtitle: '手持挂烫机项目',
      },
    ],
  },
  {
    title: '追觅项目',
    label: 'PRODUCT / VISUAL',
    id: 'dreame',
    image: '/media/project-dreame.png',
    gallery: [
      {
        src: '/media/dreame/dreame-q30.jpg',
        title: 'Q30',
        subtitle: '鏆栭鏈洪」鐩鎯呴〉',
      },
      {
        src: '/media/dreame/dreame-q60.jpg',
        title: 'Q60',
        subtitle: '鏆栭鏈洪」鐩鎯呴〉',
      },
      {
        src: '/media/dreame/dreame-neckfan.jpg',
        title: 'Neck Fan',
        subtitle: '鎸傝剸椋庢墖椤圭洰璇︽儏椤?',
      },
    ],
  },
  {
    title: '动画项目',
    label: 'MOTION / FILM',
    id: 'mova',
    image: '/media/project-mova.png',
    gallery: [
      {
        src: '/media/mova/mova-midea-water-heater-ctx316.mp4',
        title: 'CTX316 Water Heater',
        subtitle: '热水器动画项目',
        type: 'video',
      },
      {
        src: '/media/mova/mova-midea-colmo-sq30-dishwasher.mp4',
        title: 'COLMO SQ30',
        subtitle: '洗碗机动画项目',
        type: 'video',
      },
      {
        src: '/media/mova/mova-samsung-washer.mp4',
        title: 'Samsung Washer',
        subtitle: '洗衣机动画项目',
        type: 'video',
      },
      {
        src: '/media/mova/mova-forme.mp4',
        title: 'Forme',
        subtitle: '产品概念动画',
        type: 'video',
      },
      {
        src: '/media/mova/mova-watch.mov',
        title: 'Watch',
        subtitle: '手表动画项目',
        type: 'video',
      },
      {
        src: '/media/mova/mova-electric-toothbrush.mp4',
        title: 'Electric Toothbrush',
        subtitle: '电动牙刷动画项目',
        type: 'video',
      },
    ],
  },
  {
    title: '外贸项目',
    label: 'TRADE / CONTENT',
    id: 'trade',
    image: '/media/project-bosideng.png',
    gallery: [
      {
        src: '/media/trade/trade-mig-welder.jpg',
        title: 'MIG Welder',
        subtitle: '鑺剨鏈洪」鐩?',
      },
      {
        src: '/media/trade/trade-ebike-motor.jpg',
        title: 'Ebike Motor',
        subtitle: '鐢靛姩杞︾數鏈洪」鐩?',
      },
      {
        src: '/media/trade/trade-hose-cart.png',
        title: 'Hose Cart',
        subtitle: '姘寸鍗风洏杞﹂」鐩?',
      },
      {
        src: '/media/trade/trade-heat-press.jpg',
        title: 'Heat Press',
        subtitle: '鍟嗙敤鐢电啫鏂楅」鐩?',
      },
      {
        src: '/media/trade/trade-commercial-oven.jpg',
        title: 'Commercial Oven',
        subtitle: '鍟嗙敤鐑ょ椤圭洰',
      },
      {
        src: '/media/trade/trade-utility-cart.jpg',
        title: 'Utility Cart',
        subtitle: '瀹炵敤鎺ㄨ溅椤圭洰',
      },
      {
        src: '/media/trade/trade-hitch-hook.jpg',
        title: 'Trailer Hitch',
        subtitle: '鎷栬溅閽╅」鐩?',
      },
      {
        src: '/media/trade/trade-trailer-jack.jpg',
        title: 'Trailer Jack',
        subtitle: '涓囧悜杞敮鏋堕」鐩?',
      },
      {
        src: '/media/trade/trade-folding-wagon.jpg',
        title: 'Folding Wagon',
        subtitle: '鎶樺彔甯冩帹杞﹂」鐩?',
      },
      {
        src: '/media/trade/trade-ice-maker.jpg',
        title: 'Ice Maker',
        subtitle: '涓€浣撳紡鍒剁柉鏈洪」鐩?',
      },
    ],
  },
]

const strengths = [
  {
    id: 'brand',
    layout: 'feature',
    english: 'BRAND DIRECTION',
    title: '品牌审美控制',
    image: '/media/strength-bg-01.png',
    imagePosition: 'center 38%',
    description:
      '能够在品牌调性、商业诉求与画面节奏之间找到稳定平衡，不做模板式堆砌。',
    points: ['调性统一', '视觉判断', '质感把控'],
  },
  {
    id: 'three-d',
    layout: 'standard',
    english: '3D / MOTION',
    title: '三维动态表达',
    image: '/media/strength-bg-02.png',
    imagePosition: 'center 30%',
    description:
      '熟练处理三维建模、渲染、材质与动态表现，让产品与视觉叙事更有说服力。',
    points: ['建模渲染', '镜头组织', '材质氛围'],
  },
  {
    id: 'ai',
    layout: 'standard',
    english: 'AI WORKFLOW',
    title: 'AI设计落地',
    image: '/media/strength-bg-03.png',
    imagePosition: 'center 42%',
    description:
      '不把 AI 只当作概念工具，而是推动到流程层、培训层与实际项目交付中。',
    points: ['流程搭建', '团队培训', '交付提效'],
  },
  {
    id: 'campaign',
    layout: 'wide',
    english: 'CAMPAIGN DELIVERY',
    title: '大促项目经验',
    image: '/media/strength-bg-04.png',
    imagePosition: 'center 44%',
    description:
      '经历多次 6.18 与双 11 高压节奏，理解节点营销对速度、协同与稳定输出的要求。',
    points: ['节点节奏', '高压协同', '稳定交付'],
  },
  {
    id: 'collab',
    layout: 'wide',
    english: 'COLLABORATION',
    title: '协作沟通能力',
    image: '/media/strength-bg-05.png',
    imagePosition: 'center 34%',
    description:
      '兼具小团队推进经验与双语沟通基础，能在跨角色、跨语境协作中保持判断清晰与反馈顺畅。',
    points: ['项目拆解', '团队协同', '双语沟通'],
  },
]

const contactItems = [
  { label: '邮箱', value: '1534508791@qq.com', href: 'mailto:1534508791@qq.com' },
  { label: '求职方向', value: '视觉设计师 / AI设计师 / 品牌设计师' },
  { label: '期望城市', value: '杭州' },
  { label: '期望薪资', value: '16K - 19K' },
]

const heroRoleLines = ['VISUAL DESIGNER', 'AI DESIGNER', 'BRAND DESIGNER']

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1]

function Reveal({
  children,
  className = '',
  delay = 0,
  amount = 0.24,
  variant = 'soft',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount })
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    soft: {
      idle: {
        opacity: 0.28,
        y: 54,
        scale: 0.956,
        rotateX: 11,
        filter: 'blur(18px)',
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: 'blur(0px)',
      },
      transition: {
        duration: 0.96,
        delay,
        ease: EASE_OUT_QUINT,
      },
    },
    title: {
      idle: {
        opacity: 0.24,
        x: -36,
        y: 18,
        scale: 0.972,
        filter: 'blur(14px)',
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      },
      transition: {
        duration: 0.84,
        delay,
        ease: EASE_OUT_QUINT,
      },
    },
    card: {
      idle: {
        opacity: 0.2,
        y: 62,
        scale: 0.928,
        rotateX: 13,
        filter: 'blur(20px)',
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: 'blur(0px)',
      },
      transition: {
        duration: 1.02,
        delay,
        ease: EASE_OUT_QUINT,
      },
    },
  }

  const motionVariant = variants[variant] ?? variants.soft
  const animateState = prefersReducedMotion || isInView ? motionVariant.visible : motionVariant.idle
  const transition = prefersReducedMotion
    ? { duration: 0.01, delay: 0 }
    : motionVariant.transition

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={animateState}
      transition={transition}
      style={{ transformPerspective: 1400, transformOrigin: 'center bottom' }}
    >
      {children}
    </motion.div>
  )
}

const rotateGallery = (gallery, offset = 1) =>
  gallery.map((_, index) => gallery[(index + offset) % gallery.length])

const getProjectPreviewGallery = (gallery, limit = 4, offset = 0) => {
  if (!gallery?.length) return []
  if (gallery.length <= limit) return rotateGallery(gallery, offset % gallery.length)

  const step = gallery.length / limit
  return Array.from({ length: limit }, (_, index) => {
    const sampleIndex = (Math.floor(index * step) + offset) % gallery.length
    return gallery[sampleIndex]
  })
}

const isVideoGalleryItem = (item) => item?.type === 'video' || /\.(mp4|mov|webm|ogg)$/i.test(item?.src ?? '')

const getPreviewImageSrc = (src = '') => {
  if (!src.startsWith('/media/')) return src
  const relativePath = src.slice('/media/'.length)
  return `/media/previews/${relativePath}`.replace(/\.(png|jpe?g|webp)$/i, '.jpg')
}

const getOptimizedImageSrc = (src = '') => {
  if (!src.startsWith('/media/')) return src
  const relativePath = src.slice('/media/'.length)
  return `/media/optimized/${relativePath}`.replace(/\.(png|jpe?g|webp)$/i, '.jpg')
}

const getOptimizedVideoSrc = (src = '') => {
  if (!src.startsWith('/media/')) return src
  const relativePath = src.slice('/media/'.length)
  return `/media/web/${relativePath}`.replace(/\.(mp4|mov|webm|ogg)$/i, '.mp4')
}

const getVideoPosterSrc = (src = '') => {
  if (!src.startsWith('/media/')) return '/media/project-mova.png'
  const relativePath = src.slice('/media/'.length)
  return `/media/posters/${relativePath}`.replace(/\.(mp4|mov|webm|ogg)$/i, '.jpg')
}

const GalleryAsset = ({ item, alt = '', mode = 'preview' }) => {
  if (!item) return null

  if (isVideoGalleryItem(item)) {
    if (mode !== 'detail') {
      return (
        <img
          src={item.poster ?? getVideoPosterSrc(item.src)}
          alt={alt || item.title}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      )
    }

    return (
      <video
        src={item.webSrc ?? getOptimizedVideoSrc(item.src)}
        poster={item.poster ?? getVideoPosterSrc(item.src)}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        controls={mode === 'detail'}
        aria-label={alt || item.title}
      />
    )
  }

  const imageSrc =
    mode === 'detail'
      ? item.detailSrc ?? getOptimizedImageSrc(item.src)
      : item.previewSrc ?? getPreviewImageSrc(item.src)
  return <img src={imageSrc} alt={alt} loading="lazy" decoding="async" fetchPriority="low" />
}

function App() {
  const [activeProjectId, setActiveProjectId] = useState(null)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
  const projectDetailStageRef = useRef(null)
  const contentBackgroundRef = useRef(null)
  const shouldMountBackground = useInView(contentBackgroundRef, {
    once: true,
    amount: 0.01,
    margin: '320px 0px 320px 0px',
  })

  const activeProject = useMemo(
    () => featuredProjects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId],
  )
  const activeGallery = useMemo(() => activeProject?.gallery ?? [], [activeProject])

  useEffect(() => {
    if (!activeProject) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeProject])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProjectId(null)
        return
      }

      if (!activeGallery.length) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveGalleryIndex((currentIndex) => {
          const nextIndex = currentIndex - 1
          return nextIndex < 0 ? activeGallery.length - 1 : nextIndex
        })
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveGalleryIndex((currentIndex) => (currentIndex + 1) % activeGallery.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeGallery])

  useEffect(() => {
    if (!activeProject?.gallery || !projectDetailStageRef.current) return

    projectDetailStageRef.current.scrollTo({ top: 0, behavior: 'auto' })
  }, [activeGalleryIndex, activeProject])

  const openProjectGallery = (projectId) => {
    setActiveProjectId(projectId)
    setActiveGalleryIndex(0)
  }

  const navigateProjectGallery = (direction) => {
    if (!activeGallery.length) return

    setActiveGalleryIndex((currentIndex) => {
      const nextIndex = currentIndex + direction

      if (nextIndex < 0) return activeGallery.length - 1
      if (nextIndex >= activeGallery.length) return 0

      return nextIndex
    })
  }

  const handleProjectDetailWheel = (event) => {
    const nextScrollTop = event.currentTarget.scrollTop + event.deltaY
    event.currentTarget.scrollTop = nextScrollTop
    event.preventDefault()
    event.stopPropagation()
  }

  const swallowProjectDetailWheel = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div className="portfolio-shell">
      <main>
        <section className="hero-section" id="hero">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            preload="metadata"
            poster="/media/posters/hero-samsung-washer.jpg"
          >
            <source src="/media/web/hero-samsung-washer.mp4" type="video/mp4" />
          </video>
<div className="hero-scrim" aria-hidden="true" />
          <header className="site-header site-header--hero">
            <TubelightNav items={navItems} />
          </header>
          <div className="hero-content">
            <div className="hero-intro">
              <p className="hero-kicker">PORTFOLIO</p>
              <h1>何忠江</h1>
              <p className="hero-subtitle">2026 PORTFOLIO</p>
              <div className="hero-identity-copy">
                <div className="hero-role-list" aria-label="Primary roles">
                  {heroRoleLines.map((role) => (
                    <span key={role}>{role}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="hero-side-rail" aria-hidden="true">
              <div className="hero-persona-panel">
                <span className="hero-persona-code">HZJ / 2026</span>
                <strong>He Zhongjiang</strong>
              </div>
              <span className="hero-side-label">FUTURISTIC CONCEPT</span>
              </div>
          </div>

          <div className="hero-notes">
            <div className="hero-note-block">
              <p className="hero-note-title">Hangzhou / China</p>
              <p>4年商业项目经验</p>
            </div>
            <div className="hero-note-block">
              <p className="hero-note-title">Visual / AI / Brand Designer</p>
              <p>1534508791@qq.com</p>
              </div>
          </div>
          <div className="hero-caption">
            <a className="hero-link" href="#projects">
              浏览项目
            </a>
          </div>
        </section>

        <div className="content-background-shell" ref={contentBackgroundRef}>
          <div className="content-background-layer" aria-hidden="true">
            <div className="content-background-sticky">
              {shouldMountBackground ? (
                <Suspense fallback={null}>
                  <LazyLiquidEther
                    className="content-liquid-ether"
                    colors={['#6da99d', '#75c9dd', '#3262a7']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.38}
                    isBounce={false}
                    autoDemo
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                  />
                </Suspense>
              ) : null}
            </div>
          </div>

        <section className="content-section about-section" id="about">
          <Reveal className="reveal-block" variant="title" amount={0.45}>
            <div className="section-heading">
              <div className="section-title-block">
                <span>ABOUT</span>
                <h2>个人经历</h2>
              </div>
            </div>
          </Reveal>
          <div className="about-layout">
            <Reveal className="reveal-block reveal-block--fill" variant="soft" delay={0.04}>
              <BorderGlow
                className="about-glow-wrap"
                edgeSensitivity={30}
                glowColor="40 80 80"
                borderRadius={20}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                fillOpacity={0.5}
              >
                <div className="portrait-panel reflective-panel reflective-panel--media">
                <img src="/media/profile-portrait.png" alt="何忠江个人形象占位图" />
                </div>
              </BorderGlow>
            </Reveal>
            <Reveal className="reveal-block reveal-block--fill" variant="soft" delay={0.12}>
              <BorderGlow
                className="about-glow-wrap"
                edgeSensitivity={30}
                glowColor="40 80 80"
                borderRadius={20}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                fillOpacity={0.5}
              >
                <div className="about-panel reflective-panel">
                <p className="about-intro">
                  过去几年里，我持续在品牌、电商、产品动画与三维视觉场景中工作。
                  这让我既能理解商业项目对效率与稳定输出的要求，也能在审美控制、
                  信息组织与新工具应用上保持敏感度。
                </p>
                <p className="about-intro">
                  最近的工作重点，是把 AI 从辅助工具推进到真实流程里，
                  让团队在创意探索、方案迭代和内部协同上获得更直接的效率提升。
                </p>
                  <div className="contact-grid">
                    {contactItems.map((item) => (
                      <BorderGlow
                        as="div"
                        className="about-glow-wrap about-glow-wrap--compact"
                        edgeSensitivity={30}
                        glowColor="40 80 80"
                        borderRadius={18}
                        glowRadius={40}
                        glowIntensity={1}
                        coneSpread={25}
                        colors={['#c084fc', '#f472b6', '#38bdf8']}
                        fillOpacity={0.5}
                        key={item.label}
                      >
                        <div className="contact-item reflective-panel reflective-panel--compact">
                          <span>{item.label}</span>
                          {item.href ? (
                            <a href={item.href}>{item.value}</a>
                          ) : (
                            <strong>{item.value}</strong>
                          )}
                        </div>
                      </BorderGlow>
                    ))}
                  </div>
                  <div className="stats-grid">
                    {stats.map((item) => (
                      <BorderGlow
                        as="article"
                        className="about-glow-wrap about-glow-wrap--compact"
                        edgeSensitivity={30}
                        glowColor="40 80 80"
                        borderRadius={18}
                        glowRadius={40}
                        glowIntensity={1}
                        coneSpread={25}
                        colors={['#c084fc', '#f472b6', '#38bdf8']}
                        fillOpacity={0.5}
                        key={item.label}
                      >
                        <div className="stat-card reflective-panel reflective-panel--compact">
                          <strong>{item.value}</strong>
                          <span>{item.label}</span>
                        </div>
                      </BorderGlow>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </Reveal>
          </div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <Reveal
                className="reveal-block reveal-block--fill"
                variant="soft"
                delay={0.08 + index * 0.05}
                key={`${item.company}-${item.period}`}
              >
                <BorderGlow
                  as="article"
                  className="about-glow-wrap"
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  borderRadius={20}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  colors={['#c084fc', '#f472b6', '#38bdf8']}
                  fillOpacity={0.5}
                >
                  <div className="timeline-item reflective-panel">
                    <div className="timeline-head">
                      <span className="timeline-period">{item.period}</span>
                      <div>
                        <h3>{item.company}</h3>
                        <p>{item.role}</p>
                      </div>
                    </div>
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </BorderGlow>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="content-section projects-section" id="projects">
          <div className="section-heading">
            <div className="section-title-block">
              <span>SELECTED PROJECTS</span>
              <h2>精选项目</h2>
            </div>
          </div>
          <div className="projects-showcase">
            <ScrollStack
              className="projects-scroll-stack"
              itemDistance={84}
              itemScale={0.018}
              itemStackDistance={28}
              stackPosition="18%"
              scaleEndPosition="8%"
              baseScale={0.93}
              rotationAmount={0}
              blurAmount={0}
              useWindowScroll
            >
                {featuredProjects.map((project, index) => {
                  const previewLimit = project.gallery?.every(isVideoGalleryItem) ? 3 : 4
                  const previewGallery = getProjectPreviewGallery(project.gallery, previewLimit, 0)
                  const offsetPreviewGallery = getProjectPreviewGallery(
                    project.gallery,
                    previewLimit,
                    Math.max(1, Math.ceil((project.gallery?.length ?? 0) / 2)),
                  )

                  return (
                    <ScrollStackItem
                      itemClassName={`project-stack-card ${project.gallery ? 'project-stack-card--interactive' : ''}`}
                      key={project.title}
                    >
                      <div className="project-stack-media">
                        <img
                          src={project.image}
                          alt={`${project.title} 项目视觉封面`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      {project.gallery ? (
                        <div className="project-stack-gallery" aria-hidden="true">
                          <div className="project-stack-gallery-grid">
                            <div
                              className="project-stack-gallery-track"
                              style={{
                                '--gallery-duration': '40s',
                              }}
                            >
                              {previewGallery.map((item) => (
                                <GalleryAsset key={item.src} item={item} alt="" />
                              ))}
                              {previewGallery.map((item) => (
                                <GalleryAsset key={`${item.src}-loop`} item={item} alt="" />
                              ))}
                            </div>
                            <div
                              className="project-stack-gallery-track project-stack-gallery-track--offset"
                              style={{
                                '--gallery-duration': '44s',
                              }}
                            >
                              {offsetPreviewGallery.map((item) => (
                                <GalleryAsset key={`${item.src}-alt`} item={item} alt="" />
                              ))}
                              {offsetPreviewGallery.map((item) => (
                                <GalleryAsset key={`${item.src}-alt-loop`} item={item} alt="" />
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <div className="project-stack-overlay" aria-hidden="true" />
                      {project.gallery ? (
                        <button
                          className="project-stack-hitarea"
                          type="button"
                          onClick={() => openProjectGallery(project.id)}
                          aria-label={`Open ${project.title} gallery`}
                        />
                      ) : null}
                      <div className="project-stack-copy">
                        <span>{project.label}</span>
                        <h3>{project.title}</h3>
                        <strong>{String(index + 1).padStart(2, '0')}</strong>
                      </div>
                    </ScrollStackItem>
                  )
                })}
            </ScrollStack>
          </div>
          {activeProject?.gallery ? (
            <div
              className="project-detail-shell"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-detail-title"
              onClick={() => setActiveProjectId(null)}
              onWheel={swallowProjectDetailWheel}
            >
              <div className="project-detail-panel reflective-panel" onClick={(event) => event.stopPropagation()}>
                <div className="project-detail-head">
                  <div>
                    <span>{activeProject.label}</span>
                    <h3 id="project-detail-title">{activeProject.title}</h3>
                  </div>
                  <button
                    className="project-detail-close"
                    type="button"
                    aria-label="Close project gallery"
                    onClick={() => setActiveProjectId(null)}
                  >
                    鍏抽棴
                  </button>
                </div>
                <div className="project-detail-layout">
                  <div
                    className="project-detail-stage"
                    onWheel={handleProjectDetailWheel}
                    ref={projectDetailStageRef}
                  >
                    <div className="project-detail-stage-meta">
                      <span>
                        {String(activeGalleryIndex + 1).padStart(2, '0')} /{' '}
                        {String(activeGallery.length).padStart(2, '0')}
                      </span>
                      <p>{activeProject.gallery[activeGalleryIndex].title}</p>
                    </div>
                    <div className="project-detail-stage-controls">
                      <button
                        className="project-detail-nav-button"
                        type="button"
                        aria-label="Previous image"
                        onClick={() => navigateProjectGallery(-1)}
                      >
                        <ChevronLeft size={18} strokeWidth={1.8} />
                      </button>
                      <button
                        className="project-detail-nav-button"
                        type="button"
                        aria-label="Next image"
                        onClick={() => navigateProjectGallery(1)}
                      >
                        <ChevronRight size={18} strokeWidth={1.8} />
                      </button>
                    </div>
                    <GalleryAsset
                      item={activeProject.gallery[activeGalleryIndex]}
                      alt={activeProject.gallery[activeGalleryIndex].title}
                      mode="detail"
                    />
                  </div>
                  <div className="project-detail-sidebar" onWheel={handleProjectDetailWheel}>
                    <p className="project-detail-caption">
                      {activeProject.gallery[activeGalleryIndex].title}
                    </p>
                    <div className="project-detail-thumbs">
                      {activeProject.gallery.map((item, galleryIndex) => (
                        <button
                          className={`project-detail-thumb ${galleryIndex === activeGalleryIndex ? 'is-active' : ''}`}
                          key={item.src}
                          type="button"
                          onClick={() => setActiveGalleryIndex(galleryIndex)}
                        >
                          <GalleryAsset item={item} alt={item.title} mode="thumb" />
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="content-section strengths-section" id="strengths">
          <Reveal className="reveal-block" variant="title" amount={0.45}>
            <div className="section-heading">
              <div className="section-title-block">
                <span>STRENGTHS</span>
                <h2>个人优势</h2>
              </div>
            </div>
          </Reveal>
          <div className="strengths-grid">
            {strengths.map((strength, index) => (
              <Reveal
                className={`reveal-block reveal-block--fill strengths-glow-wrap strengths-glow-wrap--${strength.layout}`}
                variant="card"
                delay={index * 0.06}
                amount={0.22}
                key={strength.title}
              >
                <BorderGlow
                  as="article"
                  className={`strengths-glow-wrap strengths-glow-wrap--${strength.layout}`}
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={20}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  colors={['#c084fc', '#f472b6', '#38bdf8']}
                  fillOpacity={0.5}
                >
                  <div className="strength-card reflective-panel">
                    <div
                      className="strength-media"
                      style={{
                        backgroundImage: `url(${strength.image})`,
                        backgroundPosition: strength.imagePosition,
                      }}
                      aria-hidden="true"
                    />
                    <div className="strength-media-scrim" aria-hidden="true" />
                    <div className="strength-copy">
                      <span className="strength-eyebrow">{strength.english}</span>
                      <h3>{strength.title}</h3>
                      <p>{strength.description}</p>
                    </div>
                  </div>
                </BorderGlow>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-stage">
            <div className="section-title-block section-title-block--contact">
              <span>CONTACT</span>
              <h2>联系方式</h2>
            </div>
            <h2>
              如果你正在寻找一个
              <br />
              兼顾品牌感与执行力的设计师
            </h2>
            <p>
              我期待参与更完整的品牌视觉、AI设计流程与产品表达项目，
              也欢迎基于作品集继续深入沟通。
            </p>
            <a className="primary-button" href="tel:18356452672">
              电话18356452672
            </a>
          </div>
        </section>
        </div>
      </main>
    </div>
  )
}

export default App
