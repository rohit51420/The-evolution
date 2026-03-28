# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

#The Evolution of the Internet: An Interactive Journey "DESCRIPTION" :-
I built this project because I wanted to turn the history of the web into something you can actually feel, rather than just reading a static Wikipedia page. It’s a scroll-driven experience that takes you all the way from the first ARPANET message in 1969 to where we might be heading with a decentralized future.

The site is broken down into five distinct eras, and I gave each one its own "vibe." For the ARPANET section, I went with a heavy terminal aesthetic—lots of scanline effects and typing animations to recreate that old-school feel. When you scroll into the Dot-Com era, everything kind of explodes; I used floating HTML tags and retro fonts to capture that chaotic, "Wild West" energy of the early web.

From there, it shifts into the Social Media phase, where I focused more on micro-interactions and those constant notifications we're all used to now. For the Modern Web, I kept things clean with smooth gradients and high-performance layouts to show how much more polished the cloud-based web has become. Finally, I capped it off with a Web3 environment. I used Three.js to build a 3D network that reacts as you move your mouse, which felt like the best way to visualize a user-driven, decentralized ecosystem.

On the technical side, I built the core in React and used Lenis to get that "butter-smooth" scrolling effect. I relied on Intersection Observer to trigger the reveals exactly when the user hits a certain point. It was a bit of a balancing act to get the WebGL 3D scenes to play nice with the CSS parallax effects without tanking the frame rate, but I’m really happy with how responsive it turned out.

Every little detail—from how the custom cursor changes to the subtle hover states—was designed to make the site feel alive. My goal wasn't just to explain the internet's history; I wanted people to actually step inside the story and interact with it.

Thankyou...
