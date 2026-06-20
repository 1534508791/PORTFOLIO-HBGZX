import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Mail, Sparkles, UserRound } from 'lucide-react'
import './TubelightNav.css'

const iconMap = {
  '#about': UserRound,
  '#projects': Briefcase,
  '#strengths': Sparkles,
  '#contact': Mail,
}

function getItemKey(item) {
  return item.href.replace('#', '') || item.label
}

function getActiveKey(items) {
  if (typeof window === 'undefined') return getItemKey(items[0] ?? { href: '', label: '' })
  const currentHash = window.location.hash || '#hero'
  const matched = items.find((item) => item.href === currentHash)
  return getItemKey(matched ?? items[0] ?? { href: '', label: '' })
}

function TubelightNav({ items }) {
  const preparedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        key: getItemKey(item),
        icon: iconMap[item.href] ?? UserRound,
      })),
    [items],
  )

  const [activeTab, setActiveTab] = useState(() => getActiveKey(preparedItems))

  useEffect(() => {
    const syncActive = () => {
      setActiveTab(getActiveKey(preparedItems))
    }

    syncActive()
    window.addEventListener('hashchange', syncActive)
    return () => window.removeEventListener('hashchange', syncActive)
  }, [preparedItems])

  return (
    <nav className="tubelight-shell" aria-label="主导航">
      <div className="tubelight-nav">
        {preparedItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.key

          return (
            <a
              key={item.key}
              href={item.href}
              className={`tubelight-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="tubelight-label">{item.label}</span>
              <span className="tubelight-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={2.25} />
              </span>

              {isActive ? (
                <motion.span
                  className="tubelight-lamp"
                  layoutId="tubelight-lamp"
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 28,
                  }}
                />
              ) : null}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default TubelightNav
