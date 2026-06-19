import React, { useState } from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
  const [hasImageError, setHasImageError] = useState(false);

  if (!hasImageError) {
    return (
      <img
        src="/logo.png"
        alt="imveloTripsIndia"
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        onError={() => setHasImageError(true)}
        className={`object-contain shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
    >
      <defs>
        {/* Leaf Gradients - Saturated & vibrant colors matched to the user's uploaded logo */}
        <linearGradient id="leafGreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#059669" /> {/* Emerald */}
          <stop offset="100%" stopColor="#064e3b" /> {/* Forest green shadow */}
        </linearGradient>

        <linearGradient id="leafLimeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a3e635" /> {/* Vibrant Lime */}
          <stop offset="100%" stopColor="#15803d" /> {/* Rich Green */}
        </linearGradient>

        <linearGradient id="leafYellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#facc15" /> {/* Gold Yellow */}
          <stop offset="100%" stopColor="#ca8a04" /> {/* Deep Gold Accent */}
        </linearGradient>

        {/* 
          Vibrant Multi-Color Theme Gradient for the Peace Base & Bottom half.
          Transitions seamlessly downwards from forest green -> spring green -> yellow -> orange -> crimson red.
        */}
        <linearGradient id="peaceBaseGrad" x1="256" y1="210" x2="256" y2="480" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#052e16" />   {/* Deep Forest Green shadow junction */}
          <stop offset="25%" stopColor="#15803d" />  {/* Clear dark green */}
          <stop offset="50%" stopColor="#22c55e" />  {/* Saturated grass green */}
          <stop offset="70%" stopColor="#eab308" />  {/* Rich Yellow-Gold */}
          <stop offset="85%" stopColor="#ea580c" />  {/* Vibrant Orange */}
          <stop offset="100%" stopColor="#b91c1c" /> {/* Clean Crimson Red */}
        </linearGradient>

        {/* 
          Canopy Branch Gradient.
          Transitions from bright lime-green tips at the top down to forest green bases.
        */}
        <linearGradient id="canopyGrad" x1="256" y1="30" x2="256" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#86efac" />   {/* Soft Lime highlight */}
          <stop offset="35%" stopColor="#22c55e" />  {/* Vibrant grass green scale */}
          <stop offset="75%" stopColor="#166534" />  {/* Deep Leaf Green */}
          <stop offset="100%" stopColor="#14532d" /> {/* Forest Green at trunk junction */}
        </linearGradient>

        {/* Standard teardrop-elliptical leaf definition */}
        <path id="leaf" d="M 0,0 C -8,-12 -11,-22 -4,-30 C -1,-33 3,-33 6,-30 C 13,-22 9,-12 0,0 Z" />
      </defs>

      {/* ========================================== */}
      {/* 1. SEAMLESS BASE TREE SPOKES & CRADLE ARC  */}
      {/* ========================================== */}
      
      {/* 
        Bottom Crescent Cradle (Steering Wheel outer loop).
        Uses are custom wide bezier path to flared up-tips exactly mirroring the uploaded logo.
      */}
      <path
        d="M 64,250 C 44,330 100,470 256,470 C 412,470 468,330 448,250"
        fill="none"
        stroke="url(#peaceBaseGrad)"
        strokeWidth="38"
        strokeLinecap="round"
      />

      {/* Left Diagonal peace spoke */}
      <line
        x1="256"
        y1="256"
        x2="135"
        y2="415"
        stroke="url(#peaceBaseGrad)"
        strokeWidth="34"
        strokeLinecap="round"
      />

      {/* Right Diagonal peace spoke */}
      <line
        x1="256"
        y1="256"
        x2="377"
        y2="415"
        stroke="url(#peaceBaseGrad)"
        strokeWidth="34"
        strokeLinecap="round"
      />

      {/* Bottom Vertical Trunk Spoke */}
      <line
        x1="256"
        y1="256"
        x2="256"
        y2="460"
        stroke="url(#peaceBaseGrad)"
        strokeWidth="38"
        strokeLinecap="round"
      />

      {/* ========================================== */}
      {/* 2. GLOWING GREEN CANOPY BRANCHES           */}
      {/* ========================================== */}

      {/* Main vertical trunk going straight up */}
      <line
        x1="256"
        y1="30"
        x2="256"
        y2="257"
        stroke="url(#canopyGrad)"
        strokeWidth="34"
        strokeLinecap="round"
      />

      {/* Level 1: Sweeping bottom-most branch scoop (Symmetrical and broad) */}
      <path
        d="M 256,230 C 180,270 90,260 45,175"
        fill="none"
        stroke="url(#canopyGrad)"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <path
        d="M 256,230 C 332,270 422,260 467,175"
        fill="none"
        stroke="url(#canopyGrad)"
        strokeWidth="28"
        strokeLinecap="round"
      />

      {/* Level 2: Mid Branch curve up and out */}
      <path
        d="M 256,170 C 180,185 130,135 125,75"
        fill="none"
        stroke="url(#canopyGrad)"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M 256,170 C 332,185 382,135 387,75"
        fill="none"
        stroke="url(#canopyGrad)"
        strokeWidth="20"
        strokeLinecap="round"
      />

      {/* Level 3: Upper branch structure */}
      <path
        d="M 256,110 C 210,120 180,95 180,50"
        fill="none"
        stroke="url(#canopyGrad)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 256,110 C 302,120 332,95 332,50"
        fill="none"
        stroke="url(#canopyGrad)"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Level 4: Top fork close to tree-apex */}
      <path
        d="M 256,60 C 240,60 225,50 225,30"
        fill="none"
        stroke="url(#canopyGrad)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M 256,60 C 272,60 287,50 287,30"
        fill="none"
        stroke="url(#canopyGrad)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* ========================================== */}
      {/* 3. LUSH SYMMETRICAL LEAF DOME CANOPY       */}
      {/* ========================================== */}
      <g id="canopy-leaves">
        
        {/* --- APEX TOP LEAVES --- */}
        <use href="#leaf" x="256" y="25" fill="url(#leafGreenGrad)" transform="translate(256, 25) scale(1.2) translate(-256, -25)" />
        <use href="#leaf" x="240" y="22" fill="url(#leafLimeGrad)" transform="translate(240, 22) rotate(-15) scale(0.95) translate(-240, -22)" />
        <use href="#leaf" x="272" y="22" fill="url(#leafYellowGrad)" transform="translate(272, 22) rotate(15) scale(0.95) translate(-272, -22)" />

        {/* --- LEFT CANOPY LAYERS (Outer dome arching downwards) --- */}
        <use href="#leaf" x="220" y="32" fill="url(#leafLimeGrad)" transform="translate(220, 32) rotate(-15) scale(1.0) translate(-220, -32)" />
        <use href="#leaf" x="185" y="45" fill="url(#leafYellowGrad)" transform="translate(185, 45) rotate(-30) scale(1.0) translate(-185, -45)" />
        <use href="#leaf" x="155" y="60" fill="url(#leafGreenGrad)" transform="translate(155, 60) rotate(-45) scale(1.05) translate(-155, -60)" />
        <use href="#leaf" x="130" y="80" fill="url(#leafLimeGrad)" transform="translate(130, 80) rotate(-60) scale(1.1) translate(-130, -80)" />
        <use href="#leaf" x="110" y="110" fill="url(#leafYellowGrad)" transform="translate(110, 110) rotate(-75) scale(1.05) translate(-110, -110)" />
        <use href="#leaf" x="95" y="145" fill="url(#leafGreenGrad)" transform="translate(95, 145) rotate(-90) scale(1.1) translate(-95, -145)" />
        <use href="#leaf" x="80" y="180" fill="url(#leafLimeGrad)" transform="translate(80, 180) rotate(-100) scale(1.15) translate(-80, -180)" />
        <use href="#leaf" x="65" y="225" fill="url(#leafYellowGrad)" transform="translate(65, 225) rotate(-115) scale(1.1) translate(-65, -225)" />
        <use href="#leaf" x="60" y="270" fill="url(#leafGreenGrad)" transform="translate(60, 270) rotate(-130) scale(1.05) translate(-60, -270)" />
        <use href="#leaf" x="70" y="315" fill="url(#leafLimeGrad)" transform="translate(70, 315) rotate(-145) scale(0.95) translate(-70, -315)" />

        {/* --- RIGHT CANOPY LAYERS (Outer dome arching downwards) --- */}
        <use href="#leaf" x="292" y="32" fill="url(#leafLimeGrad)" transform="translate(292, 32) rotate(15) scale(1.0) translate(-292, -32)" />
        <use href="#leaf" x="327" y="45" fill="url(#leafYellowGrad)" transform="translate(327, 45) rotate(30) scale(1.0) translate(-327, -45)" />
        <use href="#leaf" x="357" y="60" fill="url(#leafGreenGrad)" transform="translate(357, 60) rotate(45) scale(1.05) translate(-357, -60)" />
        <use href="#leaf" x="382" y="80" fill="url(#leafLimeGrad)" transform="translate(382, 80) rotate(60) scale(1.1) translate(-382, -80)" />
        <use href="#leaf" x="402" y="110" fill="url(#leafYellowGrad)" transform="translate(402, 110) rotate(75) scale(1.05) translate(-402, -110)" />
        <use href="#leaf" x="417" y="145" fill="url(#leafGreenGrad)" transform="translate(417, 145) rotate(90) scale(1.1) translate(-417, -145)" />
        <use href="#leaf" x="432" y="180" fill="url(#leafLimeGrad)" transform="translate(432, 180) rotate(100) scale(1.15) translate(-432, -180)" />
        <use href="#leaf" x="447" y="225" fill="url(#leafYellowGrad)" transform="translate(447, 225) rotate(115) scale(1.1) translate(-447, -225)" />
        <use href="#leaf" x="452" y="270" fill="url(#leafGreenGrad)" transform="translate(452, 270) rotate(130) scale(1.05) translate(-452, -270)" />
        <use href="#leaf" x="442" y="315" fill="url(#leafLimeGrad)" transform="translate(442, 315) rotate(145) scale(0.95) translate(-442, -315)" />

        {/* --- DEEP UNDER-CANOPY SWIRLS (Left side) --- */}
        <use href="#leaf" x="120" y="235" fill="url(#leafGreenGrad)" transform="translate(120, 235) rotate(-125) scale(0.9) translate(-120, -235)" />
        <use href="#leaf" x="165" y="270" fill="url(#leafLimeGrad)" transform="translate(165, 270) rotate(-140) scale(0.95) translate(-165, -270)" />
        <use href="#leaf" x="215" y="295" fill="url(#leafYellowGrad)" transform="translate(215, 295) rotate(-160) scale(0.9) translate(-215, -295)" />

        {/* --- DEEP UNDER-CANOPY SWIRLS (Right side) --- */}
        <use href="#leaf" x="392" y="235" fill="url(#leafGreenGrad)" transform="translate(392, 235) rotate(125) scale(0.9) translate(-392, -235)" />
        <use href="#leaf" x="347" y="270" fill="url(#leafLimeGrad)" transform="translate(347, 270) rotate(140) scale(0.95) translate(-347, -270)" />
        <use href="#leaf" x="297" y="295" fill="url(#leafYellowGrad)" transform="translate(297, 295) rotate(160) scale(0.9) translate(-297, -295)" />

        {/* --- SHADED DEEP CORE INTERIORS (Lush fill around central trunk) --- */}
        {/* Left deep trunk groups */}
        <use href="#leaf" x="220" y="85" fill="url(#leafGreenGrad)" transform="translate(220, 85) rotate(-25) scale(0.85) translate(-220, -85)" />
        <use href="#leaf" x="195" y="125" fill="url(#leafYellowGrad)" transform="translate(195, 125) rotate(-40) scale(0.85) translate(-195, -125)" />
        <use href="#leaf" x="175" y="165" fill="url(#leafLimeGrad)" transform="translate(175, 165) rotate(-60) scale(0.9) translate(-175, -165)" />
        <use href="#leaf" x="165" y="205" fill="url(#leafGreenGrad)" transform="translate(165, 205) rotate(-85) scale(0.85) translate(-165, -205)" />

        {/* Right deep trunk groups */}
        <use href="#leaf" x="292" y="85" fill="url(#leafGreenGrad)" transform="translate(292, 85) rotate(25) scale(0.85) translate(-292, -85)" />
        <use href="#leaf" x="317" y="125" fill="url(#leafYellowGrad)" transform="translate(317, 125) rotate(40) scale(0.85) translate(-317, -125)" />
        <use href="#leaf" x="337" y="165" fill="url(#leafLimeGrad)" transform="translate(337, 165) rotate(60) scale(0.9) translate(-337, -165)" />
        <use href="#leaf" x="347" y="205" fill="url(#leafGreenGrad)" transform="translate(347, 205) rotate(85) scale(0.85) translate(-347, -205)" />

        {/* Outer Mid-height Accents */}
        <use href="#leaf" x="215" y="180" fill="url(#leafLimeGrad)" transform="translate(215, 180) rotate(-30) scale(0.8) translate(-215, -180)" />
        <use href="#leaf" x="297" y="180" fill="url(#leafLimeGrad)" transform="translate(297, 180) rotate(30) scale(0.8) translate(-297, -180)" />
        <use href="#leaf" x="220" y="240" fill="url(#leafYellowGrad)" transform="translate(220, 240) rotate(-55) scale(0.8) translate(-220, -240)" />
        <use href="#leaf" x="292" y="240" fill="url(#leafYellowGrad)" transform="translate(292, 240) rotate(55) scale(0.8) translate(-292, -240)" />

        {/* Center High clusters */}
        <use href="#leaf" x="256" y="80" fill="url(#leafYellowGrad)" transform="translate(256, 80) rotate(15) scale(0.8) translate(-256, -80)" />
        <use href="#leaf" x="256" y="120" fill="url(#leafLimeGrad)" transform="translate(256, 120) rotate(-15) scale(0.8) translate(-256, -120)" />
      </g>
    </svg>
  );
}
