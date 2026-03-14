import './SocialOrbit.css';
import Me from '../../assets/me.jpg';
import { RiLinkedinFill, RiMailSendLine } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";

type CSSVar = React.CSSProperties & Record<`--${string}`, string>;

export default function SocialOrbit() {
    return (
        <nav className="orbit-container">
            <div className="social-orbit">
                <img src={Me} alt="Germano Maccagnan" className="Me" draggable="false" />

                <div className="orbit-item" style={{ '--bg': '255, 255, 255' } as CSSVar}>
                    <a className="itemAncor" href="mailto:germaccagnan@gmail.com" target='_blank' rel="noopener noreferrer">
                        <RiMailSendLine size={45} color="#000000" />
                    </a>
                </div>

                <div className="orbit-item" style={{ '--bg': '0, 119, 181' } as CSSVar}>
                    <a className="itemAncor" href="https://www.linkedin.com/in/germano-maccagnan-dos-santos" target="_blank" rel="noopener noreferrer">
                        <RiLinkedinFill size={45} color="#fff" />
                    </a>
                </div>

                <div className="orbit-item" style={{ '--bg': '30, 30, 30' } as CSSVar}>
                    <a className="itemAncor" href="https://github.com/GerMacca" target="_blank" rel="noopener noreferrer">
                        <TbBrandGithubFilled size={45} color="#ffffff" />
                    </a>
                </div>

                <div className="orbit-item" style={{ '--bg': '37, 211, 102' } as CSSVar}>
                    <a className="itemAncor" href="https://wa.me/5554991630400" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp size={45} color="#fff" />
                    </a>
                </div>
            </div>
        </nav>
    );
}
