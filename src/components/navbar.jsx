import { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from './Logo';
import '../assets/Home.css';
import './css/navbar.css';

export default function Navbar() {
    const container = useRef();

    useGSAP(() => {
        gsap.from(".navbar", {
        y: -60,
        opacity: 100,
        duration: 0.9,
        ease: "power3.out",
        });

        gsap.to(".nav-links a", {
        y: -20,
        opacity: 100,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.4,
        ease: "power2.out",
        });
    }, { scope: container });

    return (
        <nav className="navbar" ref={container}>
        <div className="nav-logo">
            <Logo color="#eeede8" size="30px" />
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