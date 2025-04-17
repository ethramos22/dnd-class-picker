"use client"

import { useState } from "react"
import fighterArt from "../assets/fighter.png"

// D&D class data with descriptions
const classData = {
  barbarian: {
    name: "Barbarian",
    description: "A fierce warrior who can enter a battle rage, granting enhanced physical ability and durability.",
  },
  bard: {
    name: "Bard",
    description: "A magical entertainer whose power comes from the heart of inspiration and creativity.",
  },
  cleric: {
    name: "Cleric",
    description: "A champion of divine power who heals the sick and protects the faithful.",
  },
  druid: {
    name: "Druid",
    description: "A priest of the Old Faith, wielding the powers of nature and adopting animal forms.",
  },
  fighter: {
    name: "Fighter",
    description: "A master of martial combat, skilled with a variety of weapons and armor.",
    art: fighterArt,
  },
  monk: {
    name: "Monk",
    description: "A master of martial arts who harnesses the power of the body to create devastating attacks.",
  },
  paladin: {
    name: "Paladin",
    description: "A holy warrior bound to sacred oaths, combining martial prowess with divine spells.",
  },
  ranger: {
    name: "Ranger",
    description: "A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.",
  },
  rogue: {
    name: "Rogue",
    description: "A scoundrel who uses stealth and trickery to overcome obstacles and enemies.",
  },
  sorcerer: {
    name: "Sorcerer",
    description: "A spellcaster who draws on inherent magic from a gift or bloodline.",
  },
  warlock: {
    name: "Warlock",
    description: "A wielder of magic derived from a bargain with an extraplanar entity.",
  },
  wizard: {
    name: "Wizard",
    description: "A scholarly magic-user capable of manipulating the structures of reality.",
  },
}

// Quiz questions and logic
const questions = [
  {
    id: 1,
    text: "What's your preferred approach to conflict?",
    options: [
      { text: "Charge in head first", next: 2, path: ["barbarian", "fighter", "paladin"] },
      { text: "Plan a strategic approach", next: 3, path: ["wizard", "rogue", "ranger"] },
      { text: "Support my allies", next: 4, path: ["cleric", "bard", "druid"] },
      { text: "Adapt to the situation", next: 5, path: ["monk", "sorcerer", "warlock"] },
    ],
  },
  {
    id: 2,
    text: "When fighting, what matters most to you?",
    options: [
      { text: "Raw power and strength", next: 6, path: ["barbarian"] },
      { text: "Skill and technique", next: 7, path: ["fighter"] },
      { text: "Honor and justice", next: 8, path: ["paladin"] },
    ],
  },
  {
    id: 3,
    text: "How do you prefer to overcome challenges?",
    options: [
      { text: "With knowledge and arcane power", next: 9, path: ["wizard"] },
      { text: "With stealth and cunning", next: 10, path: ["rogue"] },
      { text: "With survival skills and awareness", next: 11, path: ["ranger"] },
    ],
  },
  {
    id: 4,
    text: "What kind of support do you prefer to provide?",
    options: [
      { text: "Healing and protection", next: 12, path: ["cleric"] },
      { text: "Inspiration and versatility", next: 13, path: ["bard"] },
      { text: "Natural magic and transformation", next: 14, path: ["druid"] },
    ],
  },
  {
    id: 5,
    text: "What is the source of your power?",
    options: [
      { text: "Inner discipline and training", next: 15, path: ["monk"] },
      { text: "Innate magical talent", next: 16, path: ["sorcerer"] },
      { text: "A powerful patron or entity", next: 17, path: ["warlock"] },
    ],
  },
  // Additional questions for final determination
  {
    id: 6,
    text: "Do you embrace the primal rage within you?",
    options: [
      { text: "Yes, I channel my fury into power", result: "barbarian" },
      { text: "No, I prefer more control", next: 7, path: ["fighter"] },
    ],
  },
  {
    id: 7,
    text: "What fighting style appeals to you most?",
    options: [
      { text: "Mastery of many weapons and techniques", result: "fighter" },
      { text: "Combining combat with divine purpose", next: 8, path: ["paladin"] },
    ],
  },
  {
    id: 8,
    text: "Are you driven by sacred oaths and divine purpose?",
    options: [
      { text: "Yes, I serve a higher calling", result: "paladin" },
      { text: "No, I prefer martial prowess alone", result: "fighter" },
    ],
  },
  {
    id: 9,
    text: "Do you prefer to study and master arcane formulas?",
    options: [
      { text: "Yes, knowledge is my greatest weapon", result: "wizard" },
      { text: "No, I prefer a more intuitive approach", next: 16, path: ["sorcerer"] },
    ],
  },
  {
    id: 10,
    text: "Do you prefer to strike from the shadows?",
    options: [
      { text: "Yes, stealth and surprise are my allies", result: "rogue" },
      { text: "No, I prefer more direct methods", next: 7, path: ["fighter"] },
    ],
  },
  {
    id: 11,
    text: "Is your connection to nature an important part of your identity?",
    options: [
      { text: "Yes, I am one with the wilderness", result: "ranger" },
      { text: "No, I just use what works", next: 10, path: ["rogue"] },
    ],
  },
  {
    id: 12,
    text: "Do you serve a deity or higher power?",
    options: [
      { text: "Yes, my faith guides my actions", result: "cleric" },
      { text: "No, I follow a different path", next: 14, path: ["druid"] },
    ],
  },
  {
    id: 13,
    text: "Do you express yourself through performance and art?",
    options: [
      { text: "Yes, my art is my magic", result: "bard" },
      { text: "No, I prefer other methods", next: 12, path: ["cleric"] },
    ],
  },
  {
    id: 14,
    text: "Is shapeshifting and communing with nature appealing to you?",
    options: [
      { text: "Yes, I embrace the forms of beasts", result: "druid" },
      { text: "No, I prefer other natural magics", result: "ranger" },
    ],
  },
  {
    id: 15,
    text: "Do you focus on perfecting your body as a weapon?",
    options: [
      { text: "Yes, my body is my greatest tool", result: "monk" },
      { text: "No, I rely on other strengths", next: 7, path: ["fighter"] },
    ],
  },
  {
    id: 16,
    text: "Does your magic come from within, perhaps from a special bloodline?",
    options: [
      { text: "Yes, magic is in my blood", result: "sorcerer" },
      { text: "No, my power comes from elsewhere", result: "warlock" },
    ],
  },
  {
    id: 17,
    text: "Have you made a pact with a powerful entity?",
    options: [
      { text: "Yes, my patron grants me power", result: "warlock" },
      { text: "No, I prefer independence", next: 16, path: ["sorcerer"] },
    ],
  },
]

function ClassPicker() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  const [selectedPaths, setSelectedPaths] = useState([])
  const [result, setResult] = useState(null)
  const [flowchartNodes, setFlowchartNodes] = useState([{ id: 1, text: questions[0].text }])
  const [flowchartEdges, setFlowchartEdges] = useState([])

  const handleOptionSelect = (option) => {
    // Update selected paths
    const newPaths = option.path || []
    setSelectedPaths(newPaths)

    // Update flowchart
    if (option.next) {
      const nextQuestion = questions.find((q) => q.id === option.next)
      if (nextQuestion) {
        setFlowchartNodes((prev) => [...prev, { id: nextQuestion.id, text: nextQuestion.text }])
        setFlowchartEdges((prev) => [
          ...prev,
          {
            from: currentQuestion.id,
            to: nextQuestion.id,
            text: option.text,
          },
        ])
        setCurrentQuestion(nextQuestion)
      }
    } else if (option.result) {
      setResult(option.result)
      setFlowchartEdges((prev) => [
        ...prev,
        {
          from: currentQuestion.id,
          to: -1, // Result node
          text: option.text,
        },
      ])
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(questions[0])
    setSelectedPaths([])
    setResult(null)
    setFlowchartNodes([{ id: 1, text: questions[0].text }])
    setFlowchartEdges([])
  }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>D&D Class Picker</h1>
            </header>

            <main className="app-main">
                <div className="content-container">
                    {!result ? (
                        <div className="question-container fade-in">
                            <h2 className="question-number">Question {currentQuestion.id}</h2>
                            <p className="question-text">{currentQuestion.text}</p>
                            <div className="options-container">
                                {currentQuestion.options.map((option, index) => (
                                    <button key={index} className="option-button" onClick={() => handleOptionSelect(option)}>
                                        {option.text}
                                        <span className="chevron-icon">›</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="result-container fade-in">
                            <h2 className="result-title">Your D&D Class</h2>
                            <p className="result-class">{classData[result].name}</p>
                            <img
                              className="result-art"
                              src={classData[result].art} 
                              alt={`${classData[result].name} art`} 
                            />
                            <p className="result-description">{classData[result].description}</p>
                            <button onClick={resetQuiz} className="reset-button">
                                Start Over
                            </button>
                        </div>
                    )}

                    {/* Flowchart - minimalist version */}
                    <div className="flowchart-container">
                        <h2 className="flowchart-title">Your Path</h2>
                        <div className="flowchart">
                            {flowchartNodes.map((node, index) => {
                                // Find the edge that comes from this node (if any)
                                const outgoingEdge = flowchartEdges.find((edge) => edge.from === node.id)

                                return (
                                    <div
                                        key={`node-${node.id}`}
                                        className="flowchart-item fade-in"
                                        style={{ animationDelay: `${index * 0.3}s` }}
                                    >
                                        <div className="flowchart-node">
                                            <p>{node.text}</p>
                                        </div>

                                        {outgoingEdge && (
                                            <div className="flowchart-edge fade-in" style={{ animationDelay: `${index * 0.3 + 0.15}s` }}>
                                                <p className="flowchart-answer">{outgoingEdge.text}</p>
                                                <div className="flowchart-arrow">↓</div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}

                            {result && (
                                <div className="flowchart-result fade-in" style={{ animationDelay: `${flowchartNodes.length * 0.3}s` }}>
                                    <p>Result: {classData[result].name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="app-footer">
                <p>D&D Class Picker - Find your perfect character class</p>
            </footer>
        </div>
    );
}

export default ClassPicker
