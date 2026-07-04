# DESIGN.md

# Design Vision

**Theme:** Modern Minimalist × Digital Workspace

Platform untuk menemukan rekan tim project berdasarkan skill, rating,
dan kecocokan proyek. Visual harus terasa seperti workspace profesional
untuk para builder, bukan job portal atau media sosial.

## Brand Personality

-   Professional
-   Collaborative
-   Playful

## Visual Principles

-   Monochrome sebagai fondasi.
-   Aksen warna brand hanya untuk fokus dan interaksi.
-   Banyak whitespace.
-   Tipografi kuat.
-   Grid tipis sebagai elemen latar.
-   Ilustrasi pixel digunakan sebagai aksen kecil.

## Color Palette

### Neutral

  Token            Color
  ---------------- -----------
  Background       `#FFFFFF`
  Surface          `#FAFAFA`
  Card             `#F3F4F6`
  Border           `#E5E7EB`
  Text Secondary   `#9CA3AF`
  Text Primary     `#111827`
  Heading          `#000000`

### Brand Accent

Primary: `#22C55E`

Optional Secondary:

-   `#4F46E5`
-   `#36D399`

## Typography

### Heading

-   Space Grotesk
-   General Sans
-   Satoshi

### Body

-   Inter

## Layout

-   12-column responsive grid
-   Border radius: 20px
-   Border: 1px solid #E5E7EB
-   Soft shadow: 0 8px 30px rgba(0,0,0,0.04)

## Background

-   Thin grid (40px spacing)
-   Grid opacity sekitar 6%
-   Noise sangat ringan
-   Blur gradient hijau di kiri atas
-   Blur gradient ungu/biru di kanan bawah

## Components

### Buttons

Primary: - Brand color - Rounded - Medium weight

Secondary: - White - Border only

### Cards

-   Clean
-   Rounded
-   Minimal shadow

### Skill Badge

-   Pill shape
-   Light gray background
-   Thin border

### Rating

Gunakan angka + progress indicator daripada hanya bintang.

Contoh: - 4.9 / 5 - Reliability Score - Completed Projects

## Icons

-   Outline style
-   Rounded
-   Konsisten
-   Gunakan Lucide atau Heroicons

## Pixel Illustration

Gunakan sebagai dekorasi kecil:

-   Laptop
-   Robot
-   Coffee
-   Keyboard
-   Cursor
-   Folder
-   Sparkles

Hindari full pixel art untuk seluruh UI.

## Motion

-   Hover translateY(-2px)
-   Scale card 1.01
-   Smooth progress animation
-   Fast transitions (150--250ms)

## Hero Section

Kiri: - Headline besar - Deskripsi singkat - CTA utama - CTA sekunder

Kanan: - Mockup dashboard - Floating pixel decorations

## Overall Experience

Pengguna harus merasakan:

-   Modern
-   Clean
-   Productive
-   Collaborative
-   Friendly
-   Developer-first

## Inspiration

-   Linear
-   Vercel
-   Raycast
-   GitHub
-   Stripe
