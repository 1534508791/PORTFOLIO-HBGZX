import BorderGlow from './components/BorderGlow'
import Grainient from './components/Grainient'
import TubelightNav from './components/TubelightNav'
import { Bot, Box, Gauge, Sparkles, Users } from 'lucide-react'
import './App.css'

const navItems = [
  { label: '简介', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '优势', href: '#strengths' },
  { label: '联系', href: '#contact' },
]

const stats = [
  { value: '5年', label: '视觉与三维设计经验' },
  { value: '4人', label: '小团队协作与项目带领' },
  { value: '211', label: '江南大学本科背景' },
  { value: 'AI', label: '工作流落地与内部培训' },
]

const timeline = [
  {
    period: '2025.04 - 至今',
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
    image: '/media/project-midea.png',
  },
  {
    title: '追觅项目',
    image: '/media/project-dreame.png',
  },
  {
    title: '动画项目',
    image: '/media/project-mova.png',
  },
  {
    title: '外贸项目',
    image: '/media/project-bosideng.png',
  },
]

const strengths = [
  {
    id: 'brand',
    layout: 'feature',
    english: 'BRAND DIRECTION',
    title: '品牌审美控制',
    description:
      '能够在品牌调性、商业诉求与画面节奏之间找到稳定平衡，不做模板式堆砌。',
    points: ['调性统一', '视觉判断', '质感把控'],
  },
  {
    id: 'three-d',
    layout: 'standard',
    english: '3D / MOTION',
    title: '三维动态表达',
    description:
      '熟练处理三维建模、渲染、材质与动态表现，让产品与视觉叙事更有说服力。',
    points: ['建模渲染', '镜头组织', '材质氛围'],
  },
  {
    id: 'ai',
    layout: 'standard',
    english: 'AI WORKFLOW',
    title: 'AI设计落地',
    description:
      '不把 AI 只当作概念工具，而是推动到流程层、培训层与实际项目交付中。',
    points: ['流程搭建', '团队培训', '交付提效'],
  },
  {
    id: 'campaign',
    layout: 'wide',
    english: 'CAMPAIGN DELIVERY',
    title: '大促项目经验',
    description:
      '经历多次 6.18 与双 11 高压节奏，理解节点营销对速度、协同与稳定输出的要求。',
    points: ['节点节奏', '高压协同', '稳定交付'],
  },
  {
    id: 'collab',
    layout: 'wide',
    english: 'COLLABORATION',
    title: '协作沟通能力',
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

function renderStrengthVisual(strength) {
  switch (strength.id) {
    case 'brand':
      return (
        <div className="strength-visual strength-visual--brand" aria-hidden="true">
          <div className="strength-brand-ring strength-brand-ring--outer" />
          <div className="strength-brand-ring strength-brand-ring--inner" />
          <div className="strength-brand-core">
            <Sparkles size={24} strokeWidth={1.4} />
            <strong>BRAND</strong>
            <span>tone / pace / texture</span>
          </div>
        </div>
      )
    case 'three-d':
      return (
        <div className="strength-visual strength-visual--three-d" aria-hidden="true">
          <div className="strength-cube-stack">
            <span />
            <span />
            <span />
          </div>
          <div className="strength-visual-chip">
            <Box size={16} strokeWidth={1.5} />
            <span>Render / Motion</span>
          </div>
        </div>
      )
    case 'ai':
      return (
        <div className="strength-visual strength-visual--ai" aria-hidden="true">
          <div className="strength-scanlines">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="strength-ai-console">
            <Bot size={18} strokeWidth={1.6} />
            <div>
              <span>Workflow</span>
              <strong>Concept to delivery</strong>
            </div>
          </div>
        </div>
      )
    case 'campaign':
      return (
        <div className="strength-visual strength-visual--campaign" aria-hidden="true">
          <div className="strength-gauge-block">
            <div className="strength-gauge-head">
              <Gauge size={18} strokeWidth={1.6} />
              <span>Peak timeline control</span>
            </div>
            <div className="strength-gauge-bars">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="strength-inline-tags">
            <span>6.18</span>
            <span>双11</span>
            <span>Campaign</span>
          </div>
        </div>
      )
    case 'collab':
      return (
        <div className="strength-visual strength-visual--collab" aria-hidden="true">
          <div className="strength-network">
            <div className="strength-network-node strength-network-node--lead">
              <Users size={18} strokeWidth={1.6} />
              <span>Lead</span>
            </div>
            <div className="strength-network-node">
              <span>Team</span>
            </div>
            <div className="strength-network-node">
              <span>Client</span>
            </div>
            <div className="strength-network-node">
              <span>EN / CN</span>
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

function App() {
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
            poster="/media/project-midea.png"
          >
            <source src="/media/hero-samsung-washer.mp4" type="video/mp4" />
          </video>
<div className="hero-scrim" aria-hidden="true" />
          <header className="site-header site-header--hero">
            <TubelightNav items={navItems} />
          </header>
          <div className="hero-topline" aria-hidden="true">
            <span>VISUAL / AI / BRAND</span>
          </div>
          <div className="hero-content">
            <div className="hero-intro">
              <p className="hero-kicker">PORTFOLIO</p>
              <h1>何忠江</h1>
              <p className="hero-subtitle">2026 PORTFOLIO</p>
            </div>
            <div className="hero-side-rail" aria-hidden="true">
              <span className="hero-side-label">FUTURISTIC CONCEPT</span>
              </div>
          </div>

          <div className="hero-notes">
            <div className="hero-note-block">
              <p className="hero-note-title">Hangzhou / China</p>
              <p>5年商业项目经验</p>
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

        <div className="content-background-shell">
          <div className="content-background-layer" aria-hidden="true">
            <div className="content-background-sticky">
              <Grainient
                className="content-grainient"
                color1="#aeb5be"
                color2="#555d68"
                color3="#030507"
                timeSpeed={0.22}
                colorBalance={0.32}
                warpStrength={1.14}
                warpFrequency={3.15}
                warpSpeed={1.92}
                warpAmplitude={72}
                blendAngle={12}
                blendSoftness={0.34}
                rotationAmount={156}
                noiseScale={1.42}
                grainAmount={0.14}
                grainScale={1.45}
                grainAnimated
                contrast={1.12}
                gamma={0.94}
                saturation={0.16}
                centerX={-0.03}
                centerY={0.01}
                zoom={1.01}
              />
            </div>
          </div>

        <section className="content-section about-section" id="about">
          <div className="section-heading">
            <div className="section-title-block">
              <span>ABOUT</span>
              <h2>个人经历</h2>
            </div>
          </div>
          <div className="about-layout">
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
          </div>

          <div className="timeline">
            {timeline.map((item) => (
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
                key={`${item.company}-${item.period}`}
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
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-media">
                  <img src={project.image} alt={`${project.title} 项目视觉封面`} />
                </div>
                <div className="project-copy">
                  <h3>{project.title}</h3>
                  {project.summary ? <span>{project.summary}</span> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section strengths-section" id="strengths">
          <div className="section-heading">
            <div className="section-title-block">
              <span>STRENGTHS</span>
              <h2>个人优势</h2>
            </div>
          </div>
          <div className="strengths-grid">
            {strengths.map((strength) => (
              <article
                className={`strength-card reflective-panel strength-card--${strength.layout}`}
                key={strength.title}
              >
                {renderStrengthVisual(strength)}
                <div className="strength-copy">
                  <span className="strength-eyebrow">{strength.english}</span>
                  <h3>{strength.title}</h3>
                  <p>{strength.description}</p>
                  <div className="strength-tags">
                    {strength.points.map((point) => (
                      <span key={point}>{point}</span>
                    ))}
                  </div>
                </div>
              </article>
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
            <a className="primary-button" href="mailto:1534508791@qq.com">
              发送邮件至 1534508791@qq.com
            </a>
          </div>
        </section>
        </div>
      </main>
    </div>
  )
}

export default App
