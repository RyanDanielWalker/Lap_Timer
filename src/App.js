import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonNote, IonButton } from '@ionic/react';

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

const App = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [laps, setLaps] = useState([])

  useEffect(() => {
    let time = null;
    if (timerOn) {
      time = setInterval(() => {
        setTime(prevState => prevState + 10)
      }, 10)
    } else {
      clearInterval(time)
    }
    return () => clearInterval(time)
  }, [timerOn])

  const onClickingLap = () => {
    if (laps === []) {
      const lapTime = time
      setLaps([lapTime])
    } else {
      const lapTime = time - laps[laps.length - 1]
      setLaps([...laps, lapTime])
    }
    console.log(laps)
  }

  const onClickingReset = () => {
    setTime(0);
    setLaps([]);
    setTimerOn(false);
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lap Timer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonNote>{time}</IonNote>
        <IonButton onClick={() => setTimerOn(true)}>Start</IonButton>
        <IonButton onClick={() => setTimerOn(false)}>Stop</IonButton>
        <IonButton onClick={onClickingReset}>Reset</IonButton>
        <IonButton onClick={onClickingLap}>Lap</IonButton>
        <IonNote>{laps}</IonNote>
      </IonContent>
    </IonPage>
  )
}


export default App;
