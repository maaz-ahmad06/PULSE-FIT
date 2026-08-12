# PULSE FIT - Premium Gym & Fitness Website

A modern, high-performance, and 100% responsive single-page landing website built for elite fitness clubs and gym centers. Featuring a dark-themed premium design with neon accents, custom CSS animations, an interactive BMI calculator, and a full-screen landing preloader.

## ✨ Features

- **⚡ 2.5-Second Landing Preloader**: A smooth visual loading bar with animated weight/dumbbell indicators that delays display until assets are ready.
- **📱 100% Responsive Design**: Optimized layouts for mobile viewports, tablets, laptops, and ultra-wide screens. Absolutely zero horizontal overflow/scrolling.
- **🎛️ Interactive BMI Calculator**: An on-page body mass index calculator that instantly renders status ranges (Underweight, Normal, Overweight, Obese) and visually highlights the matching row on a reference table.
- **✨ Smooth Scroll Animations**: Utilizes the modern `IntersectionObserver` API for lag-free fade-ins and slide-ups as the user scrolls.
- **🔥 Live Stats Counter**: Interactive counters that animate from `0` to target statistics (e.g. member count, trainer size) when the statistics section scrolls into view.
- **💬 Testimonials Slider Carousel**: Fully-functional automated slideshow carousel with responsive dot navigation controls to show client reviews.
- **📧 Contact & Newsletter Modules**: Modern contact form layouts and email signups with styled feedback indicators.

## 🛠️ Built With

- **HTML5**: Semantic tags for solid accessibility and SEO standards.
- **CSS3 (Vanilla)**: Structured design system using CSS custom properties (variables), Grid/Flexbox layouts, and custom keyframe animations.
- **JavaScript (ES6)**: Vanilla DOM operations, slider intervals, layout triggers, and calculation functions.
- **Iconography & Fonts**: [Font Awesome 6](https://fontawesome.com/) & [Google Fonts](https://fonts.google.com/) (Inter + Montserrat).

## 🚀 Getting Started

Since this is a client-side static web application, it does not require complex build steps or node installations.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/gym-fitness-website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd gym-fitness-website
   ```
3. Open `index.html` directly in your browser, or run a local server (e.g., Live Server in VS Code, or Python `http.server` / Node `serve`).

### Running a local server (Optional but recommended):
Using Python:
```bash
python -m http.server 8000
```
Using Node:
```bash
npx serve
```

## 📂 Project Structure

```text
├── index.html     # Main structural layout with SEO tags
├── styles.css     # Design tokens, resets, media queries, and animations
├── script.js     # Scroll reveals, calculator, slider, and navbar logic
└── README.md      # Repository documentation
```

## 📄 License

This project is licensed under the MIT License.
