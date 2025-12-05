import { Card, Button } from "react-bootstrap";
import './QCMProfil.css';

// Fonction pour déterminer le profil
function determineProfile(answers) {
  const levelAnswer = answers[0];
  const frequencyAnswer = answers[1];
  const mainGoal = answers[9];
  const secondaryGoal = answers[10];
  const equipment = answers[8];

  let level = "Débutant";
  if (levelAnswer === "Avancé" || frequencyAnswer === "4+ fois / semaine") level = "Avancé";
  else if (levelAnswer === "Intermédiaire" || frequencyAnswer === "2–3 fois / semaine") level = "Intermédiaire";

  return {
    level,
    mainGoal,
    secondaryGoal,
    equipmentAvailable: equipment === "Oui",
  }; 
}

export default function QCMResult({ answers, onRestart }) {
  const profile = determineProfile(answers);

  return (
    <div className="qcm-background-prof">
      <Card className="qcm-card-prof">
        <Card.Header className="qcm-header-prof">
          Profil sportif déterminé
        </Card.Header>

        <Card.Body className="qcm-body-prof">

          {/* Image en haut */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img 
              src="./img/profil.jpg"
              alt="Profil sportif"
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          <div className="qcm-question-container">
            <h5 className="qcm-question-prof">Votre profil :</h5>
            <p>Niveau : {profile.level}</p>
            <p>Objectif principal : {profile.mainGoal}</p>
            <p>Objectif secondaire : {profile.secondaryGoal}</p>
            <p>Équipements disponibles : {profile.equipmentAvailable ? "Oui" : "Non"}</p>
          </div>

          <div className="qcm-buttons-prof" style={{ marginTop: '30px' }}>
            <Button className="qcm-btn-next-prof" onClick={onRestart}>Recommencer</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
