import './SocialOrbit.css'
import Me from '../../assets/me.jpg'
import { RiLinkedinFill } from 'react-icons/ri'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import type { ReactElement } from 'react'

type CSSVar = React.CSSProperties & Record<`--${string}`, string>

interface OrbitItem {
    bg: string
    href: string
    icon: ReactElement
    label: string
}

const items: OrbitItem[] = [
    {
        bg: '255, 255, 255',
        href: 'mailto:germaccagnan@gmail.com',
        icon: <MdEmail color='#000' />,
        label: 'Email',
    },
    {
        bg: '0, 119, 181',
        href: 'https://www.linkedin.com/in/germano-maccagnan-dos-santos',
        icon: <RiLinkedinFill />,
        label: 'LinkedIn',
    },
    {
        bg: '255, 255, 255',
        href: 'https://github.com/GerMacca',
        icon: <TbBrandGithubFilled color='#1e39d4' />,
        label: 'GitHub',
    },
    {
        bg: '37, 211, 102',
        href: 'https://wa.me/5554991630400',
        icon: <FaWhatsapp />,
        label: 'WhatsApp',
    },
]

export default function SocialOrbit() {
    return (
        <nav className="orbit-container">
            <div className="social-orbit">
                <img src={Me} alt="Germano Maccagnan" className="Me" draggable="false" />

                {items.map(item => (
                    <div
                        key={item.label}
                        className="orbit-item"
                        style={{ '--bg': item.bg } as CSSVar}
                    >
                        <a
                            className="itemAncor"
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                        >
                            {item.icon}
                        </a>
                    </div>
                ))}
            </div>
        </nav>
    )
}
