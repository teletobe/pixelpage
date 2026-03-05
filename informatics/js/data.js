/* ===========================================
   data.js — All static content data:
   translations (EN/DE), speech bubble messages,
   scene ordering, photo entries, and
   university project descriptions.

   Loaded first — other scripts reference these.
   =========================================== */

// ---- i18n: HTML element translations ----

const translations = {
  en: {
    "nav.about": "ABOUT",
    "nav.photobook": "ZINE",
    "nav.experience": "EXPERIENCE",
    "nav.contact": "CONTACT",
    "lang.toggle": "DE",
    "about.title": "WELCOME!",
    "about.greeting": "Hi! I'm Tobi (he/him)",
    "about.description":
      "Welcome to my website! Navigate through different areas to explore my work and interests. Use the buttons above to travel to different locations!",
    "about.level.label": "LEVEL:",
    "about.level.value":
      "Recently graduated MSc. Media & Human-Centred Computing",
    "about.interests.label": "INTERESTS:",
    "about.interests.value":
      "Interactive & Immersive Media, AI, Ethics, Photography",
    "photography.button": "OPEN ZINE",
    "experience.button": "EXPLORE EDUCATION & EXPERIENCE",
    "experience.title": "EDUCATION & EXPERIENCE",
    "room.bsc.title": "BSc. INFORMATICS",
    "room.bsc.summary":
      "Computer Science foundation. (University of Innsbruck, 2022).",
    "room.bsc.desc1":
      "Bachelor's degree in Computer Science at the University of Innsbruck, completed in 2022.<br />",
    "room.bsc.desc2":
      "A broad foundation across core informatics disciplines — from algorithms and systems to machine learning and software development.",
    "room.bsc.desc3": "Click to explore experience, competences & more.",
    "room.msc.title": "MSc. MEDIA & HUMAN-CENTRED COMPUTING",
    "room.msc.summary":
      "I graduated from TU Wien in 2026. Click here to here my thoughts about the programme.",
    "room.specialisations.title": "SPECIALISATIONS",
    "room.userresearch.title": "USER RESEARCH",
    "room.interactive.title": "INTERACTIVE MEDIA",
    "room.critical.title": "CRITICAL REFLECTION",
    "room.academia.title": "GLIMPSE INTO ACADEMIA",
    "room.academia.summary": "EduLab Vienna & TU Wien research.",
    "room.automation.title": "TEST AUTOMATION",
    "room.automation.summary": "Internship at Becton Dickinson.",
    "room.automation.desc1":
      "Click to see where I obtained professional work experience in IT.",
    "room.diversity.title": "GENDER & DIVERSITY COMPETENCES",
    "room.diversity.summary": "Certificate at TU Wien with STS classes.",
    "room.diversity.desc":
      "A Certificate in gender and diversity competences. Attended classes on STS. Click to learn what it encompassed.",
    "about.footer": "v2026 \u2014 Work in progress",
    "contact.title": "GET IN TOUCH",
    "contact.text": "Let's connect!",
    "contact.email": "EMAIL",
    "cs.title": "INFORMATICS 'JOURNEY'",
    "cs.description":
      "This is a little pixel sidescroller through my computer science education and work experience. Use ◀ and ▶ to travel between the chapters.",
    "cs.levelb.label": "BSc.:",
    "cs.levelb.value": "(traditional) Computer Science",
    "cs.levelm.label": "MSc.:",
    "cs.levelm.value": "Media & Human-Centred Computing",
    "cs.focus.label": "FOCUS:",
    "cs.focus.value": "Interactive Media & UX, Critical Reflection, AI Ethics",
    "cs.footer": "use ◀ and ▶ to explore each chapter",
    "chapter.1": "CHAPTER 1 \u2014 INNSBRUCK",
    "chapter.2": "CHAPTER 2 \u2014 MASTER",
    "chapter.3": "CHAPTER 3 \u2014 WORK EXPERIENCE",
    "cs.work.placeholder": "[MORE COMING SOON]",
    "cs.work.placeholder.summary": "Placeholder for future entries.",
    "cs.work.placeholder.desc":
      "Additional work experience will appear here - whenever I find a job lol",
  },
  de: {
    "nav.about": "\u00dcBER MICH",
    "nav.photobook": "ZINE",
    "nav.experience": "ERFAHRUNG",
    "nav.contact": "KONTAKT",
    "lang.toggle": "EN",
    "about.title": "WILLKOMMEN!",
    "about.greeting": "Hi, ich bin Tobi! :)",
    "about.description":
      "Willkommen auf meiner Website! Navigiere durch verschiedene Bereiche, um meine Arbeiten zu erkunden. Benutze die Buttons oben!",
    "about.level.label": "STUFE:",
    "about.level.value":
      "K\u00fcrzlich abgeschlossen: MSc. Media & Human-Centred Computing",
    "about.interests.label": "INTERESSEN:",
    "about.interests.value":
      "Interaktive & Immersive Medien, KI, Ethik, Fotografie",
    "photography.button": "ZINE \u00d6FFNEN",
    "experience.button": "AUSBILDUNG & ERFAHRUNG ENTDECKEN",
    "experience.title": "AUSBILDUNG & ERFAHRUNG",
    "room.bsc.title": "BSc. INFORMATIK",
    "room.bsc.summary":
      "Informatik-Grundlagen. (Universit\u00e4t Innsbruck, 2022).",
    "room.bsc.desc1":
      "Bachelorabschluss in Informatik an der Universit\u00e4t Innsbruck, 2022.<br />",
    "room.bsc.desc2":
      "Eine breite Grundlage \u00fcber alle Kerndisziplinen der Informatik — von Algorithmen und Systemen bis hin zu maschinellem Lernen und Softwareentwicklung.",
    "room.bsc.desc3": "Klicke f\u00fcr Erfahrungen, Kompetenzen & mehr.",
    "room.msc.title": "MSc. MEDIA & HUMAN-CENTRED COMPUTING",
    "room.msc.summary":
      "Abgeschlossen an der TU Wien in 2026. Klick hier f\u00fcr meine Gedanken über diesen Master.",
    "room.specialisations.title": "SPEZIALISIERUNGEN",
    "room.userresearch.title": "NUTZER:INNENFORSCHUNG",
    "room.interactive.title": "INTERAKTIVE MEDIEN",
    "room.critical.title": "KRITISCHE REFLEXION",
    "room.academia.title": "EINBLICK IN ACADEMIA",
    "room.academia.summary":
      "Beim EduLab TU Wien, Theory & Logic Group, and HCI Group.",
    "room.automation.title": "SQE ENGINEER INTERNSHIP",
    "room.automation.summary": "Praktikum bei Becton Dickinson.",
    "room.automation.desc1":
      "Klicke, um zu sehen, wo ich professionelle Berufserfahrung in der IT gesammelt habe.",
    "room.diversity.title": "GENDER & DIVERSIT\u00c4TSKOMPETENZEN",
    "room.diversity.summary": "Zertifikat an der TU Wien mit STS-Kursen.",
    "room.diversity.desc":
      "Ein Zertifikat in Gender- und Diversit\u00e4tskompetenzen. Kurse zu STS besucht. Klicke, um mehr dar\u00fcber zu erfahren.",
    "about.footer": "v2026 \u2014 Website in Arbeit",
    "contact.title": "KONTAKT",
    "contact.text": "Schreib mir gern! :)",
    "contact.email": "E-MAIL",
    "cs.title": "INFORMATIK",
    "cs.description":
      "Sieh dir meine Erfahrungen in der Informatik an, indem du dich in diesem Sidescroller bewegst. Nutze ◀ und ▶ um zwischen den Kapiteln zu navigieren.",
    "cs.levelb.label": "BSc.:",
    "cs.levelb.value": "Informatik",
    "cs.levelm.label": "MSc.:",
    "cs.levelm.value": "Media & Human-Centred Computing",
    "cs.focus.label": "SCHWERPUNKT:",
    "cs.focus.value": "Interaktive Medien & UX, Critical Reflection, KI-Ethik",
    "cs.location.label": "WOHNHAFT:",
    "cs.location.value": "Wien, \u00d6sterreich",
    "cs.footer": "◀ und ▶ nutzen, um die Kapitel zu erkunden",
    "chapter.1": "KAPITEL 1 \u2014 INNSBRUCK",
    "chapter.2": "KAPITEL 2 \u2014 MASTER",
    "chapter.3": "KAPITEL 3 \u2014 BERUFSERFAHRUNG",
    "cs.work.placeholder": "[MEHR FOLGT BALD]",
    "cs.work.placeholder.summary":
      "Platzhalter f\u00fcr zuk\u00fcnftige Eintr\u00e4ge.",
    "cs.work.placeholder.desc": "Weitere Berufserfahrungen erscheinen hier.",
  },
};

// ---- Speech bubble text per scene ----

const speechBubbleMessages_en = {
  about: "Hi! I'm Tobi :)",
  photography: "Check out my photos!",
  university: "My professional experiences",
  contact: "Let's connect!",
};

const speechBubbleMessages_de = {
  about: "Hi! Ich bin Tobi :)",
  photography: "Schau dir meine Fotos an!",
  university: "Meine beruflichen Erfahrungen :)",
  contact: "Schreib mir gern! :)",
};

let speechBubbleMessages = speechBubbleMessages_en;

// ---- Scene ordering (left-to-right) ----

const sceneOrder = {
  about: 0,
  photography: 1,
  university: 2,
  contact: 3,
};

// ---- Photo portfolio entries ----

const photos = [
  { src: "img/photobook/pf1.jpg", caption: "Photo 1" },
  { src: "img/photobook/pf2.jpg", caption: "Photo 2" },
  { src: "img/photobook/pf3.jpg", caption: "Photo 3" },
  { src: "img/photobook/pf4.jpg", caption: "Photo 4" },
  { src: "img/photobook/pf5.jpg", caption: "Photo 5" },
  { src: "img/photobook/pf6.jpg", caption: "Photo 6" },
  { src: "img/photobook/pf7.jpg", caption: "Photo 7" },
  { src: "img/photobook/pf8.jpg", caption: "Photo 8" },
  { src: "img/photobook/pf9.jpg", caption: "Photo 9" },
  { src: "img/photobook/pf10.jpg", caption: "Photo 10" },
  { src: "img/photobook/pf11.jpg", caption: "Photo 11" },
  { src: "img/photobook/pf12.jpg", caption: "Photo 12" },
  { src: "img/photobook/pf13.jpg", caption: "Photo 13" },
  { src: "img/photobook/pf14.jpg", caption: "Photo 14" },
  { src: "img/photobook/pf15.jpg", caption: "Photo 15" },
  { src: "img/photobook/pf16.jpg", caption: "Photo 16" },
  { src: "img/photobook/pf17.jpg", caption: "Photo 17" },
  { src: "img/photobook/pf18.jpg", caption: "Photo 18" },
  { src: "img/photobook/pf19.jpg", caption: "Photo 19" },
  { src: "img/photobook/pf20.jpg", caption: "Photo 20" },
  { src: "img/photobook/pf21.jpg", caption: "Photo 21" },
  { src: "img/photobook/pf22.jpg", caption: "Photo 22" },
  { src: "img/photobook/pf23.jpg", caption: "Photo 23" },
  { src: "img/photobook/pf24.jpg", caption: "Photo 24" },
  { src: "img/photobook/pf25.jpg", caption: "Photo 25" },
  { src: "img/photobook/pf26.jpg", caption: "Photo 26" },
  { src: "img/photobook/pf27.jpg", caption: "Photo 27" },
  { src: "img/photobook/pf28.jpg", caption: "Photo 28" },
];

// ---- University / experience project descriptions ----

const universityProjects_en = {
  "room-bsc": {
    title: "BSc. INFORMATICS",
    projects: [
      {
        name: "Studying in general.",
        description:
          "I started the CS degree with barely any programming background, which was definitely rough. The lectures and exams were pretty demanding and took up a lot of time.<br><br>On top of that, COVID hit after a few semesters, making uni life (especially any social side of it) even more exhausting. What made it bearable was finding a group of cool people who had to go through the same thing.<br><br>There were definitely moments and nights where quitting seemed like the reasonable choice. In retrospect though, I'm really glad I stuck with it!",
      },
      {
        name: "The competences I learned.",
        description:
          "The degree covered a broad range of core informatics disciplines: networking, operating systems, algorithms & data structures, maths, machine learning, software development, and more.<br><br>It wasn't extremely deep in any one of these areas, but still exactly the kind of foundation that builds a solid overall understanding.",
      },
      {
        name: "My Specialisation: Intelligent & Interactive Systems",
        description:
          "My specialisation focused on machine learning, computer vision, and interactive simulation. I got to take all kinds of courses on these topics and also obtained an NVIDIA CUDA Deep Learning Certificate.<br><br>All of that eventually led to my bachelor thesis: <em>Map Synthesis for Low-Poly 3D Scenes using Generative Adversarial Networks</em>.<br><br>In my thesis I applied GANs to generate 3D worlds from hand-drawn sketches of a playfield. See more <a href='https://github.com/teletobe/map-synth-ba' target='_blank'>on GitHub here</a>.",
      },
      {
        name: "Thoughts about the Degree.",
        description:
          "The degree delivered a certain breadth, but it was also a bit disappointing in places.<br><br>The focus was almost always purely technical, and rarely the question of who systems are being built for or what impact they might have. Ethical questions, for example, were never really on the agenda.<br><br>I did start a Master's in Innsbruck, but couldn't really connect with the specialisations there. Which is what led to Chapter 2 :)",
      },
    ],
  },
  "room-msc": {
    title: "MSc. MEDIA & HUMAN-CENTRED COMPUTING",
    projects: [
      {
        name: "Informatics is more than Computer Science...",
        description:
          "After a bachelor that was essentially just technical, it felt really refreshing to find a programme this programme. With a focus on interactive media, it was already super interesting..<br><br>But it also put humans and society into context, and acknoledges that the impacts of technology are never neutral.",
      },
      {
        name: "Why I liked this programme",
        description:
          "The curricula allowed me to chose from a pretty large list of electives. It also didn't feel like just some humanities electives in an otherwise technical programme.<br><br>I was able to combine research methods, critical theory, and hands-on interactive projects in a way that felt genuinely integrated.<br><br>While it was definitely not 'perfect' (what is?), the programme and professors made a real effort to focus on humans, exactly what was missing from the bachelor and exactly what I was looking for.",
      },
    ],
  },
  "room-userresearch": {
    title: "USER RESEARCH",
    projects: [
      {
        name: "Project about <strong>analysing the cycling infrastrcture in Vienna</strong>",
        description:
          "We conducted a mixed-methods analysis of Vienna's cycling infrastructure. <br><br>By combining forum discourse on Reddit, quantitative infrastructure data from available city maps, and Strava sensor data from actual participants in a user study, we aimed to evaluate the experiences of cyclist commuting in Vienna. We identified improvement areas and propose our approach as a transferable framework for urban mobility research.",
      },
      {
        name: "<strong>Designing EHR</strong> for HCI in Health Care",
        description:
          "In this project, I desgined a roadmap for developing an patient-centred electronical health record system.<br><br>I conducted interviews and designed a framework to <em>empower patients.</em>",
      },
      {
        name: "<strong>Technology Integration in Cognitive Behavioural Therapy</strong>",
        description:
          "I conducted a scoping review to evaluate the implications of assisting technologies in cognitive behavioural therapy. In it, I investigate the challenges critically and identify potential strategies to address identified limitations.",
      },
    ],
  },
  "room-interactive": {
    title: "INTERACTIVE MEDIA",
    projects: [
      {
        name: "<strong>PresentWrist:</strong> a gesture based hands-free presentation control.",
        description:
          "In this project we developed Present Wrist. It is a hands-free presentation slide control where presenters control their slides through gestures like waving back or forth. <br><br> We used a M5StackC as the equivalent of a programmable smartwatch. By processing live IMU data, we analysed the signals and identified patterns in them for when the slide presentation should be advanced.<br/><br/>Additional features were automatically notifying the presenter when a person in the crowd raises their hand to ask a quesiton. Tasks included: data processing, programming the M5Stack, and filming. A demo can be seen on: <a href='https://youtu.be/MCXeQ9j_rCE' target='_blank'>PresentWrist Demo Video</a>",
      },
      {
        name: "<strong>BeFilm:</strong> Film camera that takes pictures at front and back simultaneously.",
        description:
          "Inspired by the app BeReal, we designed and 3D-printed a film camera which takes a photo towards the front and the back at the same time. <strong>Bike Intent Signalling:</strong> Prototyping an intent signalling technology for bicycles. Features an app plus a microcontroller with buttons, vibration and sound to communicate turn signals and warn of dangers.",
      },
      {
        name: "<strong>Bike Intent Signalling:</strong> Prototyping intuitive turn and warn signals on bikes.",
        description:
          "We designed a prototyping for signalling intends on bikes in traffic. With buttons, users can communicate turns on their bikes to other traffic members. <br><br> Additioanlly, users are warned from dangers through audititive and haptic feedback. It features the design of the components and a small user study to analyse the intuitiveness of the signals. Tasks included: prototyping, programming, user study design and conduction.",
      },
      {
        name: "Some smaller projects on <em>Emergent Technologies<em>",
        description:
          "<strong>Text2Image:</strong> lets users scan content they are reading (e.g. books or newspaper) and automatically generates an image that corresponds to the content. Using LLMs and image generation APIs. <br/><br /><strong>VR:</strong> Two player collaborative puzzle game in virtual reality. <br /><br/><strong>AR:</strong> Geography country guessing app in augmented reality.",
      },
    ],
  },
  "room-critical": {
    title: "CRITICAL REFLECTION",
    projects: [
      {
        name: "<em>Socio-Technical-Systems?</em>",
        description:
          "Some of my favourite classes were on critical theory and theory of media communication. These classes thought how to question how technology, culture, amd power intersect.<br/><br/> Additionally, I can now brag to everyone that I read and discussed Baudrillard.",
      },
      {
        name: "<strong>Master Thesis: <strong>AI Ethics Auditing</strong>",
        description:
          "I was employed in a research project at TU Wien to develop a stakeholder-centred approach in the evaluation the ethics of AI. <br><br>In this project, I created a methodology featuring a workshop and a webtool to elicit and translate ethical concerns from stakeholders into auditable artefacts, viewable in a prototype dashboard. <a href='https://github.com/teletobe/audit-share' target='_blank'>View this repo on GitHub</a><br/><br><br> I also Co-authored a workshop paper at CHI25 workshop, attended conferences and reviewed academic paper. Overall, this experience was an amazing insight into academia.",
      },
    ],
  },
  "room-academia": {
    title: "GLIMPSE INTO ACADEMIA",
    projects: [
      {
        name: "<strong>Informatics Workshops for Schoolchildren</strong> at EduLab Vienna",
        description:
          "I was employed at the <a href='https://edulab.ifs.tuwien.ac.at' target='_blank'>EduLab</a> in Vienna to hold informatics workshops for schoolchildren of all ages.<br><br>The workshops were built around an explorative learning approach. So rather than lecturing, the children were guided to discover concepts themselves in unplugged workshop expercises.<br><br>. I was able to develop my own workshop methods and gained genuine didactics experience in the process.",
      },
      {
        name: "Employed as a <strong>Researcher at TU Wien</strong>",
        description:
          "For about a year, I was employed in a research project at TU Wien focused on AI ethics auditing.<br><br>Beyond the research itself, this gave me a real taste of academic life: I attended conferences, collaborated closely with researchers, and co-authored a workshop paper that was published at a CHI 2025 workshop.",
      },
      {
        name: "<em>My thoughts about doing a PhD...</em>",
        description:
          "The experiences working at TU Wien gave me a genuine glimpse into academia. During those, I did seriously contemplate following up with a PhD.<br><br>In the end I decided against it. Not because the research wasn't interesting. The collegues were also really amazing...<br><br> But ultimately, the systemic pressures that come with academic life did not feel enyojable: a publish-or-perish culture, the expectation to produce papers that don't always add real value, and a system that often prioritises output over impact.<br><br>That's not really an environment I want to build my career in, or at least not right now :)",
      },
    ],
  },
  "room-automation": {
    title: "TEST AUTOMATION INTERNSHIP",
    projects: [
      {
        name: "Manual and Automated Testing",
        description:
          "I gained hands-on experiencein an software quality engineering team during a four-month internship as a <strong>Test Automation Engineer</strong> at a medical technology company. <br><br> During it, I worked in an agile Scrum team on end-to-end tests for safety-critical infusion pump software. My responsibilities included manual system testing as well as developing and maintaining automated tests using <strong>C#</strong> and <strong>Cypress</strong> in a regulated environment.",
      },
      {
        name: "CI/CD DevOps",
        description:
          "I Integrated automated tests into CI pipelines using GitHub Actions and managed test planning, documentation, and traceability with <strong>Azure DevOps</strong>. <br><br> I also participated in a formal verification phase where all test cases were systematically executed and documented, gaining insights into structured test concepts, defect analysis, CI/CD workflows, and DevOps processes.",
      },
    ],
  },
  "room-diversity": {
    title: "GENDER & DIVERSITY COMPETENCES",
    projects: [
      {
        name: "Courses",
        description:
          "Trained through courses on <strong>diversity skills and management, feminist technology studies, impacts of technology, and technology assessment,</strong> with an STS-based approach to analyzing how technologies shape social structures, organizations, and users.",
      },
    ],
  },
};

const universityProjects_de = {
  "room-bsc": {
    title: "BSc. INFORMATIK",
    projects: [
      {
        name: "Generelle Erfahrungen im Studieren.",
        description:
          "Ich bin mit kaum Programmierkenntnissen in das Infostudium eingestiegen. Das war Anfangs definitiv ein harter Start. Die Vorlesungen und Pr\u00fcfungen waren ziemlich anspruchsvoll und nahmen viel Zeit in Anspruch.<br><br>Dazu war nach ein paar Semestern COVID womit (vor allem die Freizeit um) das Uni-Leben nur noch anstrengender wurde. Was es ertr\u00e4glich gemacht hat, war eine Gruppe von coolen Leuten zu finden, die dasselbe durchmachen mussten.<br><br>Es gab definitiv ein paar Momente und N\u00e4chte, in denen es ver\u00fcnftig schien, das Studium zu schmeissen. Im Nachhinein bin ich aber sehr gl\u00fccklich, es durchgezogen zu haben!",
      },
      {
        name: "Kompetenzen die ich gelernt habe.",
        description:
          "Im Studium wurde ein breites Spektrum an Kerndisziplinen der Informatik vermittelt: Netzwerktechnik, Betriebssysteme, Algorithmen & Datenstrukturen, Mathem, maschinelles Lernen, Softwareentwicklung, usw. war alles dabei.<br><br>Es war zwar nicht extrem tief in einer dieser Bereiche, aber trotzdem genau die Art von Grundlage, die ein solides Verst\u00e4ndnis vermittelte.",
      },
      {
        name: "Meine Spezialisierung: Intelligente & Interaktive Systeme",
        description:
          "Meine Spezialisierung im Studium lag auf maschinellem Lernen, Computer Vision und interaktiver Simulation. Ich konnte verschiedenste LVs zu diesen Themen besuchen und au\u00dferdem auch ein NVIDIA CUDA Deep Learning Zertifikat erwerben. <br><br> All das f\u00fchrte schlussendlich zu meiner Bachelorarbeit: <em>Map Synthesis for Low-Poly 3D Scenes using Generative Adversarial Networks</em>.<br><br> In meiner Arbeit habe ich GANs eingesetzt, um 3D-Welten aus handgezeichneten Skizzen eines Spielfelds zu generieren. Siehe mehr <a href='https://github.com/teletobe/map-synth-ba' target='_blank'>auf Github hier</a>. ",
      },
      {
        name: "Gedanken \u00fcbers Studium.",
        description:
          "Das Studium hat eine gewisse Breite geliefert, aber war an manchen Stellen auch etwas entt\u00e4uschent.<br><br> Im Mittelpunkt stand definitiv stets nur das technische, selten die Frage, f\u00fcr wen Systeme gebaut werden oder welche Auswirkungen sie haben k\u00f6nnten. Ethische Fragen waren z.B. nie ein Thema<br><br> Ich hab zwar den Master in Innsbruck angefangen, konnte mich aber mit den Spezialisierungen nicht wirklich anfreunden. Daher dann Kapitel 2 :)",
      },
    ],
  },
  "room-msc": {
    title: "MSc. MEDIA & HUMAN-CENTRED COMPUTING",
    projects: [
      {
        name: "Ein moderner (zeitgerechter) Ansatz an die Informatik.",
        description:
          "Nach einem Bachelor, der fast rein technisch ausgerichtet war, war eine Wechsel zu diesem Master eine passende Entscheidung. Interaktive Medien haben mich immer schon interessiert, doch das Curriculum bat sogar noch mehr...<br><br>Es wird annerkennt, dass Systeme nie neutral sind: in dem Master stehen Menschen, ihre Bed\u00fcrfnisse, und die gesselschaftlichen Auswirkungen von Technologien im Mittelpunkt. <br><br>Es wird durchgehend vermittelt, dass gutes Design bedeutet zu fragen, <em>f\u00fcr wen</em> und <em>warum</em> man gestaltet \u2014 nicht nur <em>wie</em>.",
      },
      {
        name: "Über den Master.",
        description:
          "Das Programm verband Forschungsmethoden, kritische Theorie und praktische interaktive Projekte auf eine Weise, die sich wirklich stimmig anf\u00fchlte. Es war nicht 'Informatik plus ein paar Geisteswissenschaften als Wahlfach'. Meist fühlte es sich wie ein koh\u00e4rentes Studium, das eine menschenzentrierte Perspektive in den Lehrveranstaltung ernst nahm.<br><br>Eine Kombination von Design Thinking, User Research, Ethik und das tats\u00e4chliche Erstellen von Technologien die Endnutzer:innen und weitere Stakeholder miteinbeziehen war genau das, was im Bachelor gefehlt hatte.",
      },
    ],
  },
  "room-userresearch": {
    title: "NUTZER:INNENFORSCHUNG",
    projects: [
      {
        name: "Projekt zur <strong>Analyse der Radinfrastruktur in Wien</strong>",
        description:
          "In einem Gruppenprojekt f\u00fchrten wir eine Mixed-Methods-Analyse der Wiener Radinfrastruktur durch.<br><br>Wir kombinierten Forumsdiskursen auf Reddit, quantitative Infrastrukturdaten aus verf\u00fcgbaren Stadtpl\u00e4nen und Strava-Sensordaten von Teilnehmer:innen einer Nutzerstudie, und bewerteten damit die Erfahrungen von Radpendler:innen in Wien. Schlussendlich identifizierten wir Verbesserungsbereiche und schlugen unseren Ansatz als \u00fcbertragbares Framework f\u00fcr urbane Mobilit\u00e4tsforschung vor.",
      },
      {
        name: "<strong>EHR-Design</strong> f\u00fcr HCI im Gesundheitswesen",
        description:
          "In diesem Projekt entwarf ich eine Roadmap f\u00fcr die Entwicklung eines patient:innenzentrierten elektronischen Patientenaktensystems.<br><br>Ich f\u00fchrte Interviews durch und entwickelte das Framework, um <em>Patient:innen zu st\u00e4rken.</em>",
      },
      {
        name: "<strong>Technologieeinsatz in der kognitiven Verhaltenstherapie</strong>",
        description:
          "Ich schrieb ein Scoping Review Paper, um die Auswirkungen von Assistenztechnologien in der kognitiven Verhaltenstherapie zu bewerten. Dabei untersuchte ich die Herausforderungen kritisch und identifizierte potenzielle Strategien zur Bew\u00e4ltigung erkannter Einschr\u00e4nkungen.",
      },
    ],
  },
  "room-interactive": {
    title: "INTERAKTIVE MEDIEN",
    projects: [
      {
        name: "<strong>PresentWrist:</strong> gestenbasierte, freih\u00e4ndige Pr\u00e4sentationssteuerung.",
        description:
          "In einem Projekt entwickelten meine Gruppe und ich <strong>PresentWrist</strong>. Es ist eine freih\u00e4ndige Pr\u00e4sentationssteuerung, mit der Vortragende ihre Folien durch Gesten wie Vor- oder R\u00fcckw\u00e4rtswedeln steuern. <br><br> Als Basis diente ein M5StackC als programmierbares Smartwatch-\u00c4quivalent. Durch die Verarbeitung von Live-IMU-Daten analysierten wir Signale und identifizierten Muster, die das Weiterschalten der Pr\u00e4sentation ausl\u00f6sen sollen.<br/><br/>Zus\u00e4tzlich wurden Vortragende automatisch benachrichtigt, wenn jemand im Publikum die Hand hebt. Aufgaben: Datenverarbeitung, Programmierung des M5Stack und Filmaufnahmen. Demo: <a href='https://youtu.be/MCXeQ9j_rCE' target='_blank'>PresentWrist Video</a>",
      },
      {
        name: "<strong>BeFilm:</strong> Filmkamera, die gleichzeitig vorne und hinten fotografiert.",
        description:
          "Inspiriert von der App BeReal, haben wir eine Filmkamera entworfen und per 3D-Druck gebaut, die gleichzeitig ein Foto nach vorne und nach hinten aufnimmt.",
      },
      {
        name: "<strong>Fahrrad-Absichtsanzeige:</strong> Prototypen f\u00fcr intuitive Abbiege- und Warnsignale.",
        description:
          "Wir entwickelten einen Prototypen zum Signalisieren der Absichten von Fahrenden auf Fahrr\u00e4dern im Stra\u00dfenverkehr. Mit Tasten k\u00f6nnen Fahrer:innen anderen Verkehrsteilnehmer:innen ihre Abbiegeabsicht mitteilen.<br><br>Zus\u00e4tzlich werden Nutzer:innen durch akustisches und haptisches Feedback vor Gefahren gewarnt. Das Projekt umfasst die Gestaltung der Komponenten sowie eine kleine Nutzerstudie zur Analyse der Intuitivit\u00e4t der Signale. Aufgaben: Prototyping, Programmierung, Nutzerstudiendesign und -durchf\u00fchrung.",
      },
      {
        name: "Kleinere Projekte zu <em>Emergent Technologies</em>",
        description:
          "<strong>Text2Image:</strong> Erm\u00f6glicht es Nutzer:innen, Inhalte die sie lesen (z.B. B\u00fccher oder Zeitungen) zu scannen und automatisch ein passendes Bild zu generieren. (Mithilfe von LLMs und Bildgenerierungs-APIs) <br/><br /><strong>VR:</strong> Kooperatives Zwei-Spieler-Puzzlespiel in virtueller Realit\u00e4t. <br /><br/><strong>AR:</strong> Geografie-L\u00e4nder-Ratespiel in erweiterter Realit\u00e4t.",
      },
    ],
  },
  "room-critical": {
    title: "KRITISCHE REFLEXION",
    projects: [
      {
        name: "<em>Sozio-Technische Systeme?</em>",
        description:
          "Einige meiner liebsten Lehrveranstaltungen behandelten kritische Theorie und Medientheorie. Diese Kurse lehrten mich zu hinterfragen, wie Technologie, Kultur und Macht miteinander zusammenh\u00e4ngen.<br/><br/> Au\u00dferdem kann ich jetzt damit angeben, dass ich Baudrillard gelesen und dar\u00fcber diskutiert habe.",
      },
      {
        name: "<strong>Masterarbeit: KI-Ethik-Auditing</strong>",
        description:
          "Ich war in einem Forschungsprojekt an der TU Wien angestellt, um einen stakeholder-zentrierten Ansatz zur Bewertung der Ethik von KI zu entwickeln. <br><br>Ich erstellte eine Methodik mit Workshop und Webtool, um ethische Bedenken von Stakeholdern zu erheben und in \u00fcberpr\u00fcfbare Artefakte zu \u00fcbersetzen, einsehbar in einem Prototyp-Dashboard. <a href='https://github.com/teletobe/audit-share' target='_blank'>Dieses Repo auf GitHub ansehen</a><br/><br><br> Au\u00dferdem co-autorisierte ich ein Workshop-Paper beim CHI25 Workshop, nahm an Konferenzen teil und reviewte akademische Paper. Insgesamt war das ein unglaublicher Einblick in die Wissenschaft.",
      },
    ],
  },
  "room-academia": {
    title: "EINBLICK IN DIE WISSENSCHAFT",
    projects: [
      {
        name: "<strong>Informatik-Workshops</strong> f\u00fcr Schulkinder im EduLab",
        description:
          "Ich war am <a href='https://edulab.ifs.tuwien.ac.at' target='_blank'>EduLab</a> an der TU Wien angestellt, um Informatik-Workshops f\u00fcr Schulkinder aller Altersstufen durchzuf\u00fchren.<br><br>Die Workshops basierten auf einem explorativen Lernansatz. Anstatt frontal zu unterrichten, wurden die Sch\u00fcler:innen dabei begleitet, informatische Konzepte selbst zu entdecken. Ich konnte ausserdem eigene Workshop-Methoden entwickeln und dabei Didaktikerfahrung sammeln.",
      },
      {
        name: "<strong>Forschen an einem Projekt</strong> an der TU Wien",
        description:
          "F\u00fcr etwa ein Jahr war ich in einem Forschungsprojekt an der TU Wien im Bereich KI-Ethik-Auditing angestellt.<br><br>Neben der eigentlichen Forschung gab mir das einen echten Einblick in das akademische Leben: Ich nahm an Konferenzen teil, arbeitete eng mit Forscher:innen zusammen und co-autorisierte ein Workshop-Paper, das bei einem CHI 2025 Workshop ver\u00f6ffentlicht wurde.",
      },
      {
        name: "<em>Gedanken zu einem PhD...</em>",
        description:
          "Die Erfahrungen an der TU gaben mir einen echten Einblick in die Wissenschaft. Ich habe ernsthaft dr\u00fcber nachgedacht, einen PhD dranzuh\u00e4ngen...<br><br>Am Ende entschied ich mich dagegen. Nicht weil die Forschung nicht interessant war, sondern wegen des systemischen Drucks im akademischen Betrieb: eine Kultur mit dem Erwartungsdruck, Paper zu produzieren, die nicht immer echten Mehrwert liefern, und ein System, das Quantit\u00e4t oft \u00fcber Wirkung stellt...<br><br>Das ist nicht wirklich eine Umgebung, in der ich meine Karriere aufbauen m\u00f6chte (zumindest nicht jetzt) :)",
      },
    ],
  },
  "room-automation": {
    title: "TEST AUTOMATISIERUNG",
    projects: [
      {
        name: "Manuelles und Automatisiertes Testen",
        description:
          "Hier konnte ich praktische Erfahrung w\u00e4hrend eines viermonatigen Praktikums als <strong>Test Automation Engineer</strong> bei einem Medizintechnik-Unternehmen gesammelt. <br /> In einem agilen Scrum-Team hab ich an End-to-End-Tests f\u00fcr sicherheitskritische Infusionspumpen-Software gearbeitet. Die Aufgaben umfassten manuelles Systemtesten sowie Entwicklung und Wartung automatisierter Tests mit <strong>C#</strong> und <strong>Cypress</strong> in einer regulierten Umgebung.",
      },
      {
        name: "CI/CD DevOps",
        description:
          "Die automatisierte Tests in CI-Pipelines mit GitHub Actions integriert und Testplanung, Dokumentation und R\u00fcckverfolgbarkeit mit <strong>Azure DevOps</strong> verwaltet. Ich habe in meiner Zeit dort an einer formalen Verifikationsphase teilgenommen, bei der alle Testf\u00e4lle systematisch ausgef\u00fchrt und dokumentiert wurden. Einblicke in strukturierte Testkonzepte, Fehleranalyse, CI/CD-Workflows und DevOps-Prozesse konnten dabei gewonnen werden.",
      },
    ],
  },
  "room-diversity": {
    title: "GENDER & DIVERSIT\u00c4TS- KOMPETENZEN",
    projects: [
      {
        name: "Uni-Kurse:",
        description:
          "Ich habe Kurse belegt in <strong>Diversit\u00e4tskompetenzen und -management, feministischen Technologiestudien, Auswirkungen von Technologie und Technikfolgenabsch\u00e4tzung,</strong> mit einem STS-basierten Ansatz zur Analyse, wie Technologien soziale Strukturen, Organisationen und Nutzer:innen pr\u00e4gen.",
      },
    ],
  },
};

let universityProjects = universityProjects_en;
