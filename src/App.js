import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonRouterOutlet, IonContent, IonNote, IonButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

function App() {
  const [time, setTime] = useState(0)
  const [lapTime, setLapTime] = useState(0);
  const [timerOn, setTimeOn] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timerOn])

  useEffect(() => {

  })

  useEffect(() => {
    setLaps(prevLaps => prevLaps.concat(lapTime))
  }, [])

  // const renderLaps = laps.map((lap) => {
  //   return (
  //     <IonNote>{lap}</IonNote>
  //   )
  // })





  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lap Timer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonNote>{time}</IonNote>
        <IonButton onClick={() => setTimeOn(true)}>Start</IonButton>
        <IonButton>Stop</IonButton>
        <IonButton>Reset</IonButton>
        <IonButton>Lap</IonButton>
        <IonNote>{laps}</IonNote>
      </IonContent>
    </IonPage>
  )
}

export default App;
