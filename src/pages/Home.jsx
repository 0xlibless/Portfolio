import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../components/navbar";

const ZH = " Todavia ・ no ・ ";
const TAPE_CONTENT = ZH.repeat(8);

function PersonSVG() {
  return (
    <h1>aca habria un svg</h1>
  )
}

function TapeBands() {
  return (
    <>
      <div className="tape-band">
        <span className="tape-text">{TAPE_CONTENT}</span>
      </div>
    </>
  );
}

function HeroImage() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.gsap) return;

    let raf;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e) => {
      targetX = ((e.clientX / window.innerWidth) - 0.5) * 2;
      targetY = ((e.clientY / window.innerHeight) - 0.5) * 2;
    };

    const tick = () => {
      gsap.to(el, {
        x: targetX * 26,
        y: targetY * 20,
        rotation: targetX * 2.2,
        duration: 1.6,
        ease: "power2.out",
      });

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero-image" ref={ref}>
      <PersonSVG />
      <div className="hero-year">PORTFOLIO · MMXXVI</div>
    </div>
  );
}

export default function HeroPortfolio() {



  useEffect(() => {
    if (!window.gsap) return;

    const tl = gsap.timeline({ delay: 0.15 });

    tl.from(".tape-band", {
      xPercent: -110,
      duration: 0.75,
      stagger: 0.09,
      ease: "power3.out",
    })
      .from(
        ".hero-label",
        { y: 22, opacity: 0, duration: 0.65 },
        "-=.4"
      )
      .from(
        ".hero-name",
        { y: 80, opacity: 0, duration: 1.1, ease: "power4.out" },
        "-=.3"
      )
      .from(
        ".hero-name-outline",
        { y: 60, opacity: 0, duration: 0.9, ease: "power3.out" },
        "-=.7"
      )
      .from(
        ".hero-tags .hero-tag",
        { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 },
        "-=.3"
      )
      .from(
        ".hero-image",
        { scale: 0.9, opacity: 0, duration: 1.2, ease: "power2.out" },
        0.6
      )
      .from(
        ".hero-index, .hero-scroll",
        { opacity: 0, duration: 0.7 },
        "-=.4"
      );
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="grain" />
        <TapeBands />

        <div className="hero-content">
          <p className="hero-label">Portfolio 2026</p>

          <h1>
            <span className="hero-name">AGUS</span>
            <span className="hero-name-outline">
              DEV
              <em
                style={{
                  fontStyle: "normal",
                  color: "transparent",
                  WebkitTextStroke: "2px #0a0a0a",
                }}
              >
                .
              </em>
            </span>
          </h1>

          <div className="hero-tags">
            <span className="hero-tag filled">Dev</span>
            <span className="hero-tag">Student</span>
            <span className="hero-tag">Builder</span>
          </div>
        </div>

        <HeroImage />

        <div className="hero-index">01 / HERO</div>

        <div className="hero-scroll">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>
    </>
  );
}