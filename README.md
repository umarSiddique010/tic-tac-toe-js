# Tic Tac Toe – Vanilla JS, Modular, Fully Tested


<div align="center">

A modern, accessible, and fully tested implementation of Tic Tac Toe using **vanilla JavaScript**, built with modular architecture, **OOP principles**, and **Vitest-powered unit/integration testing**.
Designed for clean readability, real-world maintainability, and professional code demonstration.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Responsive-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev)
[![jsdom](https://img.shields.io/badge/jsdom-DOM_Simulation-blue?style=for-the-badge)](https://github.com/jsdom/jsdom)
[![Accessibility](https://img.shields.io/badge/Accessibility-ARIA_Compliant-green?style=for-the-badge)](https://www.w3.org/WAI/)
[![Modular](https://img.shields.io/badge/Structure-OOP_Modular-4B0082?style=for-the-badge)](https://en.wikipedia.org/wiki/Object-oriented_programming)

</div>

---

## Project Overview

This Tic Tac Toe project is not a basic beginner app — it's an exercise in **frontend architecture** and **clean code execution**. It demonstrates separation of concerns between logic, UI, and DOM manipulation, while integrating accessibility, sound UX feedback, and complete test coverage.

> **For Recruiters & Clients**:
> Every component is testable, decoupled, and written with maintainability in mind. No frameworks were used. All interactions, logic, and states are verified via Vitest and jsdom to simulate the real browser environment. This is production-style code with zero dependencies.

---

## Feature Overview

| Feature              | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| Two-player Support   | Dynamic name input and alternate turn handling with visual/audio feedback |
| Modular Architecture | Clear separation across GameLogic, GameUI, GameSound modules              |
| DOM-Driven Feedback  | Real-time ARIA updates and result announcements                           |
| Audio Integration    | Click, start, game over, and replay sounds managed via toggleable system  |
| Form + Game Flow     | Smooth transitions between form input, gameplay, and end modal            |
| Accessibility Ready  | ARIA labels, keyboard focus support, semantic markup                      |
| Full Testing         | Unit and integration tests covering all user interactions and edge cases  |

---

## Code Architecture

### Modular Classes

**GameLogic**  
Controls game state, player turns, win detection, and round resets.

**GameUI, OutputMsg**  
Handles DOM queries, live message updates, result displays, and clearing feedback.

**HandleInput**  
Manages form submission, name storage, and toggling game visibility.

**GameSound**  
Handles all sound effects with mute/unmute toggling and volume balancing.

---

### Testing Strategy (100% logic + integration coverage)

| File                | Type        | Description                                                             |
| ------------------- | ----------- | ----------------------------------------------------------------------- |
| `GameLogic.test.js` | Unit        | Covers player turns, win/draw detection, reset/playAgain logic          |
| `GameUI.test.js`    | Unit (DOM)  | Tests ARIA feedback, DOM mutations, form handling, name validation      |
| `GameSound.test.js` | Unit        | Verifies sound play/mute/unmute/volume methods across all Audio objects |
| `main.test.js`      | Integration | Simulates form submits, mute toggles, cell clicks, and button behaviors |

Testing powered by:
- `Vitest` for test execution
- `jsdom` for virtual DOM rendering
- Full mocks for class method isolation and behavior simulation


---

##  HTML & CSS Showcase

This project doesn't just run — it **looks and feels professional**. The interface is built with a keen eye on layout hierarchy, accessibility, and responsive behavior.

| Category         | Highlights                                                                 |
|------------------|---------------------------------------------------------------------------|
|  **HTML Semantics** | Uses ARIA roles, `aria-label`s, and proper headings for screen readers |
|  **Responsive Layout** | Built mobile-first with flexible grid + media queries                |
|  **Game Grid**       | Built with `CSS Grid` for intuitive 3×3 layout                        |
|  **Visual Feedback** | Button states, hover effects, and winner modal with blur background   |
|  **Styling**         | Balanced color palette for accessibility, contrast, and clarity       |
|  **Assets**          | SVG-based icons for sound controls and a custom game logo             |

>  All buttons and forms are keyboard-accessible. Markup passes basic WCAG AA contrast and interaction guidelines.


---

## Folder Structure

```
tic-tac-toe/
├── index.html               # Game layout and structure
├── style.css                # Custom styles, animations, responsive design
├── main.js                  # Entry point, event binding, integration layer
├── src/
│   ├── GameLogic.js         # Core game engine
│   ├── GameUI.js            # DOM management + messaging
│   ├── GameSound.js         # Audio control (mute, play, volume)
│   └── assets/
│     ├── game-over.gif         # Animated modal graphic
│     ├── music-note.svg        # Sound icon (on)
│     ├── music-note-off.svg    # Sound icon (muted)
│     ├── tic-tac-toe-icon.svg  # Favicon/logo
│     └── sounds/          # All MP3 sound assets
├── test/
│   ├── GameLogic.test.js
│   ├── GameUI.test.js
│   ├── GameSound.test.js
│   └── main.test.js
├── package.json             # Metadata, devDeps (Vitest, jsdom), scripts
├── vitest.config.js         # jsdom environment config
└── .gitignore               # Clean VCS hygiene
```

---

## How to Run & Test

```bash
# Clone repository
git clone https://github.com/yourusername/tic-tac-toe.git

# Navigate into the project
cd tic-tac-toe

# Install dev dependencies
npm install

# Run all tests (unit + integration)
npm test
```

---

## Professional Highlights

### Clean Code & Maintainability
- Follows **Single Responsibility Principle**
- All classes are testable in isolation
- DOM updates are scoped to clear interfaces

### Testing Discipline
- Achieved **complete coverage** with both logic and real DOM event tests
- Used `mockImplementation`, spies, and `beforeEach` DOM setups

### UX & Accessibility
- Custom sound cues with visual toggling
- Responsive design and mobile-first layout
- ARIA-compliant feedback (live regions, button states, labels)

---

## Author

**Md Umar Siddique**


[![GitHub](https://img.shields.io/badge/@umarSiddique010-181717?style=flat-square&logo=github)](https://github.com/umarSiddique010)
[![LinkedIn](https://img.shields.io/badge/LinkedIn:%20Md%20Umar%20Siddique-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/md-umar-siddique-1519b12a4/)
[![Gmail](https://img.shields.io/badge/us70763@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:us70763@gmail.com)


---

<div align="center">

**This repository reflects clean JavaScript engineering, not toy-level prototyping.**  
If you're reviewing this for hiring or freelance purposes — feel free to reach out or request code walkthroughs.

</div>