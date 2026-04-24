import { useEffect } from 'react';
import '../assets/Home.css';
import './css/navbar.css';

export default function Navbar() {
    useEffect(() => {
        if (!window.gsap) return;

        gsap.from(".navbar", {
        y: -60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        });

        gsap.from(".nav-links a", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.4,
        ease: "power2.out",
        });
    }, []);

    return (
        <nav className="navbar">
        <div className="nav-logo">
            AG<em>.</em>
        </div>

        <ul className="nav-links">
            {["About", "Work", "Stack", "Contact"].map((l) => (
            <li key={l}>
                <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
            ))}
        </ul>

        <div className="nav-status">
            <div className="nav-dot" />
            Somewhere, AR · 2026
        </div>
        </nav>
    );
}