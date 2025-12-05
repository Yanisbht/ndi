import { useState } from "react";
import { Card, Button, ProgressBar, Form, Navbar, Container } from "react-bootstrap";
import QCMResult from "./QCMResult";
import './QCMProfil.css';

const questions = [
  { text: "Quel est votre niveau sportif général ?", options: ["Débutant", "Intermédiaire", "Avancé"] },
  { text: "À quelle fréquence pratiquez-vous du sport ?", options: ["Jamais", "1 fois / semaine", "2–3 fois / semaine", "4+ fois / semaine"] },
  { text: "Depuis combien de temps pratiquez-vous une activité physique régulière ?", options: ["Moins de 6 mois", "6 mois – 2 ans", "Plus de 2 ans"] },
  { text: "Vous considérez-vous comme une personne active ?", options: ["Oui", "Non"] },
  { text: "Pratiquez-vous souvent des mouvements de base (squats,pompes,gainage) ?", options: ["Oui", "Non"] },
  {
    text: "Quels types d’activités faites-vous le plus souvent ? (plusieurs choix possibles)",
    options: ["Renforcement musculaire", "Yoga / Pilates", "Cardio / Course", "Sports collectifs", "Aucun / Reprise"],
    multiple: true,
  },
  { text: "Réalisez-vous régulièrement des exercices de posture ou de mobilité ?", options: ["Oui", "Non"] },
  { text: "Avez-vous déjà suivi un programme d’entraînement guidé ?", options: ["Oui", "Non"] },
  { text: "Utilisez-vous des équipements sportifs de base (tapis, bandes, haltères, etc) ?", options: ["Oui", "Non"] },
  { text: "Quel est votre objectif principal ?", options: ["Améliorer ma posture", "Éviter les blessures", "Gagner en force", "Augmenter ma mobilité", "Performance"] },
  { text: "Quel est votre objectif secondaire ?", options: ["Perte de poids", "Bien-être général", "Stabilité et équilibre", "Comprendre comment bien réaliser les mouvements"] },
  { text: "Recherchez-vous un accompagnement personnalisé pour vos mouvements ?", options: ["Oui", "Non"] },
  { text: "Selon vous, votre posture au quotidien est :", options: ["Très bonne", "Correcte", "À améliorer", "Mauvaise"] }
];

export default function QCMProfil() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [slide, setSlide] = useState(true);
  const [finished, setFinished] = useState(false);

  const progress = ((index + 1) / questions.length) * 100;

  const handleChange = (option) => {
    const q = questions[index];
    if (q.multiple) {
      const current = answers[index] || [];
      const newChoices = current.includes(option)
        ? current.filter((c) => c !== option)
        : [...current, option];
      setAnswers({ ...answers, [index]: newChoices });
    } else {
      setAnswers({ ...answers, [index]: option });
    }
  };

  const canNext = () => {
    const a = answers[index];
    return questions[index].multiple ? (a && a.length > 0) : !!a;
  };

  const handleNext = () => {
    if (index === questions.length - 1) {
      setFinished(true);
    } else {
      setSlide(false);
      setTimeout(() => {
        setIndex(index + 1);
        setSlide(true);
      }, 200);
    }
  };

  const handleBack = () => {
    setSlide(false);
    setTimeout(() => {
      setIndex(index - 1);
      setSlide(true);
    }, 200);
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar style={{ backgroundColor: "#0079C1" }}>
        <Container>
          <Navbar.Brand>
            
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className="qcm-background-prof">
        <Card className={`qcm-card-prof ${slide ? 'slide-in' : 'slide-out'}`}>
          <Card.Header className="qcm-header-prof">
            Profilage Sportif
          </Card.Header>

          <Card.Body className="qcm-body-prof">
            <ProgressBar now={progress} label={`${index + 1}/${questions.length}`} className="qcm-progress-prof" />

            <div className="qcm-question-container">
              <h5 className="qcm-question-prof">{questions[index].text}</h5>

              <Form>
                {questions[index].options.map((option) => (
                  <Form.Check
                    key={option}
                    type={questions[index].multiple ? "checkbox" : "radio"}
                    name={`q-${index}`}
                    label={option}
                    checked={
                      questions[index].multiple
                        ? (answers[index] || []).includes(option)
                        : answers[index] === option
                    }
                    onChange={() => handleChange(option)}
                    className="qcm-option-prof"
                  />
                ))}
              </Form>
            </div>

            <div className="qcm-buttons-prof">
              <Button className="qcm-btn-back-prof" disabled={index === 0} onClick={handleBack}>
                ← Retour
              </Button>
              <Button className="qcm-btn-next-prof" disabled={!canNext()} onClick={handleNext}>
                {index === questions.length - 1 ? "Terminer" : "Suivant →"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
