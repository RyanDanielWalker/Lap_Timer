import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from '@ionic/react';

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

  const timerMinutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
  const timerSeconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
  const timerMilliseconds = ("0" + ((time / 10) % 100)).slice(-2)

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
    let lapTime = time - laps.reduce((a, b) => a + b, 0)
    setLaps(laps => [...laps, lapTime])
  }

  const onClickingReset = () => {
    setTime(0);
    setLaps([]);
    setTimerOn(false);
  }

  const renderLaps = laps.map((lap, index) => {
    const lapMinutes = ("0" + Math.floor((lap / 60000) % 60)).slice(-2)
    const lapSeconds = ("0" + Math.floor((lap / 1000) % 60)).slice(-2)
    const lapMilliseconds = ("0" + ((lap / 10) % 100)).slice(-2)
    return (
      <h4 key={index}>Lap {index + 1}: {lapMinutes}:{lapSeconds}:{lapMilliseconds}</h4>
    )
  })


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lap Timer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <h4>{timerMinutes}:{timerSeconds}:{timerMilliseconds}</h4>
        </IonText>
        <IonButton onClick={() => setTimerOn(true)}>Start</IonButton>
        <IonButton onClick={() => setTimerOn(false)}>Stop</IonButton>
        <IonButton onClick={onClickingReset}>Reset</IonButton>
        <IonButton onClick={onClickingLap}>Lap</IonButton>
        <IonText>{renderLaps}</IonText>
      </IonContent>
    </IonPage>
  )
}


export default App;
